<?php

namespace App\Http\Controllers;

use App\Models\Marketplace;
use App\Http\Controllers\Controller;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Http\Request;
use App\Enums\MarketplaceType;
use App\Enums\Kelurahan;
use App\Enums\Kecamatan;

class MarketplaceController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:lapak index', only: ['index']),
            new Middleware('permission:lapak create', only: ['create', 'store']),
            new Middleware('permission:lapak edit', only: ['edit', 'update']),
            new Middleware('permission:lapak delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $marketplaces = Marketplace::with('user')->latest()->get()->map(function ($item) {
            $item->kecamatan = Kecamatan::labels()[$item->kecamatan] ?? $item->kecamatan;
            $item->kelurahan = Kelurahan::labels()[$item->kelurahan] ?? $item->kelurahan;
            $item->type = MarketplaceType::labels()[$item->type] ?? $item->type;

            return $item;
        });

        return inertia('Marketplaces/Index', [
            'marketplaces' => $marketplaces,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Marketplaces/Create', [
            'types' => MarketplaceType::options(),
            'kelurahans' => Kelurahan::groupedByKecamatan(),
            'kecamatans' => Kecamatan::options(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'type' => 'required|in:' . implode(',', MarketplaceType::values()),
            'description' => 'nullable|string',
            'size_length' => 'nullable|numeric|min:0',
            'size_width' => 'nullable|numeric|min:0',
            'price' => 'required|numeric|min:0',
            'price_type' => 'required|in:yearly,monthly',
            'kecamatan' => 'nullable|string',
            'kelurahan' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'long' => 'nullable|numeric',
            'lat' => 'nullable|numeric',
        ]);

        $validated['user_id'] = auth()->id();

        Marketplace::create($validated);

        return redirect()->route('marketplace.index')->with('success', 'Lapak berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Marketplace $marketplace)
    {
        return inertia('Marketplaces/Show', [
            'marketplace' => $marketplace->load('user')
        ]);
        // dd($marketplace->load('user'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Marketplace $marketplace)
    {
        // if (!auth()->user()->can('lapak edit')) {
        //     abort(403, 'Tidak.');
        // }

        if ($marketplace->user_id !== auth()->id()) {
            abort(403, 'No permission.');
        };

        return inertia('Marketplaces/Edit', [
            'marketplace' => $marketplace,
            'types' => MarketplaceType::options(),
            'kelurahans' => Kelurahan::groupedByKecamatan(),
            'kecamatans' => Kecamatan::options(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Marketplace $marketplace)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'type' => 'required|in:' . implode(',', MarketplaceType::values()),
            'description' => 'nullable|string',
            'size_length' => 'nullable|numeric|min:0',
            'size_width' => 'nullable|numeric|min:0',
            'price' => 'required|numeric|min:0',
            'price_type' => 'required|in:yearly,monthly',
            'kecamatan' => 'nullable|string',
            'kelurahan' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'long' => 'nullable|numeric',
            'lat' => 'nullable|numeric',
        ]);

        if ($marketplace->user_id !== auth()->id()) {
            abort(403, 'Anda tidak memiliki izin untuk mengedit lapak ini.');
        }

        $marketplace->update($validated);

        return redirect()->route('marketplace.index')->with('success', 'Lapak berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Marketplace $marketplace)
    {
        $marketplace->delete();

        return redirect()->route('marketplace.index')->with('success', 'Lapak berhasil dihapus.');
    }
}
