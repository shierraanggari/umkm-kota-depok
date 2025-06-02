<?php

namespace App\Http\Controllers;

use App\Models\Post;   
use App\Models\Comment; 
use Illuminate\Http\Request;
use Inertia\Inertia;
// use Illuminate\Routing\Controllers\HasMiddleware;
// use Illuminate\Routing\Controllers\Middleware;  

class CommentController extends Controller // implements HasMiddleware
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
    
    // public function edit(Comment $comment)
    // {
    //     if ($comment->user_id !== auth()->id() && !(auth()->user() && auth()->id() === 1)) {
    //         abort(403, 'Anda tidak memiliki izin untuk mengedit komentar ini.');
    //     }
    //
    //     return Inertia::render('Posts/Comments/Edit', [
    //         'comment' => $comment,
    //     ]);
    // }

    // public function update(Request $request, Comment $comment)
    // {
    //     if ($comment->user_id !== auth()->id() && !(auth()->user() && auth()->id() === 1)) {
    //         abort(403, 'Anda tidak memiliki izin untuk memperbarui komentar ini.');
    //     }
    //
    //     $validatedData = $request->validate([
    //         'content' => 'required|string|max:2000',
    //     ]);
    //
    //     $comment->update($validatedData);
    //
    //     return redirect()->route('posts.show', $comment->post_id)->with('success', 'Komentar berhasil diperbarui.');
    // }

    public function destroy(Comment $comment)
    {
        // Otorisasi:
        // 1. Pembuat komentar bisa hapus komentarnya sendiri.
        // 2. Pembuat postingan bisa hapus komentar di postingannya.
        // 3. Pembuat komunitas bisa hapus komentar di komunitasnya.
        // 4. Admin (misal ID 1) bisa hapus semua.
        $post = $comment->post; // Dapatkan post terkait
        $community = $post->community; // Dapatkan komunitas terkait
        $currentUserId = auth()->id();

        $canDelete = (
            $comment->user_id === $currentUserId ||    // Pembuat komentar
            $post->user_id === $currentUserId ||        // Pembuat postingan
            ($community && $community->creator_id === $currentUserId) || // Pembuat komunitas
            ($currentUserId === 1) // Admin (asumsi ID 1)
        );

        if (!$canDelete) {
            // Jika menggunakan API, kembalikan response JSON error 403
            // return response()->json(['message' => 'Tidak diizinkan.'], 403);
            // Untuk Inertia, bisa redirect back dengan error atau abort
            return back()->with('error', 'Anda tidak memiliki izin untuk menghapus komentar ini.');
            // abort(403, 'Anda tidak memiliki izin untuk menghapus komentar ini.');
        }

        // PERHATIAN: Jika komentar memiliki relasi lain (misalnya 'likes' pada komentar),
        // Anda mungkin perlu menghapus relasi tersebut dulu jika tidak ada onDelete('cascade')
        // Contoh: $comment->likers()->detach(); // Jika 'likers' adalah relasi many-to-many
        
        $comment->delete();

        return back()->with('success', 'Komentar berhasil dihapus.');
    }
}