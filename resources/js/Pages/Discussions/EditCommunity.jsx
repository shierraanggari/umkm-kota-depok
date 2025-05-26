import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function EditCommunity() {
    return(
        <AuthenticatedLayout>
            <div className="p-4 space-y-2">
                <div className="mx-auto p-6 bg-white rounded-xl shadow border">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Kelola Komunitas
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Ubah detail komunitas dan kelola anggota komunitas.
                    </p>

                    <div className="mt-4">
                        <label htmlFor="title" className="block text-md font-medium text-gray-700">
                            Nama Komunitas
                        </label>
                        <input
                        type="text"
                        id="title"
                        name="title"
                        className="mt-1 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="body" className="block text-md font-medium text-gray-700">
                            Deskripsi
                        </label>
                        <textarea
                        id="body"
                        name="body"
                        rows="6"
                        required
                        />
                    </div>
                </div>

                <div className="mx-auto p-6 bg-white rounded-xl shadow border">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Anggota Komunitas
                    </h2>
                </div>
            </div>
            
        </AuthenticatedLayout>
    )
}
