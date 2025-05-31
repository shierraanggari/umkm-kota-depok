import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import hasAnyPermission from '@/Utils/Permission';
import { Users, MessageSquare, Eye, PlusCircle, Search } from 'lucide-react';

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

export default function Index({ communities, auth }) {
    const { props: pageProps } = usePage();
    const permission = pageProps.permission || {};

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Pilih Komunitas Diskusi
                </h2>
            }>

            {/* Filter  */}
            <div className="px-4 py-6 sm:px-6 lg:px-8">
                
                <div className="p-6 mb-6 bg-white border border-gray-300 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4">
                        <Search className="w-5 h-5 mr-2 text-gray-600" />
                        <h2 className="text-xl font-semibold text-gray-800">Filter Komunitas</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-4">
                        <input type="text" placeholder="Cari nama komunitas..." className="p-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                        
                        <select className="p-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Semua Kategori (Contoh)</option>
                            <option>Teknologi</option>
                            <option>Bisnis</option>
                        </select>
                        <select className="p-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Urutkan (Contoh)</option>
                            <option>Terbaru</option>
                            <option>Terpopuler</option>
                        </select>
                        <Button variant="outline" className="lg:col-start-4"> 
                            Terapkan Filter
                        </Button>
                    </div>
                </div>

                {/* Button Tambah */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800">Daftar Komunitas</h3>
                    
                    {hasAnyPermission(['community create'], permission) && (
                        <Link href={route('community.create')}>
                            <Button className="flex items-center">
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Buat Komunitas
                            </Button>
                        </Link>
                    )}
                </div>

                {/* List */}
                {communities && communities.data && communities.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {communities.data.map((community) => (
                            
                                <div key={community.id} className="flex flex-col p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                                    <div className="mb-3">
                                        
                                        {/* {community.creator && (
                                            <p className="mb-1 text-xs text-gray-500">
                                                Dibuat oleh: <span className="font-medium text-gray-700">{community.creator.name}</span>
                                            </p>
                                        )} */}
                                        <h3 className="text-xl font-bold text-gray-900 truncate group">
                                            
                                            <Link href={route('community.show', community.id)} className="group-hover:text-blue-600 transition-colors">
                                                {community.name}
                                            </Link>
                                        </h3>
                                    </div>
                                    <p className="flex-grow mt-1 text-sm text-gray-700_leading-relaxed line-clamp-3">{community.description}</p> 
                                    <div className="flex items-center justify-between mt-4 text-xs text-gray-600">
                                        <span className="flex items-center">
                                            <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                                            {community.posts_count} Posts
                                        </span>
                                        <span className="flex items-center">
                                            <Users className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                                            {community.members_count} Members
                                        </span>
                                    </div>
                                    <div className="mt-5">
                                        
                                        <Link href={route('community.show', community.id)} className="w-full">
                                            <Button variant="outline" className="w-full flex items-center justify-center">
                                                <Eye className="w-4 h-4 mr-2" />
                                                Lihat Komunitas
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <SimplePagination links={communities.links} />
                    </>
                ) : (                
                    <div className="p-10 mt-6 text-center bg-white border border-gray-300 rounded-lg shadow-sm">
                        <Users size={48} className="mx-auto mb-4 text-gray-400" />
                        <p className="text-xl font-semibold text-gray-700">Belum ada komunitas.</p>
                        <p className="mt-2 text-sm text-gray-500">
                            Saat ini belum ada data komunitas yang dapat ditampilkan.
                        </p>
                    </div>
                )}                
            </div>
        </AuthenticatedLayout>
    );
}