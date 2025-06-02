<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('marketplaces', function (Blueprint $table) {
            $table->id(); 
            $table->string('name');
            $table->string('type')->nullable();
            $table->text('description')->nullable();
            $table->decimal('size_length', 8, 2)->nullable();
            $table->decimal('size_width', 8, 2)->nullable();
            $table->decimal('price', 10, 2)->nullable(); // price DECIMAL(10,2)
            $table->enum('price_type', ['yearly', 'monthly'])->default('monthly');
            $table->string('kecamatan')->nullable();
            $table->string('kelurahan')->nullable();
            $table->text('address')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('long')->nullable();
            $table->string('lat')->nullable(); 
            $table->foreignId('user_id')->nullable()->constrained('users')->onUpdate('cascade')->onDelete('set null');
            $table->timestamps(); // created_at, updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marketplaces');
    }
};