import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { ShoppingBag, MessageSquareText, Users, ArrowRight, ImageOff, ThumbsUp, MessageCircle, Factory } from 'lucide-react';

const MarketplaceCard = ({ marketplace }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Link href={marketplace.link} className="block">
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                    {marketplace.photo_url ? (
                        <img src={marketplace.photo_url} alt={marketplace.name} className="w-full h-full object-cover" />
                    ) : (
                        <ImageOff className="w-12 h-12 text-gray-400" />
                    )}
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-sm text-gray-800 truncate" title={marketplace.name}>
                        {marketplace.name}
                    </h3>
                    <p className="text-md text-indigo-600 font-bold">{marketplace.price_formatted}</p>
                    <p className="flex text-xs text-gray-500 mt-1 text-center"><Factory className="w-4 h-4 mr-1"/>{marketplace.type_label}</p>
                </div>
            </Link>
        </div>
    );
};

const PostCard = ({ post }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-2">
                {/* Avatar sederhana */}
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-semibold mr-2">
                    {/* {post.user_name.charAt(0)} */}
                    <img src={post.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.user?.name || 'User')}&color=7F9CF5&background=EBF4FF`}
                        alt={post.user?.name || 'User Avatar'}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                </div>
                <div className="flex flex-col lg:space-x-1 sm:flex-row text-sm">
                    <p className="text-gray-700 font-semibold">{post.user_name}</p>
                    <span className="sm:inline hidden">•</span>
                    <Link href={post.community_link} className="text-indigo-500 hover:underline">
                        di {post.community_name}
                    </Link>
                </div>
                <span className="text-xs text-gray-400 ml-auto">{post.updated_at_formatted}</span>
            </div>                
            <Link href={post.post_link} className="block">
                <h3 className="font-semibold text-sm text-gray-800 mb-1 hover:text-indigo-700 truncate" title={post.title}>
                    {post.title}
                </h3>
                <h3 className="font-normal text-sm text-gray-800 mb-1 hover:text-indigo-700 truncate" title={post.description}>
                    {post.description}
                </h3>
                <div className="flex items-center text-xs text-gray-500 space-x-3 mt-2">
                    <span className="flex items-center"><ThumbsUp size={14} className="mr-1" /> {post.likers_count}</span>
                    <span className="flex items-center"><MessageCircle size={14} className="mr-1" /> {post.comments_count}</span>
                </div>
            </Link>
        </div>
    );
};

export default function Dashboard({ auth, latestMarketplaces, feedPosts, hasJoinedCommunities }) {
    const user = auth.user;

    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8 px-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-2xl font-semibold">Selamat Datang Kembali, {user.name}!</h3>
                            <p className="text-gray-600 mt-1">Berikut adalah ringkasan aktivitas dan informasi terbaru untuk Anda.</p>
                        </div>
                    </div>

                    <section>
                        <div className="flex flex-col sm:flex-row lg:justify-between lg:items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-700 flex">
                                <ShoppingBag size={22} className="mr-2 text-indigo-500" />
                                Lapak Terbaru Untuk Anda
                            </h3>
                            <Link href={route('marketplace.index')} className="text-sm text-indigo-600 hover:underline flex">
                                Lihat Semua Lapak <ArrowRight size={16} className="ml-1" />
                            </Link>
                        </div>
                        {latestMarketplaces && latestMarketplaces.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {latestMarketplaces.map(marketplace => (
                                    <MarketplaceCard key={marketplace.id} marketplace={marketplace} />
                                ))}
                            </div>
                        ) : (
                            <div className="p-6 bg-white rounded-lg shadow-sm text-center text-gray-500">
                                Belum ada lapak terbaru untuk ditampilkan.
                            </div>
                        )}
                    </section>

                    <section>
                        <div className="flex flex-col sm:flex-row lg:justify-between lg:items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-700 flex">
                                <MessageSquareText size={22} className="mr-2 text-indigo-500" />
                                Aktivitas Terbaru di Komunitas Anda
                            </h3>
                            {hasJoinedCommunities && feedPosts && feedPosts.length > 0 && (
                                <Link href={route('community.index')} className="text-sm text-indigo-600 hover:underline flex">
                                    Lihat Semua Komunitas <ArrowRight size={16} className="ml-1" />
                                </Link>
                            )}
                        </div>

                        {hasJoinedCommunities && feedPosts && feedPosts.length > 0 ? (
                            <div className="space-y-4">
                                {feedPosts.map(post => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className="p-10 bg-white rounded-lg shadow-sm text-center">
                                <Users size={48} className="mx-auto text-gray-400 mb-4" />
                                <h4 className="font-semibold text-lg text-gray-700">Anda belum bergabung dengan komunitas manapun.</h4>
                                <p className="text-sm text-gray-500 mt-2 mb-6">
                                    Bergabunglah dengan komunitas untuk berdiskusi, berbagi, dan mendapatkan wawasan baru dari sesama pelaku UMKM!
                                </p>
                                <Link href={route('community.index')}>
                                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                                        Jelajahi Komunitas Sekarang
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </section>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
