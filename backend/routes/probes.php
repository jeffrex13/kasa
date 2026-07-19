<?php

use App\Modules\Shared\Http\Controllers\ProbeController;
use Illuminate\Support\Facades\Route;

Route::get('/health', [ProbeController::class, 'health'])->name('probe.health');
Route::get('/ready', [ProbeController::class, 'ready'])->name('probe.ready');
