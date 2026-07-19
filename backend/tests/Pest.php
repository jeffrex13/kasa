<?php

use Tests\TestCase;

pest()->extend(TestCase::class)->in('Feature');
pest()->group('pest')->in('Feature/Smoke');
