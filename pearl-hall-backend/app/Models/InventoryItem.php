<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute; // <-- Import this

class InventoryItem extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'category', 'quantity'];

    /**
     * The accessors to append to the model's array form.
     * This tells Laravel to always include our new 'status' attribute
     * whenever this model is converted to JSON for the API.
     *
     * @var array
     */
    protected $appends = ['status'];

    /**
     * Get the item's status based on its quantity.
     * This is an Attribute Caster, the modern way to do this in Laravel.
     */
    protected function status(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->quantity < 20 ? 'Low Stock' : 'In Stock',
        );
    }
}