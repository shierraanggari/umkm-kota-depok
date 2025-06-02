// File: resources/js/Pages/User/MyMarketplaces.jsx
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, router, Head, usePage } from "@inertiajs/react"; // Tambahkan Head dan usePage
import { Button } from '@/Components/ui/button';
import {
    MapPin,
    Factory,
    Ruler,
    ImageOff,
    Edit3,   
    Trash2,  
    PlusCircle,
    Eye
} from 'lucide-react';
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
                />
            ))}
        </nav>
    );
};

// Komponen MyMarketplaces
export default function MyMarketplaces({ auth, marketplaces }) { // Menerima auth dan marketplaces
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [marketplaceToDelete, setMarketplaceToDelete] = useState(null);

    // auth_user_id bisa diambil dari auth.user.id jika auth prop ada
    const auth_user_id = auth.user ? auth.user.id : null;

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
            user={auth.user} // Menggunakan auth.user dari props
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Lapak Saya
                </h2>
            }
        >
            <Head title="Lapak Saya" />

            <div className="mx-2 my-6 space-y-6">
                {/* Bagian Filter tidak relevan di sini, bisa dihilangkan atau disederhanakan jika perlu */}
                {/* Saya akan hilangkan bagian filter untuk halaman "Lapak Saya" */}

                <div className="flex flex-row items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800"> Daftar Lapak Milik Anda </h2>
                    <Link href={route('marketplace.create')}>
                        <Button className="flex items-center"> {/* Menggunakan Button dari ui */}
                            <PlusCircle size={18} className="mr-2" />
                            Tambah Lapak 
                        </Button>
                    </Link>
                </div>

                {/* Menggunakan marketplaces.data karena ini adalah objek paginasi */}
                {marketplaces && marketplaces.data && marketplaces.data.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {marketplaces.data.map((item) => ( // Menggunakan item.id sebagai key
                            <div key={item.id} className="flex flex-col overflow-hidden bg-white border border-gray-300 rounded-lg shadow-sm">
                                <div className="flex items-center justify-center w-full h-48 bg-gray-200 rounded-t-lg"> {/* rounded-t-lg jika gambar di atas */}
                                    {/* Menggunakan item.photo_url sesuai contoh controller saya sebelumnya atau item.photo jika itu nama propnya */}
                                    {item.photo_url ? ( 
                                        <img src={item.photo_url} alt={item.name} className="object-cover w-full h-full" />
                                    ) : (
                                        <div className="flex flex-col items-center text-gray-500">
                                            <ImageOff size={48} strokeWidth={1.5}/>
                                            <span className="mt-2 text-sm">Belum ada foto</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 space-y-2"> {/* Struktur dari Index.jsx Anda */}
                                    <p className="text-lg font-semibold text-gray-900 truncate">{item.name}</p> {/* Style disamakan */}
                                    <p className="text-xl font-bold"> {/* Style disamakan */}
                                        {item.price}
                                        <span className="text-sm font-normal text-gray-500">
                                            {item.price_type === 'monthly' ? '/bulan' : '/tahun'}
                                        </span>
                                    </p>
                                    {/* Jika item.location ada, atau ganti dengan item.address */}
                                    {/* <p className="text-sm text-gray-400 mb-2">{item.address || 'Alamat tidak tersedia'}</p> */}
                                    <p className="flex items-center text-sm text-gray-600"> {/* Style disamakan */}
                                        <MapPin className="w-4 h-4 mr-1.5 text-gray-500"/>{item.kelurahan_label || item.kelurahan}, {item.kecamatan_label || item.kecamatan}
                                    </p>
                                    <div className="flex flex-wrap justify-between pt-1 text-xs text-gray-500"> {/* Style disamakan */}
                                        <span className="flex items-center mb-1 mr-2"><Factory className="w-4 h-4 mr-1 text-gray-500"/>{item.type_label || item.type}</span>
                                        <span className="flex items-center mb-1"><Ruler className="w-4 h-4 mr-1 text-gray-500"/>{item.size_length && item.size_width ? `${+item.size_length} x ${+item.size_width} m` : 'N/A'}</span>
                                    </div>
                                    <div className="flex flex-col mt-auto space-y-2">
                                        {(item.user_id === auth_user_id || auth_user_id === 1) && (
                                            <div className="flex space-x-2">
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
                    <div className="p-6 mt-4 text-center text-gray-600 bg-white border border-gray-300 rounded-lg shadow"> {/* Style disamakan */}
                        <p className="text-xl font-semibold">Anda belum memiliki lapak.</p>
                        <p className="mt-2 text-sm">Silakan tambahkan lapak baru untuk ditampilkan di sini.</p>
                        <Link href={route('marketplace.create')} className="mt-4 inline-block">
                            <Button>
                                <PlusCircle size={18} className="mr-2" />
                                Tambah Lapak Baru
                            </Button>
                        </Link>
                    </div>
                )}
                {/* Paginasi jika ada data */}
                {marketplaces && marketplaces.data && marketplaces.data.length > 0 && marketplaces.links && (
                    <SimplePagination links={marketplaces.links} />
                )}
            </div>

            {/* Dialog Konfirmasi Hapus */}
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