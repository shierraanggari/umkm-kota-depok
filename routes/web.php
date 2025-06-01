<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\MarketplaceController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\InteractionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/marketplace', function () {
    return Inertia::render('Marketplaces/Index');
})->name('marketplace.index');

Route::middleware('auth')->group(function () {
    // Permission
    Route::resource('/permissions', PermissionController::class);    
    Route::resource('roles', RoleController::class)->except('show');    
    Route::resource('/users', UserController::class);
    
    // Main Feature
    Route::resource('/marketplace', MarketplaceController::class);
    Route::resource('/community', CommunityController::class);
    Route::resource('/post', PostController::class);

    // Community
    Route::post('/community/{community}/join', [CommunityController::class, 'join'])
    ->name('community.join');
    Route::post('/community/{community}/leave', [CommunityController::class, 'leave'])
        ->name('community.leave');
    Route::post('/community/{community}/users/{userToBan}/ban', [CommunityController::class, 'banUser'])
        ->name('community.users.ban');
    Route::post('/community/{community}/users/{userToUnban}/unban', [CommunityController::class, 'unbanUser'])
        ->name('community.users.unban');

    // Post
    Route::post('/post/{post}/like', [InteractionController::class, 'togglePostLike'])
        ->name('post.like.toggle');
    Route::post('/post/{post}/bookmark', [InteractionController::class, 'togglePostBookmark'])
        ->name('post.bookmark.toggle');
    Route::post('/comments/{comment}/like', [InteractionController::class, 'toggleCommentLike'])
        ->name('comments.like.toggle');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
