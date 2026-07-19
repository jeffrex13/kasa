<?php

namespace Tests\Feature\Api;

use Tests\TestCase;

class MetaPingTest extends TestCase
{
    public function test_meta_ping_returns_expected_payload(): void
    {
        $this->getJson('/api/v1/meta/ping')
            ->assertOk()
            ->assertJsonStructure(['service', 'status'])
            ->assertJson([
                'service' => config('app.name'),
                'status' => 'ok',
            ]);
    }
}
