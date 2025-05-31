<?php

namespace App\Http\Controllers;

use App\Models\User; 
use App\Models\Community;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Auth; 
use Inertia\Inertia; 

class CommunityController extends Controller implements HasMiddleware
{
    
    public static function middleware(): array
    {
        return [
            new Middleware('permission:community index', only: ['index', 'show']),
            new Middleware('permission:community create', only: ['create', 'store']),
            new Middleware('permission:community edit', only: ['edit', 'update']),
            new Middleware('permission:community delete', only: ['destroy']),
            new Middleware('auth', only: ['join', 'leave', 'banUser', 'unbanUser', 'manageMembersPage']),
        ];
    }
    
    public function index()
    {
        $communities = Community::withCount('members', 'posts')
            ->with('creator:id,name')
            ->latest()
            ->paginate(9);

        return inertia('Communities/Index', [
            'communities' => $communities,
            'auth_user_id' => auth()->id(),
        ]);
    }

    public function create()
    {
        return inertia('Communities/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:communities',
            'description' => 'required|string|max:1000',
        ]);

        $validated['creator_id'] = auth()->id();

        $community = Community::create($validated);

        if ($community) {
            $community->members()->attach(auth()->id(), ['created_at' => now(), 'updated_at' => now()]);
        } else {
            return back()->with('error', 'Gagal membuat komunitas, silakan coba lagi.')->withInput();
        }

        session()->flash('success', 'Komunitas berhasil dibuat.');
        return redirect()->route('community.index');
    }

    public function show(Community $community)
    {
        $community->loadCount('members');
        $community->load('creator:id,name');

        $posts = $community->posts()
            ->with('user:id,name')
            ->withCount('comments', 'likers')
            ->latest()
            ->paginate(10);

        $isMember = Auth::check() ? $community->members()->where('user_id', auth()->id())->exists() : false;
        $isCreatorOrAdmin = Auth::check() ? ($community->creator_id === auth()->id() || (Auth::user() && auth()->id() === 1)) : false;

        return inertia('Communities/Show', [
            'community' => $community,
            'posts' => $posts,
            'isMember' => $isMember,
            'isCreatorOrAdmin' => $isCreatorOrAdmin,
            'auth_user_id' => auth()->id(),
        ]);
    }

    public function edit(Community $community)
    {
        if ($community->creator_id !== auth()->id() && auth()->id() !== 1) {
            abort(403, 'Anda tidak memiliki izin untuk mengedit komunitas ini.');
        }

        return inertia('Communities/Edit', [
            'community' => $community,
        ]);
    }

    public function update(Request $request, Community $community)
    {
        if ($community->creator_id !== auth()->id() && auth()->id() !== 1) {
            abort(403, 'Anda tidak memiliki izin untuk memperbarui komunitas ini.');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', \Illuminate\Validation\Rule::unique('communities')->ignore($community->id)],
            'description' => ['required', 'string', 'max:1000'],
        ]);

        $community->update($validated);

        return redirect()->route('communities.show', $community->id)->with('success', 'Komunitas berhasil diperbarui.');
    }

    public function destroy(Community $community)
    {
        if ($community->creator_id !== auth()->id() && auth()->id() !== 1) {
            abort(403, 'Anda tidak memiliki izin untuk menghapus komunitas ini.');
        }
        $community->delete();
        return redirect()->route('communities.index')->with('success', 'Komunitas berhasil dihapus.');
    }

    public function join(Community $community)
    {
        if ($community->members()->where('user_id', auth()->id())->exists()) {
            return back()->with('warning', 'Anda sudah menjadi anggota komunitas ini.');
        }
        if ($community->bannedUsers()->where('user_id', auth()->id())->exists()) {
            return back()->with('error', 'Anda tidak dapat bergabung karena telah diban dari komunitas ini.');
        }

        $community->members()->attach(auth()->id(), ['created_at' => now(), 'updated_at' => now()]);
        return back()->with('success', 'Anda berhasil bergabung dengan komunitas ' . $community->name);
    }

    public function leave(Community $community)
    {
        if (!\Illuminate\Support\Facades\Auth::check() || !$community->members()->where('user_id', \Illuminate\Support\Facades\Auth::id())->exists()) {
            return back()->with('warning', 'Anda bukan anggota komunitas ini.');
        }
        if ($community->creator_id === \Illuminate\Support\Facades\Auth::id()) {
             return back()->with('error', 'Sebagai pembuat, Anda tidak dapat meninggalkan komunitas ini. Anda dapat menghapusnya.');
        }

        $community->members()->detach(\Illuminate\Support\Facades\Auth::id());
        return back()->with('success', 'Anda berhasil keluar dari komunitas ' . $community->name);
    }

    public function manageMembersPage(Community $community)
    {
        if ($community->creator_id !== Auth::id() && Auth::id() !== 1) {
            abort(403, 'Anda tidak memiliki izin untuk mengelola komunitas ini.');
        }
        $community->load('members:id,name,email', 'bannedUsers:id,name,email');

        return Inertia::render('Communities/ManageCommunityMembers', [
            'community' => $community,
        ]);
    }

    public function banUser(Request $request, Community $community, User $userToBan)
    {
        if ($community->creator_id !== Auth::id() && Auth::id() !== 1) {
            abort(403, 'Anda tidak memiliki izin untuk melakukan tindakan ini.');
        }
        if ($userToBan->id === Auth::id() || $userToBan->id === $community->creator_id || ($userToBan->id === 1 && Auth::id() !== 1) ) {
             return back()->with('error', 'Tidak dapat mem-ban pengguna ini.');
        }

        $community->members()->detach($userToBan->id);
        if (!$community->bannedUsers()->where('user_id', $userToBan->id)->exists()) {
            $community->bannedUsers()->attach($userToBan->id, ['created_at' => now(), 'updated_at' => now()]);
            return back()->with('success', $userToBan->name . ' berhasil diban dari komunitas.');
        }
        return back()->with('info', $userToBan->name . ' sudah ada dalam daftar ban.');
    }

    public function unbanUser(Community $community, User $userToUnban)
    {
        if ($community->creator_id !== Auth::id() && Auth::id() !== 1) {
            abort(403, 'Anda tidak memiliki izin untuk melakukan tindakan ini.');
        }

        if ($community->bannedUsers()->detach($userToUnban->id)) {
            return back()->with('success', $userToUnban->name . ' berhasil dilepas dari daftar ban.');
        }
        return back()->with('info', $userToUnban->name . ' tidak ada dalam daftar ban.');
    }
}