import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Settings,
    MessageSquare,
    PlusCircle
 } from "lucide-react";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
};

const SimplePagination = ({ links }) => {
    if (!links || links.length <= 3) return null;

    return (
        <nav className="flex items-center justify-center mt-8 space-x-1">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || '#'}
                    className={`px-3 py-2 text-sm rounded-md 
                        ${link.active ? 'bg-blue-600 text-white font-semibold' : 'text-gray-700 hover:bg-gray-200'}
                        ${!link.url ? 'text-gray-400 cursor-not-allowed' : ''}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    as={!link.url ? 'span' : 'a'}
                    disabled={!link.url}
                />
            ))}
        </nav>
    );
};

export default function Show({ community, posts, isMember, isCreatorOrAdmin}) {

    const handleJoinCommunity = () => {
        router.post(route('communities.join', community.id), {}, { preserveScroll: true });
    };

    const handleLeaveCommunity = () => {
        router.post(route('communities.leave', community.id), {}, { preserveScroll: true });
    };
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {community.name}
                </h2>
            }
        >
            <div className="p-4 mt-2 space-y-4">
                <div className="p-4 border rounded-md shadow-sm bg-white">
                    <h2 className="text-lg font-semibold mb-2">Tentang Komunitas</h2>
                    <p className="text-gray-800 mb-4">
                        {community.description}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Dibuat pada {formatDate(community.created_at)}</span>
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m0-4a4 4 0 118 0 4 4 0 01-8 0z" />
                            </svg>
                            <span>{community.members_count} anggota</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-end gap-3">
                    <h2 className="flex-auto text-2xl font-semibold text-gray-800">Postingan di Komunitas Ini</h2>
                    {isCreatorOrAdmin && (
                        <Link href={route('community.edit', community.id)}>
                            <Button variant="outline" className="flex items-center w-full md:w-fit">
                                <Settings className="w-4 h-4 mr-2" />
                                Kelola Komunitas
                            </Button>
                        </Link>
                    )}
                    {isMember && !isCreatorOrAdmin && (
                         <Button onClick={handleLeaveCommunity} variant="destructive" className="flex items-center w-full md:w-fit">
                            Keluar Komunitas
                        </Button>
                    )}
                    {!isMember && (
                        <Button onClick={handleJoinCommunity} className="flex items-center w-full md:w-fit">
                            Gabung Komunitas
                        </Button>
                    )}
                    <Link href={route('post.create', { community_id: community.id })}>
                        <Button className="flex items-center w-full md:w-fit">
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Buat Postingan
                        </Button>
                    </Link>
                </div>

                <div className="mt-2">
                    {posts.data && posts.data.length > 0 ? (
                        <div className="space-y-6">
                            {posts.data.map((post) => (
                                <div key={post.id} className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm transition-shadow hover:shadow-md">
                                    <div className="flex items-start mb-3 space-x-3">
                                        {/* Avatar */}
                                        <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-lg font-semibold">
                                            {post.user ? post.user.name.charAt(0).toUpperCase() : '?'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{post.user ? post.user.name : 'User Anonim'}</p>
                                            <p className="text-xs text-gray-500">{formatDate(post.created_at)}</p>
                                        </div>
                                    </div>

                                    <h3 className="mb-2 text-xl font-bold text-gray-800 hover:text-blue-600">                                        
                                        <Link href={route('posts.show', post.id)}>
                                            {post.name}
                                        </Link>
                                    </h3>

                                    <p className="mb-4 text-sm leading-relaxed text-gray-700 line-clamp-3">{post.description}</p>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center space-x-4">
                                            <span className="flex items-center">
                                                <ThumbsUp className="w-4 h-4 mr-1" /> {post.likers_count}
                                            </span>
                                            <span className="flex items-center">
                                                <MessageSquare className="w-4 h-4 mr-1" /> {post.comments_count}
                                            </span>
                                        </div>
                                        <Link
                                            href={route('posts.show', post.id)}
                                            className="font-medium text-blue-600 hover:text-blue-700">
                                            Lihat Selengkapnya
                                        </Link>
                                    </div>
                                </div>
                            ))}
                            <SimplePagination links={posts.links} /> {/* Paginasi untuk postingan */}
                        </div>
                    ) : (
                        <div className="p-8 mt-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
                            <MessageSquare size={48} className="mx-auto mb-4 text-gray-400" />
                            <p className="text-lg font-semibold text-gray-700">Belum ada postingan di komunitas ini.</p>
                            {isMember && (
                                <p className="mt-2 text-sm text-gray-500">Jadilah yang pertama membuat postingan!</p>
                            )}
                        </div>
                    )}
                </div>
            </div>            
        </AuthenticatedLayout>
    )
}