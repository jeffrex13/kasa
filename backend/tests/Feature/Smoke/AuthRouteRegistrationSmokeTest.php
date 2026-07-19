<?php

use Illuminate\Support\Facades\Route;

it('registers auth route names under api.v1 namespace', function (): void {
    expect(Route::has('api.v1.auth.register'))->toBeTrue()
        ->and(Route::has('api.v1.auth.login'))->toBeTrue()
        ->and(Route::has('api.v1.auth.verify-otp'))->toBeTrue()
        ->and(Route::has('api.v1.auth.logout'))->toBeTrue();
});
