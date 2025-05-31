<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    /**
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'user_id',
        'community_id',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function community()
    {
        return $this->belongsTo(Community::class);
    }
    
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    
    public function likers()
    {
        return $this->belongsToMany(User::class, 'like_post')
                    ->withTimestamps();
    }
    
    public function bookmarkers()
    {
        return $this->belongsToMany(User::class, 'bookmark_post')
                    ->withTimestamps();
    }
}