<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'image', 'price', 'location', 
        'type', 'gender', 'landlord_name', 'rules', 'features', 
        'lat', 'lng', 'available_slots'
    ];

    // Automatically cast JSON to arrays
    protected $casts = [
        'rules' => 'array',
        'features' => 'array',
        'price' => 'decimal:2',
        'lat' => 'decimal:8',
        'lng' => 'decimal:8',
    ];
}