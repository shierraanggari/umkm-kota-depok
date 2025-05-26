import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function CreateCommunity() {
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
                <form className="flex flex-col gap-4">
                <div>
                    <label htmlFor="title" className="block text-md font-medium text-gray-700">
                        Nama Komunitas
                    </label>
                    <input
                    type="text"
                    id="title"
                    name="title"    
                    placeholder='Masukkan nama komunitas, misal "Komunitas UMKM Depok Dua"'
                    className="mt-1 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    />
                </div>
                <div>
                    <label htmlFor="body" className="block text-md font-medium text-gray-700">
                        Deskripsi
                    </label>
                    <textarea
                    id="body"
                    name="body"
                    rows="6"
                    placeholder='Masukkan deskripsi komunitas, misal "Komunitas ini disusun untuk saling berbagi ilmu. Dilarang memberi komentar buruk yang berbau SARA."'
                    className="mt-1 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    required
                    />
                </div>
                <div className="flex justify-end">
                    <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                    >
                    Submit
                    </button>
                </div>
                </form>
            </div>
        </div>
    </AuthenticatedLayout>
  );
}
