<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('gender')->nullable();
            $table->integer('age')->nullable();
            $table->integer('budget_min')->nullable();
            $table->integer('budget_max')->nullable();
            $table->json('lifestyle_tags')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'gender',
                'age',
                'budget_min',
                'budget_max',
                'lifestyle_tags',
            ]);
        });
    }
};