<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'contact_number',
        'address',
        'alternate_contact',
        'pax_sawan',
        'religion_community',
    ];

    /**
     * Get the event inquiries for the customer.
     */
    public function eventInquiries()
    {
        return $this->hasMany(EventInquiry::class);
    }
}