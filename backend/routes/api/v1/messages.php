<?php

use Illuminate\Support\Facades\Route;

Route::prefix('messages')
    ->name('messages.')
    ->group(function (): void {
        // Message module routes.
    });
