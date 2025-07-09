<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * THIS IS THE CRITICAL FIX.
     * We are telling Laravel these fields are safe to be updated.
     *
     * @var array
     */
    protected $fillable = [
        'date',
        'category',
        'description',
        'amount',
    ];
}