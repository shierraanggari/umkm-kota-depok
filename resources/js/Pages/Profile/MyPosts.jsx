// File: resources/js/Pages/User/MyPosts.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react'; // Head ditambahkan
// import { Button } from '@/Components/ui/button'; // Dihilangkan jika tidak ada tombol edit/delete di list ini
import { MessageSquare, ThumbsUp, Edit3, Trash2 } from 'lucide-react'; // Edit3 dan Trash2 bisa dihilangkan jika tidak ada tombol aksi

// Fungsi format tanggal sederhana yang sudah Anda miliki
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        // Hapus hour dan minute jika tidak ingin menampilkan waktu
        // hour: '2-digit', 
        // minute: '2-digit'
    }).format(date);
};

// Komponen Paginasi Sederhana (jika Anda menggunakannya)
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
                    // disabled={!link.url} // 'disabled' tidak standar untuk Link 'as' span/a
                    preserveScroll
                />
            ))}
        </nav>
    );
};

export default function MyPosts({ auth, posts }) { // Menerima auth dan posts

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Postingan Saya</h2>}
        >
            <Head title="Postingan Saya" />
            
            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto">
                    {posts.data && posts.data.length > 0 ? (
                        <div className="space-y-6">
                            {posts.data.map((post) => (
                                <div key={post.id} className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm transition-shadow hover:shadow-md">
                                    {/* User Info */}
                                    <div className="flex items-start mb-3 space-x-3">
                                        {/* Avatar */}
                                        <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-lg font-semibold">
                                            {auth.user ? auth.user.name.charAt(0).toUpperCase() : '?'}
                                        </div>
                                        <div>
                                            {/* Nama User */}
                                            <p className="text-sm font-semibold text-gray-900">{auth.user ? auth.user.name : 'User Anonim'}</p>
                                            {/* Info Komunitas dan Tanggal */}
                                            <div className="flex flex-wrap items-center space-x-1 text-xs text-gray-500">
                                                {post.community && ( 
                                                    <Link href={route('community.show', post.community.id)} className="hover:underline text-blue-600">
                                                        Komunitas: {post.community.name}
                                                    </Link>
                                                )}
                                                {post.community && <span className="mx-1">•</span>}
                                                <span>{formatDate(post.created_at)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Judul Postingan */}
                                    <h3 className="mb-2 text-xl font-bold text-gray-800 hover:text-blue-700">                                        
                                        <Link href={route('post.show', post.id)}>
                                            {post.name}
                                        </Link>
                                    </h3>

                                    {/* Konten Postingan */}
                                    <p className="mb-4 text-sm leading-relaxed text-gray-700 line-clamp-3">{post.description}</p>
                                    
                                    {/* Statistik dan Aksi */}
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center space-x-4">
                                            <span className="flex items-center">
                                                <ThumbsUp className="w-4 h-4 mr-1" /> {post.likers_count || 0}
                                            </span>
                                            <span className="flex items-center">
                                                <MessageSquare className="w-4 h-4 mr-1" /> {post.comments_count || 0}
                                            </span>
                                        </div>
                                        {/* Tombol Lihat Selengkapnya */}
                                        <Link
                                            href={route('post.show', post.id)}
                                            className="font-medium text-blue-600 hover:text-blue-700">
                                            Lihat Selengkapnya
                                        </Link>
                                    </div>
                                </div>
                            ))}
                            {/* Paginasi */}
                            {posts.links && <SimplePagination links={posts.links} />}
                        </div>
                    ) : (
                        <div className="p-8 mt-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
                            <MessageSquare size={48} className="mx-auto mb-4 text-gray-400" />
                            <p className="text-lg font-semibold text-gray-700">Anda belum membuat postingan apapun.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}