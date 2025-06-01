<?php

namespace App\Http\Controllers; // Sesuaikan namespace jika berbeda

use App\Models\Post;    // Model untuk Postingan
use App\Models\Comment; // Model untuk Komentar
use Illuminate\Http\Request; // Meskipun tidak selalu dipakai di semua method, umum untuk ada
use Illuminate\Support\Facades\Auth; // Untuk mendapatkan user yang sedang login

class InteractionController extends Controller
{
    // Method untuk menangani aksi like/unlike pada sebuah Postingan
    public function togglePostLike(Request $request, Post $post) // $post diinjeksi via Route Model Binding
    {
        $user = Auth::user(); // Dapatkan instance user yang sedang login

        // Menggunakan method toggle() pada relasi many-to-many 'likedPosts' di model User.
        // - Jika user belum me-like post ini, relasi akan ditambahkan (attach).
        // - Jika user sudah me-like post ini, relasi akan dihapus (detach).
        $user->likedPosts()->toggle($post->id);

        // Kembali ke halaman sebelumnya. Inertia akan me-refresh props halaman tersebut,
        // sehingga status 'is_liked_by_user' dan 'likers_count' di frontend akan terupdate.
        return back();
    }

    // Method untuk menangani aksi bookmark/unbookmark pada sebuah Postingan
    public function togglePostBookmark(Request $request, Post $post) // $post diinjeksi
    {
        $user = Auth::user();

        // Menggunakan method toggle() pada relasi 'bookmarkedPosts' di model User.
        $user->bookmarkedPosts()->toggle($post->id);

        return back(); // Inertia akan me-refresh props
    }

    // Method untuk menangani aksi like/unlike pada sebuah Komentar
    public function toggleCommentLike(Request $request, Comment $comment) // $comment diinjeksi
    {
        $user = Auth::user();

        // Menggunakan method toggle() pada relasi 'likedComments' di model User.
        $user->likedComments()->toggle($comment->id);

        return back(); // Inertia akan me-refresh props
    }
}