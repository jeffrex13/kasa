<?php

use Illuminate\Support\Facades\Route;

Route::prefix('meta')
    ->name('meta.')
    ->group(function (): void {
        Route::get('/ping', static fn () => response()->json([
            'service' => config('app.name'),
            'status' => 'ok',
        ]))->name('ping');
    });
