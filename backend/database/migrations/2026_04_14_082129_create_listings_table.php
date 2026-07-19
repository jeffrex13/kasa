<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('image')->nullable();
            $table->decimal('price', 10, 2);
            $table->string('location');
            $table->string('type');
            $table->string('gender');
            $table->string('landlord_name');
            
            // JSON fields for arrays
            $table->json('rules')->nullable();
            $table->json('features')->nullable();
            
            // Map Coordinates
            $table->decimal('lat', 10, 8);
            $table->decimal('lng', 11, 8);
            
            // The Business Rule Field
            $table->integer('available_slots')->nullable();
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('listings');
    }
};