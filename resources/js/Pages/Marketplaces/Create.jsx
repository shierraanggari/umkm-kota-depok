export default function CreatePostPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg p-6 border border-black">
            <h2 className="text-2xl font-bold mb-1">Buat Post Lapak Usaha</h2>
            <p className="text-gray-500 mb-6">Isi informasi lengkap tentang lapak usaha yang ingin kamu posting</p>

            <div className="space-y-4">
            {/* Nama Lapak */}
            <div>
                <label className="block font-medium mb-1">Nama Lapak</label>
                <input type="text" placeholder="Masukkan nama lapak usaha" className="w-full border rounded px-3 py-2" />
            </div>

            {/* Jenis Lapak */}
            <div>
                <label className="block font-medium mb-1">Jenis Lapak</label>
                <select className="w-full border rounded px-3 py-2">
                <option value="">Pilih jenis lapak</option>
                <option value="kios">Kios</option>
                <option value="ruko">Ruko</option>
                <option value="toko">Toko</option>
                <option value="stan">Stan Pasar</option>
                <option value="booth">Booth</option>
                <option value="other">Lainnya</option>
                </select>
            </div>

            {/* Deskripsi */}
            <div>
                <label className="block font-medium mb-1">Deskripsi</label>
                <textarea placeholder="Deskripsikan lapak usaha kamu secara detail" className="w-full border rounded px-3 py-2 min-h-[120px]" />
            </div>

            {/* Ukuran */}
            <div>
                <label className="block font-medium mb-1">Ukuran Lapak</label>
                <input type="text" placeholder="Contoh: 3x4 meter" className="w-full border rounded px-3 py-2" />
            </div>

            {/* Harga */}
            <div>
                <label className="block font-medium mb-1">Harga</label>
                <div className="flex gap-4">
                <input type="number" placeholder="Masukkan harga" className="w-full border rounded px-3 py-2" />
                <div className="flex items-center gap-2">
                    <input type="radio" name="priceType" value="month" defaultChecked />
                    <label>Per Bulan</label>
                </div>
                <div className="flex items-center gap-2">
                    <input type="radio" name="priceType" value="year" />
                    <label>Per Tahun</label>
                </div>
                </div>
            </div>

            {/* Kecamatan dan Kelurahan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <label className="block font-medium mb-1">Kecamatan</label>
                <input type="text" placeholder="Masukkan kecamatan" className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                <label className="block font-medium mb-1">Kelurahan</label>
                <input type="text" placeholder="Masukkan kelurahan" className="w-full border rounded px-3 py-2" />
                </div>
            </div>

            {/* Alamat */}
            <div>
                <label className="block font-medium mb-1">Alamat Lengkap</label>
                <textarea placeholder="Masukkan alamat lengkap lapak" className="w-full border rounded px-3 py-2" />
            </div>

            {/* Lokasi Peta */}
            <div>
                <label className="block font-medium mb-1">Lokasi di Peta</label>
                <div className="border rounded-md p-4 bg-gray-100 h-[200px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                    <div className="text-2xl mb-1">📍</div>
                    Klik untuk memilih lokasi di peta
                </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                    <label className="block text-sm font-medium mb-1">Latitude</label>
                    <input type="text" placeholder="Latitude" className="w-full border rounded px-3 py-2" readOnly />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Longitude</label>
                    <input type="text" placeholder="Longitude" className="w-full border rounded px-3 py-2" readOnly />
                </div>
                </div>
            </div>

            {/* Upload Foto */}
            <div>
                <label className="block font-medium mb-1">Foto Lapak</label>
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                <p className="text-gray-500 mb-2">Drag & drop foto lapak atau</p>
                <button className="border rounded px-4 py-2 text-sm">Pilih File</button>
                </div>
            </div>

            {/* Submit */}
            <div>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Buat Post Lapak
                </button>
            </div>
            </div>
        </div>
    </div>
  )
}
