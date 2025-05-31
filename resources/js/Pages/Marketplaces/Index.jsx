// import Layout from "../Layout/Layout";
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, router } from "@inertiajs/react";
import { Button } from '@/Components/ui/button';
import {
  MapPin,
  Factory,
  Ruler,
  ImageOff
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


export default function Index({ marketplaces, auth_user_id }) {
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
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Cari Lapak
                </h2>
            }
        >
            <div className="mx-2 space-y-6 my-6">
                <div className="border border-gray-300 rounded p-6">
                    <h2 className="text-xl font-semibold mb-4">Search Filters</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <input type="text" placeholder="Search listings..." className="p-2 rounded bg-white border border-gray-300 placeholder-gray-400" />
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
                    <Button> 
                        Apply Filters 
                    </Button>
                </div>            

                <div className="flex flex-row justify-between items-center gap-3">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800"> Pilih lapakmu </h2>
                    <Link href={route('marketplace.create')}>
                        <Button> 
                            Tambah Lapak 
                        </Button>
                    </Link>
                </div>

                {marketplaces && marketplaces.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {marketplaces.map((item, index) => (
                        <div key={index} className="flex flex-col bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
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
                                <p className="font-medium text-md">{item.name}</p>
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
                ) : (
                    <div className="p-6 mt-4 text-center text-black">
                        <p className="text-xl font-semibold">Belum ada lapak.</p>
                        <p className="mt-2 text-sm">Saat ini belum ada lapak yang tersedia untuk ditampilkan.</p>
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