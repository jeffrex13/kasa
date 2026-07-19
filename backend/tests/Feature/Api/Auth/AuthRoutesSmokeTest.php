<?php

namespace Tests\Feature\Api\Auth;

use App\Models\OtpCode;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthRoutesSmokeTest extends TestCase
{
    use RefreshDatabase;

    public function test_register_route_creates_user_and_sends_otp(): void
    {
        $this->postJson('/api/v1/auth/register', [
            'name' => 'Alice Tenant',
            'email' => 'alice@example.com',
            'mobile_number' => '639171234567',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ])
            ->assertOk()
            ->assertJson([
                'success' => true,
                'purpose' => 'register',
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'alice@example.com',
            'mobile_number' => '639171234567',
        ]);

        $this->assertDatabaseHas('otp_codes', [
            'email' => 'alice@example.com',
            'mobile_number' => '639171234567',
            'purpose' => 'register',
        ]);
    }

    public function test_login_route_sends_otp_for_existing_user(): void
    {
        User::factory()->create([
            'email' => 'bob@example.com',
            'mobile_number' => '639181112222',
        ]);

        $this->postJson('/api/v1/auth/login', [
            'email' => 'bob@example.com',
            'mobile_number' => '639181112222',
        ])
            ->assertOk()
            ->assertJson([
                'success' => true,
                'purpose' => 'login',
            ]);

        $this->assertDatabaseHas('otp_codes', [
            'email' => 'bob@example.com',
            'mobile_number' => '639181112222',
            'purpose' => 'login',
        ]);
    }

    public function test_verify_otp_issues_token_and_logout_revokes_it(): void
    {
        User::factory()->create([
            'name' => 'Carol',
            'email' => 'carol@example.com',
            'mobile_number' => '639191234567',
        ]);

        $this->postJson('/api/v1/auth/login', [
            'email' => 'carol@example.com',
            'mobile_number' => '639191234567',
        ])->assertOk();

        $verifyResponse = $this->postJson('/api/v1/auth/verify-otp', [
            'email' => 'carol@example.com',
            'mobile_number' => '639191234567',
            'purpose' => 'login',
            'otp' => '123456',
        ])
            ->assertOk()
            ->assertJson([
                'success' => true,
            ]);

        $token = $verifyResponse->json('token');

        $this->withHeader('Authorization', "Bearer {$token}")
            ->getJson('/api/v1/users/me')
            ->assertOk()
            ->assertJsonPath('data.email', 'carol@example.com');

        $otp = OtpCode::query()->latest('id')->first();
        $this->assertNotNull($otp?->used_at);

        $this->withHeader('Authorization', "Bearer {$token}")
            ->postJson('/api/v1/auth/logout')
            ->assertOk()
            ->assertJson([
                'success' => true,
            ]);

        $this->assertDatabaseCount('personal_access_tokens', 0);
    }
}
