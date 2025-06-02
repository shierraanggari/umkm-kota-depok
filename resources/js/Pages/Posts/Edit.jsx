import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm, Head } from "@inertiajs/react";
import { ArrowLeft,
    Save
 } from "lucide-react";
import { Button } from "@/Components/ui/button";

export default function Edit({ post, community }) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        title: post.title || '',
        description: post.description || '', 
        community_id: community.id || '',
    });

    const submit = (e) => {
        e.preventDefault();
        
        patch(route('post.update', post.id), {
            onSuccess: () => reset(), 
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Komunitas: {community.name}
                </h2>
            }
        >
            <Head title="Form Edit Postingan"/>

            <div className="p-4">
                {/* Tombol Back */}
                <Link
                    href={route('community.show', community.id)}
                    className="flex items-center mb-6 text-sm text-gray-500 transition-colors hover:text-blue-600"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Kembali ke Komunitas
                </Link>

                <div className="mx-auto p-6 bg-white rounded-xl shadow border">
                    <h1 className="mb-2 text-2xl font-bold text-gray-900">Tulis Postingan Anda</h1>
                    <p className="mb-6 text-sm text-gray-600">
                        Bagikan ide, pertanyaan, atau informasi Anda dengan anggota komunitas <span className="font-semibold">{community.name}</span>.
                    </p>

                    {/* Form */}
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        {/* Nama */}
                        <div>
                            <label htmlFor="title" className="block text-md font-medium text-gray-700">
                                Topik<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder='Berikan judul postinganmu, misal "Ada yang punya pengalaman berjualan di pasar malam?"'
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                        </div>

                        {/* Deskripsi/Konten */}
                        <div>
                            <label htmlFor="body" className="block text-md font-medium text-gray-700">
                                Konten<span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows="8"
                                placeholder='Tulis konten postinganmu, misal "Saya berniat berjualan di pasar yang ada setiap malam Minggu di daerah XXX. Apa aja ya yang biasanya diperlukan untuk persiapan berjualan di pasar malam? Terima kasih."'
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                required
                            />
                            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                        </div>

                        <div className="flex items-center justify-end space-x-4 pt-2">
                            <Link href={route('community.show', community.id)}>
                                <Button type="button" variant="outline">
                                    Batal
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700 flex items-center">
                                <Save size={16} className="mr-2" />
                                {processing ? 'Mengirim...' : 'Simpan'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
