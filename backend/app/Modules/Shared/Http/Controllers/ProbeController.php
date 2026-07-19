<?php

namespace App\Modules\Shared\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Throwable;

class ProbeController extends Controller
{
    public function health(): JsonResponse
    {
        return response()->json([
            'service' => config('app.name'),
            'status' => 'ok',
            'checks' => [
                'app' => 'ok',
            ],
        ]);
    }

    public function ready(): JsonResponse
    {
        try {
            DB::connection()->select('select 1');

            return response()->json([
                'service' => config('app.name'),
                'status' => 'ready',
                'checks' => [
                    'app' => 'ok',
                    'database' => 'ok',
                ],
            ]);
        } catch (Throwable $exception) {
            return response()->json([
                'service' => config('app.name'),
                'status' => 'not_ready',
                'checks' => [
                    'app' => 'ok',
                    'database' => 'failed',
                ],
                'error' => [
                    'message' => $exception->getMessage(),
                ],
            ], 503);
        }
    }
}
