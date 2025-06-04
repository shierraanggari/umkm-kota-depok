<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\MarketplaceController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\InteractionController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Guest', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('guest');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/marketplace', [MarketplaceController::class, 'index'])->name('marketplace.index');
Route::get('/marketplace/create', [MarketplaceController::class, 'create'])->name('marketplace.create');
Route::get('/marketplace/{marketplace}', [MarketplaceController::class, 'show'])->name('marketplace.show');

Route::get('/community', [CommunityController::class, 'index'])->name('community.index');
Route::get('/community/create', [CommunityController::class, 'create'])->name('community.create');
Route::get('/community/{community}', [CommunityController::class, 'show'])->name('community.show');

Route::middleware('auth')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])
    ->name('dashboard');

    // Permission
    Route::resource('/permissions', PermissionController::class);    
    Route::resource('roles', RoleController::class)->except('show');    
    Route::resource('/users', UserController::class);
    
    // Marketplace
    Route::resource('/marketplace', MarketplaceController::class)->except(['index', 'show', 'create']);
    
    // Community
    Route::resource('/community', CommunityController::class)->except(['index', 'show', 'create']);
    Route::post('/community/{community}/join', [CommunityController::class, 'join'])
    ->name('community.join');
    Route::post('/community/{community}/leave', [CommunityController::class, 'leave'])
    ->name('community.leave');
    Route::post('/community/{community}/users/{userToBan}/ban', [CommunityController::class, 'banUser'])
    ->name('community.users.ban');
    Route::post('/community/{community}/users/{userToUnban}/unban', [CommunityController::class, 'unbanUser'])
    ->name('community.users.unban');
    
    // Post
    Route::resource('/post', PostController::class);
    Route::post('/post/{post}/like', [InteractionController::class, 'togglePostLike'])
    ->name('post.like.toggle');
    Route::post('/post/{post}/bookmark', [InteractionController::class, 'togglePostBookmark'])
    ->name('post.bookmark.toggle');
    Route::post('/comment/{comment}/like', [InteractionController::class, 'toggleCommentLike'])
    ->name('comment.like.toggle');
    
    // Comment
    Route::resource('/comment', CommentController::class);
    Route::post('/post/{post}/comment', [CommentController::class, 'store'])
        ->name('comment.store');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
    Route::delete('/profile/photo', [ProfileController::class, 'destroyPhoto'])
        ->name('profile.photo.destroy');

    // User
    Route::get('/profile/bookmarked-posts', [UserController::class, 'bookmarkedPosts'])
        ->name('profile.bookmarkedPosts');
    Route::get('/profile/my-posts', [UserController::class, 'myPosts'])
        ->name('profile.myPosts');
    Route::get('/profile/my-marketplaces', [UserController::class, 'myMarketplaces'])
        ->name('profile.myMarketplaces');
});

require __DIR__.'/auth.php';
