<?php

it('responds on the framework health endpoint', function (): void {
    $this->get('/up')->assertOk();
});
