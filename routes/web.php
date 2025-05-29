<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\MarketplaceController;
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

// Route::resource('/marketplace', MarketplaceController::class)
//     ->only(['index', 'show']);

// Route::middleware(['auth'])->group(function () {
//     Route::resource('/marketplace', MarketplaceController::class)
//         ->except(['index', 'show']);
// });

Route::get('/discussions', function () {
    return Inertia::render('Discussions/CreateCommunity');
})->middleware(['auth', 'verified'])->name('discussions');

Route::middleware('auth')->group(function () {
    Route::resource('/permissions', PermissionController::class);

    Route::resource('/marketplace', MarketplaceController::class);
    
    Route::resource('roles', RoleController::class)->except('show');
    
    Route::resource('/users', UserController::class);

    // Route::get('/marketplace', [MarketplaceController::class, 'index'])->name('marketplace.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
