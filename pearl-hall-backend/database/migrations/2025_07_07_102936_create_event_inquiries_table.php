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
        Schema::create('event_inquiries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->date('inquiry_date');
            $table->string('event_type');
            $table->date('event_date');
            $table->decimal('agreed_amount', 10, 2);
            $table->decimal('discount_amount', 10, 2)->default(0);
            $table->decimal('advance_payment', 10, 2)->default(0);
            $table->string('receipt_number')->nullable();
            $table->string('status')->default('Pending');
            $table->string('stage_throne_option')->default('Not Included');
            $table->decimal('stage_throne_amount', 10, 2)->default(0);
            $table->string('event_taken_by');
            $table->string('event_confirmed_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_inquiries');
    }
};