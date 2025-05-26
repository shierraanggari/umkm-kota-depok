import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function ShowCommunity() {
    const community = {
        id: 1,
        name: "Pecinta Sayuran Depok"
    }
    
    const posts = [
        {
            id: 1,
            author: {
                avatar: "https://i.pinimg.com/736x/fe/de/a5/fedea5d019bd35bf8d3e5638129a8126.jpg",
                name: "Yukimiya Kenyu"
            },
            created_at: "2024-08-18T10:00:00Z",
            title: "Gimana cara membangun bisnis dengan modal 15 ribu?",
            content: "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet.   ",
            likes_count: 19,
            comments_count: 9
        },
        {
            id: 1,
            author: {
                avatar: "https://i.pinimg.com/736x/fe/de/a5/fedea5d019bd35bf8d3e5638129a8126.jpg",
                name: "Yukimiya Kenyu"
            },
            created_at: "2024-08-18T10:00:00Z",
            title: "Pertanian",
            content: "Guys normal gak aku mau jualan sayuran biar gampang masaknya",
            likes_count: 19,
            comments_count: 9
        }
    ]
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Komunitas Pertanian Depok Dua (ambil dari nama komunitas)
                </h2>
            }
        >
            <div className="p-4 mt-2 space-y-4">
                <div className="p-4 border rounded-md shadow-sm bg-white">
                    <h2 className="text-lg font-semibold mb-2">Tentang Komunitas</h2>
                    <p className="text-gray-800 mb-4">
                        Ini merupakan deskripsi komunitas. Komunitas ini dibuat untuk saling berbagi, berdiskusi, dan tumbuh bersama khususnya pelaku UMKM dan masyarakat di Kota Depok. Mari bangun kolaborasi positif!
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Dibuat pada 18 Mei 2020</span>
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m0-4a4 4 0 118 0 4 4 0 01-8 0z" />
                            </svg>
                            <span>320 anggota</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                    <button className="border border-black bg-white text-black px-2 py-2 rounded hover:bg-slate-500 hover:text-white hover:border-white transition"> 
                        Kelola Komunitas
                    </button>
                    <button className="border border-black bg-white text-black px-2 py-2 rounded hover:bg-slate-500 hover:text-white hover:border-white transition"> 
                        Buat Postingan
                    </button>
                </div>


                {posts.length === 0 ? (
                    <p className="text-gray-500">Belum ada postingan.</p>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <div key={post.id} className="p-4 border rounded-md shadow-sm bg-white">
                                <div className="flex items-center space-x-3 mb-2">
                                    <img
                                        src={post.author.avatar || '/default-avatar.png'}
                                        alt={post.author.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <div>
                                        <p className="text-sm font-medium">{post.author.name}</p>
                                        <p className="text-xs text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <h3 className="pt-2 text-lg font-semibold text-gray-800">
                                    <Link href={`/communities/${community.id}/posts/${post.id}`}>
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="pt-1 text-sm text-gray-600 line-clamp-3">{post.content}</p>
                                <div className="pt-2 flex flex-row justify-between">
                                    <div className="text-sm text-gray-500 mt-2">
                                        <span>👍 {post.likes_count} suka</span>
                                        <span>💬 {post.comments_count} komentar</span>
                                    </div>
                                    <a 
                                        href="#"
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                        Lebih lanjut
                                    </a>    
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>            
        </AuthenticatedLayout>
    )
}