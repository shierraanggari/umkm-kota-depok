import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router, usePage, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Save,
    Users,
    UserX,
    UserCheck,
    ShieldAlert,
    ArrowLeft
 } from "lucide-react";

const SimplePagination = ({ links, pageName = 'page' }) => {
    if (!links || links.length <= 3) return null;
    return (
        <nav className="flex items-center justify-center mt-6 space-x-1">
            {links.map((link, index) => {
                // Modifikasi URL untuk menyertakan parameter halaman yang benar
                let modifiedUrl = link.url;
                if (modifiedUrl && pageName !== 'page') {
                    modifiedUrl = modifiedUrl.replace('?page=', `?${pageName}=`).replace('&page=', `&${pageName}=`);
                }
                return (
                    <Link
                        key={index}
                        href={modifiedUrl || '#'}
                        className={`px-3 py-2 text-sm rounded-md 
                            ${link.active ? 'bg-blue-600 text-white font-semibold' : 'text-gray-700 hover:bg-gray-200'}
                            ${!link.url ? 'text-gray-400 cursor-not-allowed' : ''}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        as={!link.url ? 'span' : 'a'}
                        preserveScroll // Agar tidak scroll ke atas saat ganti halaman paginasi
                        preserveState // Agar state form edit detail komunitas tidak hilang
                    />
                );
            })}
        </nav>
    );
};

export default function Edit({ community, members, banned_users, auth_user_id }) {
    const { props: pageProps } = usePage();
    
    const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
        name: community.name || '',
        description: community.description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('community.update', community.id), {
            preserveScroll: true,
        });
    };

    const handleBanUser = (userIdToBan) => {
        if (confirm('Apakah Anda yakin ingin mem-ban pengguna ini dari komunitas? Mereka akan dikeluarkan dari anggota.')) {
            router.post(route('community.users.ban', { community: community.id, userToBan: userIdToBan }), {}, {
                preserveScroll: true,
            });
        }
    };

    const handleUnbanUser = (userIdToUnban) => {
        if (confirm('Apakah Anda yakin ingin membatalkan ban untuk pengguna ini?')) {
            router.post(route('community.users.unban', { community: community.id, userToUnban: userIdToUnban }), {}, {
                preserveScroll: true,
            });
        }
    };

    const handleDeleteCommunity = () => {
        if (confirm(`Apakah Anda yakin ingin menghapus komunitas "${community.name}" secara permanen? Semua postingan dan data terkait akan hilang.`)) {
            router.delete(route('community.destroy', community.id));
        }
    };

    return(
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Kelola Komunitas: {community.name}
                </h2>
            }
        >
            <div className="p-4 space-y-2">
                <Link
                    href={route('community.show', community.id)}
                    className="flex items-center mb-6 text-sm text-gray-500 transition-colors hover:text-blue-600"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Kembali ke Komunitas
                </Link>

                <div className="mx-auto p-6 bg-white rounded-xl shadow border">

                    {/* Detail Komunitas */}
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">Detail Komunitas</h2>
                    <p className="mt-1 text-sm text-gray-600 mb-6">
                        Ubah nama dan deskripsi komunitas Anda.
                    </p>
                    {recentlySuccessful && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">Perubahan berhasil disimpan!</div>}
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Komunitas</label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`mt-1 w-full border rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi</label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows="4"
                                className={`mt-1 w-full border rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-y ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing} className="flex items-center">
                                <Save className="w-4 h-4 mr-2" />
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Anggota Komunitas */}
                <div className="p-6 bg-white rounded-xl shadow border">
                    <h2 className="text-xl font-semibold text-gray-900 mb-1 flex items-center">
                        <Users className="w-5 h-5 mr-2 text-gray-700" /> Anggota Komunitas ({members.total})
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 mb-6">
                        Lihat dan kelola anggota komunitas Anda. Anda tidak dapat mem-ban diri sendiri atau pembuat komunitas.
                    </p>
                    {members.data.length > 0 ? (
                        <div className="space-y-3">
                            {members.data.map((member) => (
                                <div key={member.id} className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                                    <div>
                                        <p className="font-medium text-gray-800">{member.name}</p>
                                        <p className="text-xs text-gray-500">{member.email}</p>
                                    </div>
                                    
                                    {auth_user_id !== member.id && community.creator_id !== member.id && (
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleBanUser(member.id)}
                                            className="flex items-center text-xs"
                                        >
                                            <UserX className="w-3.5 h-3.5 mr-1.5" />
                                            Ban
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <SimplePagination links={members.links} pageName="members_page" />
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">Tidak ada anggota (selain pembuat) untuk dikelola saat ini.</p>
                    )}
                </div>

                {/* Bagian Kelola Pengguna yang Diban */}
                <div className="p-6 bg-white rounded-xl shadow border">
                    <h2 className="text-xl font-semibold text-gray-900 mb-1 flex items-center">
                        <UserX className="w-5 h-5 mr-2 text-gray-700" /> Pengguna Diban ({banned_users.total})
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 mb-6">
                        Lihat dan kelola pengguna yang telah diban dari komunitas ini.
                    </p>
                    {banned_users.data.length > 0 ? (
                        <div className="space-y-3">
                            {banned_users.data.map((banned_user) => (
                                <div key={banned_user.id} className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                                    <div>
                                        <p className="font-medium text-gray-800">{banned_user.name}</p>
                                        <p className="text-xs text-gray-500">{banned_user.email}</p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleUnbanUser(banned_user.id)}
                                        className="flex items-center text-xs border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800"
                                    >
                                        <UserCheck className="w-3.5 h-3.5 mr-1.5" />
                                        Unban
                                    </Button>
                                </div>
                            ))}
                            <SimplePagination links={banned_users.links} pageName="banned_page" />
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">Tidak ada pengguna yang diban saat ini.</p>
                    )}
                </div>

                {/* Bagian Hapus Komunitas */}
                <div className="p-6 mt-8 bg-red-50 border border-red-300 rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold text-red-700 mb-1 flex items-center">
                        <ShieldAlert className="w-5 h-5 mr-2" /> Hapus Komunitas
                    </h2>
                    <p className="mt-1 text-sm text-red-600 mb-4">
                        Menghapus komunitas akan menghapus semua postingan dan data terkait secara permanen. Tindakan ini tidak dapat diurungkan.
                    </p>
                    <Button
                        variant="destructive"
                        onClick={handleDeleteCommunity}
                        className="w-full md:w-auto"
                    >
                        Hapus Komunitas Ini Secara Permanen
                    </Button>
                </div>
            </div>
            
        </AuthenticatedLayout>
    )
}
