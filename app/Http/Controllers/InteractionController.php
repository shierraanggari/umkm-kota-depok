<?php

namespace App\Http\Controllers;

use App\Models\Post;   
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InteractionController extends Controller
{   
    public function togglePostLike(Request $request, Post $post)
    {
        $user = Auth::user();
        $user->likedPosts()->toggle($post->id);

        return back();
    }

   
    public function togglePostBookmark(Request $request, Post $post)
    {
        $user = Auth::user();
        $user->bookmarkedPosts()->toggle($post->id);

        return back();
    }

   
    public function toggleCommentLike(Request $request, Comment $comment)
    {
        $user = Auth::user();
        $user->likedComments()->toggle($comment->id);

        return back();
    }
}