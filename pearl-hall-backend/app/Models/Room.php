<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'status',
        'price',
        'event_inquiry_id',
    ];

    /**
     * Get the event inquiry that this room is assigned to.
     * This defines the relationship.
     */
    public function eventInquiry()
    {
        return $this->belongsTo(EventInquiry::class);
    }
}