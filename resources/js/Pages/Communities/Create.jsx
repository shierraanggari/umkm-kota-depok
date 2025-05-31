import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        creator_id: '',
        description: '',
    })

    const submit = (e) => {
        e.preventDefault();

        post(route('community.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tambah Komunitas
                </h2>
            }
        >
            <div className="p-4">
                <div className="mx-auto p-6 bg-white rounded-xl shadow border">
                    <h1 className="text-2xl font-semibold mb-4">Masukkan Data Komunitas</h1>
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="title" className="block text-md font-medium text-gray-700">
                                Nama Komunitas
                            </label>
                            <input
                                type="text" 
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}    
                                placeholder='Masukkan nama komunitas, misal "Komunitas UMKM Depok Dua"'
                                className="mt-1 text-sm w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="body" className="block text-md font-medium text-gray-700">
                                Deskripsi
                            </label>
                            <textarea
                                type="text" 
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows="6"
                                placeholder='Masukkan deskripsi komunitas, misal "Komunitas ini disusun untuk saling berbagi ilmu. Dilarang memberi komentar buruk yang berbau SARA."'
                                className="mt-1 text-sm w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                required
                            />
                            {errors.description && (
                                <p className="mt-1 text-xs text-red-500">{errors.description}</p>
                            )}
                        </div>
                        <div className="flex items-center justify-end space-x-4 pt-2">
                            <Link href={route('community.index')}>
                                <Button type="button" variant="outline">
                                    Batal
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Memproses...' : 'Buat Komunitas'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
