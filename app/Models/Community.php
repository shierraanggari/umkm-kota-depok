<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Community extends Model
{
    use HasFactory;

    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'creator_id',
    ];

    /**
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    /**
     */
    public function members()
    {
        return $this->belongsToMany(User::class, 'communities_users')
                    ->withTimestamps();
    }

    /**
     */
    public function bannedUsers()
    {
        return $this->belongsToMany(User::class, 'banned_users')
                    ->withTimestamps();
    }

    /**
     */
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}