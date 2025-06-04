import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Link, usePage, Head, router } from '@inertiajs/react';
import hasAnyPermission from '@/Utils/Permission';
import { Users, 
    MessageSquare, 
    Eye, 
    PlusCircle, 
    Search,
    CheckCircle,
    RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';

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

export default function Index({ communities, auth_user_id, filters: initialFiltersProp }) {
    const { props: pageProps } = usePage();
    const permission = pageProps.permission || {};

    // State untuk filter, diinisialisasi dengan nilai dari props atau default
    const [filters, setFilters] = useState({
        search: initialFiltersProp?.search || '',
        sortBy: initialFiltersProp?.sortBy || '',
    });

    // Update state filter lokal jika props filter dari controller berubah
    useEffect(() => {
        setFilters({
            search: initialFiltersProp?.search || '',
            sortBy: initialFiltersProp?.sortBy || '',
        });
    }, [initialFiltersProp]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => {
            const updatedFilters = { ...prevFilters, [name]: value };
            return updatedFilters;
        });
    };

    const applyFilters = () => {
        router.get(route('community.index'), filters, {
            preserveScroll: true,
            preserveState: true, // Agar input filter tidak hilang
            replace: true // Agar tidak menambah history browser untuk setiap filter
        });
    };

    const resetFilters = () => {
        const defaultFilters = {
            search: '', sortBy: '',
        };
        setFilters(defaultFilters);
        router.get(route('community.index'), defaultFilters, {
            preserveScroll: true,
            preserveState: true,
            replace: true
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Pilih Komunitas Diskusi
                </h2>
            }>

            <Head title="Komunitas"/>

            {/* Filter  */}
            <div className="px-4 py-6 sm:px-6 lg:px-8">
                
                <div className="p-6 mb-6 bg-white border border-gray-300 rounded-lg shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">Filter Komunitas</h2>
                    <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 md:grid-cols-4">
                        <input
                            type="text"
                            name="search"
                            placeholder="Cari nama atau deskripsi..."
                            value={filters.search}
                            onChange={handleFilterChange}
                            className="p-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <select
                            name="sort_by"
                            value={filters.sort_by}
                            onChange={handleFilterChange}
                            className="p-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="newest">Terbaru</option>
                            <option value="most_members">Anggota Terbanyak</option>
                            <option value="most_posts">Postingan Terbanyak</option>
                        </select>
                        <Button onClick={applyFilters}>Terapkan Filter</Button>
                        <Button onClick={resetFilters} variant="outline"><RotateCcw size={16} className="mr-2" /> Reset Filter</Button>
                    </div>
                    {/* <div className="flex items-center space-x-2"> */}
                    {/* </div> */}
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
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {communities.data.map((community) => (
                            
                                <div key={community.id} className="flex flex-col p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex flex-row mb-3">                                        
                                        {/* {community.creator && (
                                            <p className="mb-1 text-xs text-gray-500">
                                                Dibuat oleh: <span className="font-medium text-gray-700">{community.creator.name}</span>
                                            </p>
                                        )} */}
                                        <h3 className="flex items-center text-xl font-bold text-gray-900">                                            
                                            <Link href={route('community.show', community.id)} className="group-hover:text-blue-600 transition-colors">
                                                {community.name}
                                            </Link>
                                        </h3>
                                        {auth_user_id && (
                                            (community.members && community.members.length > 0) && (
                                                <div className="flex items-center text-center justify-center px-2 py-1 m-2 text-xs font-medium text-green-700 bg-green-100 border border-green-300 rounded-md">
                                                    {/* <CheckCircle className="w-4 h-4 mr-1.5" /> */}
                                                    Sudah Bergabung
                                                </div>
                                            )
                                        )}
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