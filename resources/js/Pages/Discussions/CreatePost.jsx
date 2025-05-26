import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function CreatePost() {
  return (
    <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Komunitas Pertanian Depok Dua (ambil dari nama komunitas)
            </h2>
        }
    >
        <div className="p-4">
            <div className="mx-auto p-6 bg-white rounded-xl shadow border">
                <h1 className="text-2xl font-semibold mb-4">Buat Postingan</h1>
                <form className="flex flex-col gap-4">
                <div>
                    <label htmlFor="title" className="block text-md font-medium text-gray-700">
                        Topik
                    </label>
                    <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder='Berikan judul postinganmu, misal "Ada yang punya pengalaman berjualan di pasar malam?"'
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    />
                </div>
                <div>
                    <label htmlFor="body" className="block text-md font-medium text-gray-700">
                        Konten
                    </label>
                    <textarea
                    id="body"
                    name="body"
                    rows="6"
                    placeholder='Tulis konten postinganmu, misal "Saya berniat berjualan di pasar yang ada setiap malam Minggu di daerah XXX. Apa aja ya yang biasanya diperlukan untuk persiapan berjualan di pasar malam? Terima kasih."'
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    required
                    />
                </div>
                <div className="flex justify-end">
                    <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                    >
                    Kirim
                    </button>
                </div>
                </form>
            </div>
        </div>
    </AuthenticatedLayout>
  );
}
