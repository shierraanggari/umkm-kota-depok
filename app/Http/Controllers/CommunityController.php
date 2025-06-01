<?php

namespace App\Http\Controllers;

use App\Models\User; 
use App\Models\Community;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Http\Request; 
use Inertia\Inertia; 

class CommunityController extends Controller implements HasMiddleware
{
    
    public static function middleware()
    {
        return [
            new Middleware('permission:community index', only: ['index', 'show']),
            new Middleware('permission:community create', only: ['create', 'store']),
            new Middleware('permission:community edit', only: ['edit', 'update']),
            new Middleware('permission:community delete', only: ['destroy']),
            new Middleware('auth', only: ['join', 'leave', 'banUser', 'unbanUser']),
        ];
    }
    
    public function index()
    {
        $query = Community::query()
            ->withCount(['members', 'posts']) 
            ->with('creator:id,name');  
        
        if (auth()->check()) {
            $currentUserId = auth()->id();
            $query->with(['members' => function ($q) use ($currentUserId) {
                $q->where('users.id', $currentUserId);
            }]);
        }

        $communities = $query->latest()->paginate(9)->withQueryString();
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

        $isMember = auth()->check() ? $community->members()->where('user_id', auth()->id())->exists() : false;

        $isCreator = auth()->check() ? ($community->creator_id === auth()->id()) : false;

        $isAdmin = auth()->check() ? ((auth()->user() && auth()->id() === 1)) : false;

        return inertia('Communities/Show', [
            'community' => $community,
            'posts' => $posts,
            'isMember' => $isMember,
            'isCreator' => $isCreator,
            'isAdmin' => $isAdmin,
            'auth_user_id' => auth()->id(),
        ]);
    }

    public function edit(Community $community)
    {
        if ($community->creator_id !== auth()->id() && auth()->id() !== 1) {
            abort(403, 'Anda tidak memiliki izin untuk mengedit komunitas ini.');
        }

        $members = $community->members()
            ->paginate(5, ['users.id', 'users.name', 'users.email'], 'members_page');

        $bannedUsers = $community->bannedUsers()
            ->paginate(5, ['users.id', 'users.name', 'users.email'], 'banned_page');

        return inertia('Communities/Edit', [
            'community' => $community,
            'members' => $members,
            'banned_users' => $bannedUsers,
            'auth_user_id' => auth()->id(),
        ]);
    }

    public function update(Request $request, Community $community)
    {
        if ($community->creator_id !== auth()->id() && auth()->id() !== 1) {
            abort(403, 'Anda tidak memiliki izin untuk memperbarui komunitas ini.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:communities',
            'description' => 'required|string|max:1000',
        ]);

        $community->update($validated);

        return redirect()->route('community.edit', $community->id)->with('success', 'Komunitas berhasil diperbarui.');
    }

    public function destroy(Community $community)
    {
        if ($community->creator_id !== auth()->id() && auth()->id() !== 1) {
            abort(403, 'Anda tidak memiliki izin untuk menghapus komunitas ini.');
        }
        $community->delete();
        return redirect()->route('community.index')->with('success', 'Komunitas berhasil dihapus.');
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
        if (!auth()->check() || !$community->members()->where('user_id', auth()->id())->exists()) {
            return back()->with('warning', 'Anda bukan anggota komunitas ini.');
        }

        if ($community->creator_id === auth()->id()) {
             return back()->with('error', 'Sebagai pembuat, Anda tidak dapat meninggalkan komunitas ini. Anda dapat menghapusnya.');
        }

        $community->members()->detach(auth()->id());
        return back()->with('success', 'Anda berhasil keluar dari komunitas ' . $community->name);
    }

    public function banUser(Request $request, Community $community, User $userToBan)
    {
        if ($community->creator_id !== auth()->id() && auth()->id() !== 1) {
            abort(403, 'Anda tidak memiliki izin untuk melakukan tindakan ini.');
        }

        if ($userToBan->id === auth()->id() || $userToBan->id === $community->creator_id || ($userToBan->id === 1 && auth()->id() !== 1) ) {
             return back()->with('error', 'Tidak dapat mem-ban pengguna ini.');
        }

        $community->members()->detach($userToBan->id);

        if (!$community->bannedUsers()->where('user_id', $userToBan->id)->exists()) {
            $community->bannedUsers()->attach($userToBan->id, ['created_at' => now(), 'updated_at' => now()]);
            return back()->with('success', $userToBan->name . ' berhasil diban dari komunitas.');
        }

        return redirect()->route('community.edit', $community->id)->with('success', $userToBan->name . ' berhasil diban dari komunitas.');
    }

    public function unbanUser(Community $community, User $userToUnban)
    {
        if ($community->creator_id !== auth()->id() && auth()->id() !== 1) {
            abort(403, 'Anda tidak memiliki izin untuk melakukan tindakan ini.');
        }

        if ($community->bannedUsers()->detach($userToUnban->id)) {
            return back()->with('success', $userToUnban->name . ' berhasil dilepas dari daftar ban.');
        }
        return back()->with('info', $userToUnban->name . ' tidak ada dalam daftar ban.');
    }
}