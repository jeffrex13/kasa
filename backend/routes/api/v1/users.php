<?php

use Illuminate\Support\Facades\Route;

Route::prefix('users')
    ->name('users.')
    ->group(function (): void {
        // User module routes.
    });
