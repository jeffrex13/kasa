<?php

use App\Modules\User\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')
    ->name('auth.')
    ->group(function (): void {
        Route::post('/register', [AuthController::class, 'register'])->name('register');
        Route::post('/login', [AuthController::class, 'login'])->name('login');
        Route::post('/verify-otp', [AuthController::class, 'verifyOtp'])->name('verify-otp');

        Route::middleware('auth:sanctum')
            ->group(function (): void {
                Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
            });
    });
