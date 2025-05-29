<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marketplace extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'description',
        'size_length',
        'size_width',
        'price',
        'price_type',
        'kecamatan',
        'kelurahan',
        'address',
        'long',
        'lat',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
