<?php

namespace Tests\Feature\Probe;

use Tests\TestCase;

class ReadinessProbeTest extends TestCase
{
    public function test_ready_endpoint_reports_application_and_database_ready(): void
    {
        $this->getJson('/ready')
            ->assertOk()
            ->assertJson([
                'service' => config('app.name'),
                'status' => 'ready',
                'checks' => [
                    'app' => 'ok',
                    'database' => 'ok',
                ],
            ]);
    }

    public function test_ready_endpoint_returns_service_unavailable_when_database_is_not_available(): void
    {
        $originalDefaultConnection = config('database.default');

        config(['database.default' => 'missing_connection']);

        try {
            $this->getJson('/ready')
                ->assertStatus(503)
                ->assertJsonPath('status', 'not_ready')
                ->assertJsonPath('checks.app', 'ok')
                ->assertJsonPath('checks.database', 'failed')
                ->assertJsonStructure([
                    'service',
                    'status',
                    'checks' => ['app', 'database'],
                    'error' => ['message'],
                ]);
        } finally {
            config(['database.default' => $originalDefaultConnection]);
        }
    }
}
