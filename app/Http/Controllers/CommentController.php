<?php

namespace App\Http\Controllers;

use App\Models\Post;   
use App\Models\Comment; 
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:2000',
        ]);
        
        $comment = $post->comments()->create([
            'content' => $validated['content'],
            'user_id' => auth()->id(),
            'post_id'
        ]);

        return back()->with('success', 'Komentar berhasil ditambahkan.');
    }

    public function destroy(Comment $comment)
    {
        $post = $comment->post; 
        $community = $post->community; 
        $currentUserId = auth()->id();

        $canDelete = (
            $comment->user_id === $currentUserId ||    
            $post->user_id === $currentUserId ||        
            ($community && $community->creator_id === $currentUserId) || 
            ($currentUserId === 1)
        );

        if (!$canDelete) {
            return back()->with('error', 'Anda tidak memiliki izin untuk menghapus komentar ini.');
        }

        $comment->delete();

        return back()->with('success', 'Komentar berhasil dihapus.');
    }
}