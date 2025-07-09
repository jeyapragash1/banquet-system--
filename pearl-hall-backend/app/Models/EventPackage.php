<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventPackage extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'price',
        'services',
        'is_popular',
    ];

    /**
     * The attributes that should be cast.
     * 
     * THIS IS THE CRITICAL FIX.
     * It tells Laravel to automatically convert the 'services' JSON string
     * from the database into a real PHP array before sending it to the frontend.
     *
     * @var array
     */
    protected $casts = [
        'services' => 'array',
        'is_popular' => 'boolean',
    ];
}