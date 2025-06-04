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
use Illuminate\Support\Number;
use Propaganistas\LaravelPhone\PhoneNumber;
use Illuminate\Support\Facades\DB;

class MarketplaceController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            // new Middleware('permission:lapak index', only: ['index', 'show']),
            new Middleware('permission:lapak create', only: ['create', 'store']),
            new Middleware('permission:lapak edit', only: ['edit', 'update']),
            new Middleware('permission:lapak delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Filter
        $search = $request->input('search');
        $kecamatanFilter = $request->input('kecamatan');
        $kelurahanFilter = $request->input('kelurahan');
        $typeFilter = $request->input('type');
        $minPrice = $request->input('minPrice');
        $maxPrice = $request->input('maxPrice');
        $minSize = $request->input('minSize');
        $maxSize = $request->input('maxSize');

        $query = Marketplace::with('user')
            ->orderBy('status', 'asc')
            ->orderBy('updated_at', 'desc');

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                  ->orWhere('description', 'like', '%' . $search . '%');
            });
        }

        if ($kecamatanFilter) {
            $query->where('kecamatan', $kecamatanFilter);
        }

        if ($kelurahanFilter) {
            $query->where('kelurahan', $kelurahanFilter);
        }

        if ($typeFilter) {
            $query->where('type', $typeFilter);
        }

        if ($minPrice) {
            $query->where('price', '>=', $minPrice);
        }

        if ($maxPrice) {
            $query->where('price', '<=', $maxPrice);
        }

        if ($minSize) {
            $query->where(DB::raw('size_width*size_length'), '>=', $minSize);
        }

        if ($maxSize) {
            $query->where(DB::raw('size_width*size_length'), '<=', $maxSize);
        }

        // Data
        $marketplaces = $query
            // Marketplace::with('user')
            // ->orderBy('status', 'asc')
            // ->orderBy('updated_at', 'desc')
            ->paginate(18)
            ->withQueryString() // Agar parameter filter tetap ada di link paginasi
            ->through(function ($item) {
                $item->price = Number::currency($item->price, 'IDR', 'id_ID');
                $item->kecamatan = Kecamatan::labels()[$item->kecamatan] ?? $item->kecamatan;
                $item->kelurahan = Kelurahan::labels()[$item->kelurahan] ?? $item->kelurahan;
                $item->type = MarketplaceType::labels()[$item->type] ?? $item->type;
                $item->kecamatan_label = isset($item->kecamatan) ? Kecamatan::labels()[$item->kecamatan] ?? $item->kecamatan : 'N/A';
                $item->kelurahan_label = isset($item->kelurahan) ? Kelurahan::labels()[$item->kelurahan] ?? $item->kelurahan : 'N/A';
                $item->type_label = isset($item->type) ? MarketplaceType::labels()[$item->type] ?? $item->type : 'N/A';

                $firstMedia = $item->getFirstMedia('photos');
                $item->photo = $firstMedia ? $firstMedia->getUrl() : null;

                return $item;
            }
        );

        return inertia('Marketplaces/Index', [
            'marketplaces' => $marketplaces,
            'filters' => $request->only(['search', 'kecamatan', 'kelurahan','type', 'minPrice', 'maxPrice', 'minSize', 'maxSize']),
            'kecamatans' => Kecamatan::options(),
            'kelurahans' => Kelurahan::groupedByKecamatan(),
            'types' => MarketplaceType::options(),
            'auth_user_id' => auth()->id(),
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
            'description' => 'required|string',
            'size_length' => 'required|numeric|min:0',
            'size_width' => 'required|numeric|min:0',
            'price' => 'required|numeric|min:0',
            'price_type' => 'required|in:yearly,monthly,other',
            'kecamatan' => 'required|string',
            'kelurahan' => 'required|string',
            'phone_number' => 'required|string|phone:ID,mobile',
            'address' => 'nullable|string|max:255',
            'long' => 'nullable|numeric',
            'lat' => 'nullable|numeric',
            'status' => 'required|in:available,unavailable',
            'photos.*' => 'nullable|image|mimes:jpeg,png,jpg,heif|max:2048',
        ]);

        $nomorInput = $validated['phone_number'];
        $kodeNegara = 'ID';

        $phoneNumberObject = new PhoneNumber($nomorInput, $kodeNegara);
        $e164Formatted = $phoneNumberObject->formatE164();
        
        $validated['phone_number'] = $e164Formatted;

        $validated['user_id'] = auth()->id();

        $marketplace = Marketplace::create($validated);

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $marketplace->addMedia($photo)->toMediaCollection('photos');
            }
        }

        session()->flash('success', 'Lapak berhasil dibuat.');

        return redirect()->route('marketplace.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Marketplace $marketplace)
    {
        $marketplace->load('user');
        
        $marketplace->price = Number::currency($marketplace->price, 'IDR', 'id_ID');
        $marketplace->kecamatan = Kecamatan::labels()[$marketplace->kecamatan] ?? $marketplace->kecamatan;
        $marketplace->kelurahan = Kelurahan::labels()[$marketplace->kelurahan] ?? $marketplace->kelurahan;
        $marketplace->type = MarketplaceType::labels()[$marketplace->type] ?? $marketplace->type;
        
        return inertia('Marketplaces/Show', [
            'marketplace' => $marketplace,
            'photos' => $marketplace->getMedia('photos')->map(function ($media) {
                return [
                    'id' => $media->id,
                    'url' => $media->getUrl(),
                ];
            })->toArray(),
            'auth_user_id' => auth()->id(),
        ]);

        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Marketplace $marketplace)
    {
        if ($marketplace->user_id !== auth()->id() && auth()->id() !== 1) {
            abort(403, 'No permission.');
        };

        return inertia('Marketplaces/Edit', [
            'marketplace' => [
                'id' => $marketplace->id,
                'name' => $marketplace->name,
                'type' => $marketplace->type,
                'description' => $marketplace->description,
                'size_length' => $marketplace->size_length,
                'size_width' => $marketplace->size_width,
                'price' => $marketplace->price,
                'price_type' => $marketplace->price_type,
                'kecamatan' => $marketplace->kecamatan,
                'kelurahan' => $marketplace->kelurahan,
                'phone_number' => $marketplace->phone_number,
                'address' => $marketplace->address,
                'long' => $marketplace->long,
                'lat' => $marketplace->lat,
                'photos' => $marketplace->getMedia('photos')->map(function ($media) {
                    return [
                        'id' => $media->id,
                        'url' => $media->getUrl(),
                    ];
                })->toArray(),
            ],
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
        // if ($marketplace->user_id !== auth()->id() && !auth()->user()->hasRole('admin')) {
        //      abort(403, 'Anda tidak memiliki izin untuk memperbarui lapak ini.');
        // }

        if ($marketplace->user_id !== auth()->id() && auth()->id() !== 1) {
            abort(403, 'No permission.');
        };

        $validated = $request->validate([
            'name' => 'required|string',
            'type' => 'required|in:' . implode(',', MarketplaceType::values()),
            'description' => 'required|string',
            'size_length' => 'required|numeric|min:0',
            'size_width' => 'required|numeric|min:0',
            'price' => 'required|numeric|min:0',
            'price_type' => 'required|in:yearly,monthly,other',
            'kecamatan' => 'required|string',
            'kelurahan' => 'required|string',
            'phone_number' => 'nullable|string|phone:ID,mobile',
            'address' => 'nullable|string|max:255',
            'long' => 'nullable|numeric',
            'lat' => 'nullable|numeric',
            'status' => 'required|in:available,unavailable',    
            'photos.*' => 'nullable|image|mimes:jpeg,png,jpg,heif|max:2048',
            'deleted_photos.*' => 'nullable|integer|exists:media,id'
        ]);
        
        if (!empty($validated['deleted_photos'])) {
            foreach ($validated['deleted_photos'] as $mediaId) {
                $media = $marketplace->media()->find($mediaId);
                if ($media && $media->model_id === $marketplace->id && $media->model_type === get_class($marketplace)) {
                    $media->delete();
                }
            }
        }

        $currentPhotosCount = $marketplace->fresh()->getMedia('photos')->count();
        $newPhotosCount = count($request->file('photos') ?? []);

        if (($currentPhotosCount + $newPhotosCount) > 5) {
            return back()->withErrors(['photos' => 'Jumlah total foto tidak boleh melebihi 5. Lapak saat ini memiliki ' . $currentPhotosCount . ' foto dan Anda mencoba menambahkan ' . $newPhotosCount . ' foto baru.'])->withInput();
        }

        $marketplaceData = collect($validated)->except(['photos', 'deleted_photos'])->toArray();  

        $nomorInput = $marketplaceData['phone_number'];
        $kodeNegara = 'ID';

        $phoneNumberObject = new PhoneNumber($nomorInput, $kodeNegara);
        $e164Formatted = $phoneNumberObject->formatE164();
        
        $marketplaceData['phone_number'] = $e164Formatted;

        $marketplace->update($marketplaceData);

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $marketplace->addMedia($photo)->toMediaCollection('photos');
            }
        }

        session()->flash('success', 'Lapak berhasil diperbarui.');

        return redirect()->route('marketplace.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Marketplace $marketplace)
    {
        if ($marketplace->user_id !== auth()->id() && auth()->id() !== 1) {
            abort(403, 'No permission.');
        };

        $marketplace->clearMediaCollection('photos');

        $marketplace->delete();

        return redirect()->route('marketplace.index')->with('success', 'Lapak berhasil dihapus.');
    }
}
