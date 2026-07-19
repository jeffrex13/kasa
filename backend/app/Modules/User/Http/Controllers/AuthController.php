<?php

namespace App\Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\OtpCode;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'mobile_number' => ['required', 'string', 'max:20', 'unique:users,mobile_number'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'mobile_number' => $this->normalizeMobileNumber($validated['mobile_number']),
            'password' => $validated['password'],
        ]);

        $otp = $this->issueOtp(user: $user, purpose: 'register');
        $this->sendOtpToUser($user, $otp, 'registration');

        $response = [
            'success' => true,
            'message' => 'OTP sent to email and mobile number.',
            'purpose' => 'register',
            'expires_in_seconds' => OtpCode::OTP_TTL_SECONDS,
        ];

        if (app()->environment('local')) {
            $response['otp_debug'] = $otp;
        }

        return response()->json($response);
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'mobile_number' => ['required', 'string', 'max:20'],
        ]);

        $normalizedMobile = $this->normalizeMobileNumber($validated['mobile_number']);

        $user = User::query()
            ->where('email', $validated['email'])
            ->where('mobile_number', $normalizedMobile)
            ->first();

        if (! $user) {
            return response()->json([
                'success' => false,
                'message' => 'No user found for the provided email and mobile number.',
            ], 422);
        }

        $otp = $this->issueOtp(user: $user, purpose: 'login');
        $this->sendOtpToUser($user, $otp, 'login');

        $response = [
            'success' => true,
            'message' => 'OTP sent to email and mobile number.',
            'purpose' => 'login',
            'expires_in_seconds' => OtpCode::OTP_TTL_SECONDS,
        ];

        if (app()->environment('local')) {
            $response['otp_debug'] = $otp;
        }

        return response()->json($response);
    }

    public function verifyOtp(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'mobile_number' => ['required', 'string', 'max:20'],
            'purpose' => ['required', Rule::in(['register', 'login'])],
            'otp' => ['required', 'digits:6'],
        ]);

        $normalizedMobile = $this->normalizeMobileNumber($validated['mobile_number']);

        $otpEntry = OtpCode::query()
            ->where('email', $validated['email'])
            ->where('mobile_number', $normalizedMobile)
            ->where('purpose', $validated['purpose'])
            ->whereNull('used_at')
            ->latest('id')
            ->first();

        if (! $otpEntry || $otpEntry->isExpired()) {
            return response()->json([
                'success' => false,
                'message' => 'OTP is invalid or expired.',
            ], 422);
        }

        if (! Hash::check($validated['otp'], $otpEntry->otp_hash)) {
            $otpEntry->increment('attempts');

            return response()->json([
                'success' => false,
                'message' => 'OTP is invalid or expired.',
            ], 422);
        }

        $otpEntry->forceFill(['used_at' => now()])->save();

        $user = $otpEntry->user;

        if ($validated['purpose'] === 'register') {
            $user->forceFill([
                'email_verified_at' => $user->email_verified_at ?? now(),
                'mobile_verified_at' => $user->mobile_verified_at ?? now(),
            ])->save();
        }

        $token = $user->createToken('auth-otp')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'OTP verified successfully.',
            'token' => $token,
            'token_type' => 'Bearer',
            'data' => $user,
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();
        $currentAccessToken = $user->currentAccessToken();

        if ($currentAccessToken) {
            $currentAccessToken->delete();
        } else {
            $user->tokens()->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully.',
        ]);
    }

    private function issueOtp(User $user, string $purpose): string
    {
        $otp = app()->environment('testing')
            ? '123456'
            : (string) random_int(100000, 999999);

        OtpCode::query()
            ->where('user_id', $user->id)
            ->where('purpose', $purpose)
            ->whereNull('used_at')
            ->delete();

        OtpCode::create([
            'user_id' => $user->id,
            'email' => $user->email,
            'mobile_number' => $user->mobile_number,
            'purpose' => $purpose,
            'otp_hash' => Hash::make($otp),
            'expires_at' => now()->addSeconds(OtpCode::OTP_TTL_SECONDS),
            'attempts' => 0,
        ]);

        return $otp;
    }

    private function sendOtpToUser(User $user, string $otp, string $context): void
    {
        $message = "Your Project Aether {$context} OTP is {$otp}. It expires in ".(OtpCode::OTP_TTL_SECONDS / 60).' minutes.';

        Mail::raw($message, function ($mail) use ($user, $context): void {
            $mail->to($user->email)
                ->subject("Project Aether {$context} OTP");
        });

        $smsWebhookUrl = config('services.otp.sms_webhook_url');

        if (! $smsWebhookUrl) {
            Log::info('OTP mobile delivery fallback (no webhook configured)', [
                'mobile_number' => $user->mobile_number,
                'context' => $context,
            ]);

            return;
        }

        try {
            $request = Http::asJson()
                ->timeout(5);

            $smsWebhookToken = config('services.otp.sms_webhook_token');
            if ($smsWebhookToken) {
                $request = $request->withToken($smsWebhookToken);
            }

            $request->post($smsWebhookUrl, [
                'to' => $user->mobile_number,
                'message' => $message,
                'context' => $context,
            ])->throw();
        } catch (\Throwable $exception) {
            Log::warning('OTP SMS delivery failed', [
                'mobile_number' => $user->mobile_number,
                'context' => $context,
                'error' => $exception->getMessage(),
            ]);
        }
    }

    private function normalizeMobileNumber(string $mobileNumber): string
    {
        return preg_replace('/\s+/', '', trim($mobileNumber)) ?? $mobileNumber;
    }
}
