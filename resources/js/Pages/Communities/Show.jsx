import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Settings,
    MessageSquare,
    PlusCircle,
    ThumbsUp,
    User,
    ArrowLeft
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

export default function Show({ community, posts, isMember, isCreator, isAdmin}) {

    const handleJoinCommunity = () => {
        router.post(route('community.join', community.id), {}, { preserveScroll: true });
    };

    const handleLeaveCommunity = () => {
        router.post(route('community.leave', community.id), {}, { preserveScroll: true });
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
                <Link
                    href={route('community.index')}
                    className="flex items-center mb-6 text-sm text-gray-500 transition-colors hover:text-blue-600"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Kembali ke Daftar Komunitas
                </Link>

                <div className="p-4 border rounded-md shadow-sm bg-white">
                    <h2 className="text-lg font-semibold mb-2">Tentang Komunitas</h2>
                    <p className="text-gray-800 mb-4">
                        {community.description}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Dibuat pada {formatDate(community.created_at)}</span>
                        <div className="flex items-center gap-1">
                            <User className="w-4 h-4 stroke-2 mr-1"/>
                            <span>{community.members_count} anggota</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-end gap-3">
                    <h2 className="flex-auto text-2xl font-semibold text-gray-800">Postingan di Komunitas Ini</h2>
                    {(isCreator || isAdmin) && (
                        <Link href={route('community.edit', community.id)}>
                            <Button className="flex bg-white border-slate-300 border-2 text-black hover:text-white hover:border-neutral-800 items-center w-full md:w-fit">
                                <Settings className="w-4 h-4 mr-2" />
                                Kelola Komunitas
                            </Button>
                        </Link>
                    )}
                    {isMember && !isCreator && (
                         <Button onClick={handleLeaveCommunity} variant="destructive" className="flex items-center w-full md:w-fit">
                            Keluar Komunitas
                        </Button>
                    )}
                    {!isMember && (
                        <Button onClick={handleJoinCommunity} className="flex items-center w-full md:w-fit">
                            Gabung Komunitas
                        </Button>
                    )}
                    {(isMember || isAdmin || isCreator) && (
                        <Link href={route('post.create', { community_id: community.id })}>
                            <Button className="flex items-center w-full md:w-fit">
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Buat Postingan
                            </Button>
                        </Link>
                    )}
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
                                        <Link href={route('post.show', post.id)}>
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
                                            href={route('post.show', post.id)}
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