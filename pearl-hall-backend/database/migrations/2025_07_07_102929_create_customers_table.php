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
    Schema::create('customers', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('email')->unique()->nullable();
        $table->text('address')->nullable();
        
        // --- THIS IS THE CRITICAL FIX ---
        // We are allowing this column to be empty (null).
        $table->string('contact_number')->nullable(); 
        
        $table->string('alternate_contact')->nullable();
        $table->string('pax_sawan')->nullable();
        $table->string('religion_community')->nullable();
        $table->timestamps();
    });
}
};