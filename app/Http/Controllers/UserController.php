<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;
use App\Enums\MarketplaceType;
use App\Enums\Kelurahan;
use App\Enums\Kecamatan;
use Illuminate\Support\Number;

class UserController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware('permission:user index', only : ['index']),
            new Middleware('permission:user create', only : ['create', 'store']),
            new Middleware('permission:user edit', only : ['edit', 'update   ']),
            new Middleware('permission:user delete', only : ['destroy']),
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // get all users
        $users = User::with('roles')
            ->when(request('search'), fn($query) => $query->where('name', 'like', '%'.request('search').'%'))
            ->latest()
            ->paginate(6);

        // render view
        return inertia('Users/Index', ['users' => $users,'filters' => $request->only(['search'])]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         // get roles
         $roles = Role::latest()->get();
         // render view
         return inertia('Users/Create', ['roles' => $roles]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         // validate request
         $request->validate([
            'name' => 'required|min:3|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:4',
            'selectedRoles' => 'required|array|min:1',
        ]);

        // create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        // attach roles
        $user->assignRole($request->selectedRoles);

        // render view
        return to_route('users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        // get roles
        $roles = Role::where('name', '!=', 'super-admin')->get();

        // load roles
        $user->load('roles');

        // render view
        return inertia('Users/Edit', ['user' => $user, 'roles' => $roles]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        // validate request
        $request->validate([
            'name' => 'required|min:3|max:255',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'selectedRoles' => 'required|array|min:1',
        ]);

        // update user data
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        // attach roles
        $user->syncRoles($request->selectedRoles);

        // render view
        return to_route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // delete user data
        $user->delete();

        // render view
        return back();
    }

    public function bookmarkedPosts()
    {
        $user = auth()->user();

        $bookmarkedPosts = $user->bookmarkedPosts()
        ->with(['user:id,name', 'community:id,name'])
        ->withCount(['comments', 'likers'])
        ->latest('bookmark_post.created_at')
        ->paginate(10);
        
        return inertia('Profile/BookmarkedPosts', [
            'posts' => $bookmarkedPosts,
        ]);

    }

    public function myPosts()
    {
        $user = auth()->user();
        
        $myPosts = $user->posts()
            ->with(['user:id,name', 'community:id,name'])
            ->withCount(['comments', 'likers'])
            ->latest()
            ->paginate(10);

        return inertia('Profile/MyPosts', [
            'posts' => $myPosts,
        ]);
    }
    
    public function myMarketplaces()
    {
        $user = auth()->user();

        $myMarketplaces = $user->marketplaces()
            ->latest()
            ->paginate(10)
            ->through(function ($marketplace) {
                $marketplace->price = Number::currency($marketplace->price, 'IDR', 'id_ID');
                $marketplace->kecamatan = Kecamatan::labels()[$marketplace->kecamatan] ?? $marketplace->kecamatan;
                $marketplace->kelurahan = Kelurahan::labels()[$marketplace->kelurahan] ?? $marketplace->kelurahan;
                $marketplace->type = MarketplaceType::labels()[$marketplace->type] ?? $marketplace->type;

                $firstMedia = $marketplace->getFirstMedia('photos'); 
                $marketplace->photo_url = $firstMedia ? $firstMedia->getUrl() : null;
                return $marketplace;
            });

        return inertia('Profile/MyMarketplaces', [
            'marketplaces' => $myMarketplaces,
        ]);
    }
}