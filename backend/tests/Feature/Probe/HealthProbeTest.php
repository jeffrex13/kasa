<?php

namespace Tests\Feature\Probe;

use Tests\TestCase;

class HealthProbeTest extends TestCase
{
    public function test_health_endpoint_reports_application_is_healthy(): void
    {
        $this->getJson('/health')
            ->assertOk()
            ->assertJson([
                'service' => config('app.name'),
                'status' => 'ok',
                'checks' => [
                    'app' => 'ok',
                ],
            ]);
    }
}
