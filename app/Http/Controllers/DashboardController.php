<?php

namespace App\Http\Controllers;

use App\Models\Marketplace;
use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;
use \Illuminate\Support\Number;
use \App\Enums\MarketplaceType;
use App\Enums\Kecamatan;
use App\Enums\Kelurahan;

class DashboardController extends Controller {

    public function index()
    {
        $user = auth()->user();

        $latestMarketplaces = Marketplace::with('user')
            ->orderBy('status', 'asc')
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(function ($item) {               
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'description' => $item->description,
                    'price_formatted' => Number::currency($item->price, 'IDR', 'id_ID'),
                    'kecamatan' => Kecamatan::labels()[$item->kecamatan] ?? $item->kecamatan,
                    'kelurahan' => Kelurahan::labels()[$item->kelurahan] ?? $item->kelurahan,
                    'type_label' => MarketplaceType::labels()[$item->type] ?? $item->type,
                    'photo_url' => $item->getFirstMedia('photos') ? $item->getFirstMedia('photos')->getUrl() : null,
                    'link' => route('marketplace.show', $item->id),
                ];
            })->take(4);

        $feedPosts = collect();
        $hasJoinedCommunities = false;

        if ($user) {
            $joinedCommunityIds = $user->communities()->pluck('communities.id');
            $hasJoinedCommunities = $joinedCommunityIds->isNotEmpty();

            if ($hasJoinedCommunities) {
                $feedPosts = Post::whereIn('community_id', $joinedCommunityIds)
                    ->with(['user:id,name', 'community:id,name'])
                    ->withCount(['comments', 'likers'])
                    ->latest('updated_at')
                    ->take(4)
                    ->get()
                    ->map(function ($post) {
                        return [
                            'id' => $post->id,
                            'name' => $post->name,
                            'user_name' => $post->user->name,
                            'profile_photo_url' => $post->user->profile_photo_url,
                            'title' =>  $post->title,
                            'description' =>  $post->description,
                            'community_name' => $post->community->name,
                            'community_link' => route('community.show', $post->community->id),
                            'post_link' => route('post.show', $post->id),
                            'updated_at_formatted' => $post->updated_at->diffForHumans(),
                            'likers_count' => $post->likers_count,
                            'comments_count' => $post->comments_count,
                        ];
                    });
            }
        }

        return Inertia::render('Dashboard', [
            'latestMarketplaces' => $latestMarketplaces,
            'feedPosts' => $feedPosts,
            'hasJoinedCommunities' => $hasJoinedCommunities,
        ]);
    }
    
}