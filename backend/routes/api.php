<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\ListingController;

Route::prefix('v1')
    ->as('api.v1.')
    ->group(function (): void {
        require __DIR__.'/api/v1/meta.php';
        require __DIR__.'/api/v1/auth.php';
        require __DIR__.'/api/v1/users.php';
        require __DIR__.'/api/v1/listings.php';
        require __DIR__.'/api/v1/matches.php';
        require __DIR__.'/api/v1/messages.php';
        require __DIR__.'/api/v1/moderation.php';
    });



    Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('/users/me', [UserController::class, 'me']);
    Route::put('/users/me', [UserController::class, 'update']);

});