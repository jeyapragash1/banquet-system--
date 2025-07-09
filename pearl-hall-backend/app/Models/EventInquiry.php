<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventInquiry extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * This is the crucial fix for the EventInquiry model.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'customer_id',
        'inquiry_date',
        'event_type',
        'event_date',
        'pax_sawan', // We need to allow this to be filled
        'agreed_amount',
        'discount_amount',
        'advance_payment',
        'receipt_number',
        'status',
        'stage_throne_option',
        'stage_throne_amount',
        'event_taken_by',
        'event_confirmed_by',
    ];

    /**
     * Get the customer that owns the event inquiry.
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}