// import Layout from "../Layout/Layout";
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, router, Head, usePage } from "@inertiajs/react";
import { Button } from '@/Components/ui/button';
import {
    MapPin,
    Factory,
    Ruler,
    ImageOff,
    RotateCcw,
    Store
} from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/Components/ui/dialog";

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
                    preserveScroll
                    preserveState
                />
            ))}
        </nav>
    );
};

export default function Index({ marketplaces, auth_user_id, kecamatans, kelurahans, types, filters: initialFiltersProp }) {
    const { auth } = usePage().props;

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    
    const [marketplaceToDelete, setMarketplaceToDelete] = useState(null);

    const handleOpenDeleteDialog = (marketplace) => {
        setMarketplaceToDelete(marketplace);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (marketplaceToDelete) {
            router.delete(route('marketplace.destroy', marketplaceToDelete.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setIsDeleteDialogOpen(false);
                    setMarketplaceToDelete(null);                    
                },
                onError: (errors) => {
                    console.error('Gagal menghapus lapak:', errors);
                    alert('Gagal menghapus lapak. Silakan coba lagi.');
                    setIsDeleteDialogOpen(false);
                    setMarketplaceToDelete(null);
                }
            });
        }
    };

   // State untuk filter, diinisialisasi dengan nilai dari props atau default
    const [filters, setFilters] = useState({
        search: initialFiltersProp?.search || '',
        kecamatan: initialFiltersProp?.kecamatan || '',
        kelurahan: initialFiltersProp?.kelurahan || '',
        type: initialFiltersProp?.type || '',
        minPrice: initialFiltersProp?.minPrice || '',
        maxPrice: initialFiltersProp?.maxPrice || '',
        minSize: initialFiltersProp?.minSize || '',
        maxSize: initialFiltersProp?.maxSize || '',
    });

    // Update state filter lokal jika props filter dari controller berubah
    useEffect(() => {
        setFilters({
            search: initialFiltersProp?.search || '',
            kecamatan: initialFiltersProp?.kecamatan || '',
            kelurahan: initialFiltersProp?.kelurahan || '',
            type: initialFiltersProp?.type || '',
            minPrice: initialFiltersProp?.minPrice || '',
            maxPrice: initialFiltersProp?.maxPrice || '',
            minSize: initialFiltersProp?.minSize || '',
            maxSize: initialFiltersProp?.maxSize || '',
        });
    }, [initialFiltersProp]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => {
            const updatedFilters = { ...prevFilters, [name]: value };
            // Jika kecamatan berubah, reset kelurahan
            if (name === 'kecamatan') {
                updatedFilters.kelurahan = '';
            }
            return updatedFilters;
        });
    };

    const applyFilters = () => {
        router.get(route('marketplace.index'), filters, {
            preserveScroll: true,
            preserveState: true, // Agar input filter tidak hilang
            replace: true // Agar tidak menambah history browser untuk setiap filter
        });
    };

    const resetFilters = () => {
        const defaultFilters = {
            search: '', kecamatan: '', kelurahan: '', type: '', minPrice: '', maxPrice: '', minSize: '', maxSize: '',
        };
        setFilters(defaultFilters);
        router.get(route('marketplace.index'), defaultFilters, {
            preserveScroll: true,
            preserveState: true,
            replace: true
        });
    };

    const availableKelurahans = filters.kecamatan && kelurahans && kelurahans[filters.kecamatan]
        ? kelurahans[filters.kecamatan]
        : [];
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Cari Lapak
                </h2>
            }
        >
            <Head title="Data Lapak"/>

            <div className="mx-2 space-y-6 py-6">
                <div className="border border-gray-300 rounded p-6 bg-white rounded-xl">
                    {/* <h2 className="text-xl font-semibold mb-4">Search Filters</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <input type="text"
                        placeholder="Cari lapak..."
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })} 
                        className="p-2 rounded bg-white border border-gray-300 placeholder-gray-400" 
                    />
                    <select className="p-2 rounded bg-white border border-gray-300">
                        <option>Depok Dua</option>
                        <option>Depok Timur</option>
                        <option>Margonda</option>
                    </select>
                    <select className="p-2 rounded bg-white border border-gray-300">
                        <option>Ruko</option>
                        <option>Kios</option>
                        <option>Tenda</option>
                    </select>
                    <select className="p-2 rounded bg-white border border-gray-300">
                        <option>Any price</option>
                        <option>Any price</option>
                        <option>Any price</option>
                    </select>
                    </div>
                    <Button onClick={() => {
                        router.get(route('marketplace.index'), filters, {
                            preserveScroll: true,
                            preserveState: true
                        });
                    }}> 
                        Apply Filters 
                    </Button> */}
                    <h2 className="mb-4 text-xl font-semibold">Filter Pencarian</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <input 
                            type="text"
                            name="search"
                            placeholder="Cari nama atau deskripsi"
                            value={filters.search}
                            onChange={handleFilterChange} 
                            className="p-2 text-sm bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500" 
                        />
                        <select 
                            name="kecamatan"
                            value={filters.kecamatan}
                            onChange={handleFilterChange}
                            className="p-2 text-sm bg-white border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Semua Kecamatan</option>
                            {kecamatans && kecamatans.map((kec) => (
                                <option key={kec.value} value={kec.value}>{kec.label}</option>
                            ))}
                        </select>
                        <select 
                            name="kelurahan"
                            value={filters.kelurahan}
                            onChange={handleFilterChange}
                            disabled={!filters.kecamatan || availableKelurahans.length === 0}
                            className="p-2 text-sm bg-white border border-gray-300 rounded-md disabled:bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Semua Kelurahan</option>
                            {availableKelurahans.map((kel) => (
                                <option key={kel.value} value={kel.value}>{kel.label}</option>
                            ))}
                        </select>
                        <select 
                            name="type"
                            value={filters.type}
                            onChange={handleFilterChange}
                            className="p-2 text-sm bg-white border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Semua Tipe</option>
                             {types && types.map((typeOpt) => (
                                <option key={typeOpt.value} value={typeOpt.value}>{typeOpt.label}</option>
                            ))}
                        </select>
                        <input 
                            type="number"
                            name="minPrice"
                            placeholder="Harga Minimal"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                            className="p-2 text-sm bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <input 
                            type="number"
                            name="maxPrice"
                            placeholder="Harga Maksimal"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                            className="p-2 text-sm bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <input 
                            type="number"
                            name="minSize"
                            placeholder="Luas Minimal (m2)"
                            value={filters.minSize}
                            onChange={handleFilterChange}
                            className="p-2 text-sm bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <input 
                            type="number"
                            name="maxSize"
                            placeholder="Luas Maksimal (m2)"
                            value={filters.maxSize}
                            onChange={handleFilterChange}
                            className="p-2 text-sm bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <Button onClick={applyFilters} className="flex items-center"> 
                            Terapkan Filter 
                        </Button>
                        <Button onClick={resetFilters} variant="outline" className="flex items-center">
                            <RotateCcw size={16} className="mr-2" /> Reset Filter
                        </Button>
                    </div>
                </div>            

                <div className="flex flex-row justify-between items-center gap-3">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800"> Pilih lapakmu </h2>
                        { auth.user && (
                            <Link href={route('marketplace.create')}>
                                <Button> 
                                    Tambah Lapak 
                                </Button>
                            </Link>
                        )}
                </div>

                {marketplaces && marketplaces.data && marketplaces.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {marketplaces.data.map((item, index) => (
                            <div key={index} className="flex flex-col content-between bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
                                <div className="flex items-center justify-center rounded-md w-full h-48 bg-gray-200">
                                    {item.photo ? (
                                        <img src={item.photo} alt={item.name} className="rounded-md object-cover w-full h-full" />
                                    ) : (
                                        <div className="flex flex-col rounded-lg items-center text-gray-500">
                                            <ImageOff size={48} strokeWidth={1.5}/>
                                            <span className="mt-2 text-sm">Belum ada foto</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 space-y-2">
                                    {item.status === 'available' ? (
                                        <div className="flex w-fit items-center text-center justify-center px-2 py-1 text-sm font-medium text-green-700 bg-green-100 border border-green-300 rounded-full">
                                            Tersedia
                                        </div>
                                    ) : <div className="flex w-fit items-center text-center justify-center px-2 py-1 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-full">
                                            Tidak Tersedia
                                        </div>
                                    }
                                    <p className="font-medium text-sm truncate">{item.name}</p>
                                    <p className="font-bold text-xl">
                                        {item.price}
                                        {item.price_type === 'monthly' ? '/bulan' : '/tahun'}
                                    </p>
                                    <p className="text-sm text-gray-400 mb-2">{item.location}</p>
                                    <p className="flex text-sm mb-4">
                                        <MapPin className="w-5 h-5 mr-1"/>{item.kelurahan}, {item.kecamatan}
                                    </p>
                                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-4">
                                        <span className="flex"><Factory className="w-5 h-5 mr-1"/>{item.type}</span>
                                        <span className="flex"><Ruler className="w-5 h-5 mr-1"/>{+item.size_length} x {+item.size_width} meter</span>
                                    </div>
                                    <div className="flex flex-col">
                                        {(item.user_id === auth_user_id || auth_user_id === 1) && (
                                            <div className="flex space-x-2 mt-2">
                                                <Button
                                                    variant="destructive"
                                                    className=""
                                                    onClick={() => handleOpenDeleteDialog(item)}
                                                >                                        
                                                    Hapus
                                                </Button>
                                                <Link href={route('marketplace.edit', item.id)} className="flex-1">
                                                    <Button className="w-full text-black bg-white border-2 border-slate-300 hover:text-white hover:bg-blue-800 hover:border-blue-800">
                                                        Ubah
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}
                                        <Link href={route('marketplace.show', item.id)} className="flex-1">
                                            <Button className="mt-2 w-full">
                                                Lihat Detail
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                        {marketplaces.links && <SimplePagination links={marketplaces.links} />}
                    </>
                ) : (
                    <div className="p-10 mt-6 text-center bg-white border border-gray-300 rounded-lg shadow-sm">
                        <Store size={48} className="mx-auto mb-4 text-gray-400" />
                        <p className="text-xl font-semibold text-gray-700">Belum ada lapak.</p>
                        <p className="mt-2 text-sm text-gray-500">
                            Saat ini belum ada data lapak yang dapat ditampilkan.
                        </p>
                    </div>
                )}
            </div>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus lapak <span className="font-semibold">"{marketplaceToDelete?.name}"</span>?
                            Tindakan ini tidak dapat diurungkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Batal</Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={handleConfirmDelete}>
                            Ya, Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    )
}