<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class ModuleStructureTest extends TestCase
{
    public function test_expected_module_directories_exist(): void
    {
        $basePath = dirname(__DIR__, 2);

        $expectedDirectories = [
            'app/Modules/Shared',
            'app/Modules/User',
            'app/Modules/Listing',
            'app/Modules/Match',
            'app/Modules/Message',
            'app/Modules/Moderation',
        ];

        foreach ($expectedDirectories as $directory) {
            $this->assertDirectoryExists($basePath.'/'.$directory);
        }
    }
}
