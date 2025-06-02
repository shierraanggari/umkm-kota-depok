<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Community;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class PostController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:post index', only: ['index', 'show']),
            new Middleware('permission:post create', only: ['create', 'store']),
            new Middleware(('permission:post edit'), only: ['edit', 'update']),
            new Middleware('permission:post delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $communityId = $request->query('community_id');

        $community = Community::findOrFail($communityId);

        $isMember = $community->members()->where('user_id', auth()->id())->exists();
        $isCreator = ($community->creator_id === auth()->id());
        $isAdmin = (auth()->user() && auth()->id() === 1);

        if (!($isMember || $isCreator || $isAdmin)) {
             abort(403, 'Anda harus menjadi anggota atau pengelola komunitas untuk membuat postingan di sini.');
        }

        return Inertia::render('Posts/Create', [
            'community' => $community,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:65535',
            'community_id' => 'required|integer|exists:communities,id',
        ]);
        
        $community = Community::findOrFail($validated['community_id']);

        $isMember = $community->members()->where('user_id', auth()->id())->exists();
        $isCreator = ($community->creator_id === auth()->id());
        $isAdmin = (auth()->user() && auth()->id() === 1);

        if (!($isMember || $isCreator || $isAdmin)) {
             abort(403, 'Anda harus menjadi anggota atau pengelola komunitas untuk membuat postingan di sini.');
        }

        $post = $community->posts()->create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'user_id' => auth()->id(),
        ]);

        session()->flash('success', 'Postingan berhasil dibuat.');
        return redirect()->route('post.show', $post->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post->load([
            'user:id,name',
            'community:id,name,creator_id',
            'comments' => function ($query) {
                $query->with('user:id,name')
                      ->withCount('likers')   
                      ->latest();            
            }
        ])->loadCount('likers', 'bookmarkers');

        $currentUser = auth()->user();
        $post->is_liked_by_user = $currentUser ? $post->likers()->where('users.id', $currentUser->id)->exists() : false;
        $post->is_bookmarked_by_user = $currentUser ? $post->bookmarkers()->where('users.id', $currentUser->id)->exists() : false;

        if ($currentUser) {
            foreach ($post->comments as $comment) {
                $comment->is_liked_by_user = $comment->likers()->where('users.id', $currentUser->id)->exists();
            }
        } else {
            foreach ($post->comments as $comment) {
                $comment->is_liked_by_user = false;
            }
        }

        return Inertia::render('Posts/Show', [
            'post' => $post,
            'auth_user_id' => auth()->id(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        if (!($post->user_id === auth()->id() || auth()->id() === 1)) {
            abort(403, 'Anda tidak memiliki izin untuk mengedit postingan ini.');
        }

        return Inertia::render('Posts/Edit', [
            'post' => $post,
            'community' => $post->community,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        if (!($post->user_id === auth()->id() || auth()->id() === 1)) {
            abort(403, 'Anda tidak memiliki izin untuk memperbarui postingan ini.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:65535',
        ]);

        $post->update($validated);

        return redirect()->route('post.show', $post->id)->with('success', 'Postingan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        if ($post->user_id !== auth()->id() || auth()->id() !== 1) {
            abort(403, 'Anda tidak memiliki izin untuk menghapus postingan ini.');
        }
        $post->delete();

        return redirect()->route('community.show', $post->community_id)->with('success', 'Postingan berhasil dihapus.');
    }
}
