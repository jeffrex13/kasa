<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('otp_codes', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('email');
            $table->string('mobile_number', 20);
            $table->string('purpose', 32);
            $table->string('otp_hash');
            $table->timestamp('expires_at');
            $table->timestamp('used_at')->nullable();
            $table->unsignedSmallInteger('attempts')->default(0);
            $table->timestamps();

            $table->index(['email', 'mobile_number', 'purpose']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('otp_codes');
    }
};
