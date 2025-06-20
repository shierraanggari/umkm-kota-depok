import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { useForm, Head } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ types, kelurahans, kecamatans }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: '',
        description: '',
        size_length: '',
        size_width: '',
        price: '',
        price_type: 'monthly',
        kecamatan: '',
        kelurahan: '',
        phone_number: '',
        address: '',
        long: '',
        lat: '',
        status: 'available',
        photos: [],
    })

    const submit = (e) => {
        e.preventDefault();

        post(route('marketplace.store'), {
            forceFormData: true,
        });
    };

    const handleKecamatanChange = (e) => {
        setData({
            ...data,
            kecamatan: e.target.value,
            kelurahan: '',
        });
    };

    const [locationError, setLocationError] = useState(null);

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            setLocationError(null);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setData({
                        ...data,
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                    });
                },
                (error) => {
                    console.warn('Geolocation error:', error.message);
                    setLocationError('Gagal mendapatkan lokasi. Izinkan akses lokasi atau masukkan manual.');
                },
                { enableHighAccuracy: true, timeout: 10000 }
            );
        } else {
            setLocationError('Geolocation tidak didukung browser ini.');
        }
    };

    const availableKelurahans = kelurahans[data.kecamatan] || [];

    const handleMultipleFiles = (e) => {
        const newFiles = Array.from(e.target.files);
        const validFiles = newFiles.filter(f => 
            ['image/jpeg', 'image/png', 'image/jpg', 'image/heif', 'image/webp'].includes(f.type)
        );
        if (newFiles.length !== validFiles.length) {
            alert('Masukkan file dengan format JPG, JPEG, PNG, HEIF, atau WEBP.');
        }
        const totalFiles = data.photos.length + validFiles.length;
        if (totalFiles > 5) {
            alert('Maksimal upload 5 foto.');
            return;
        }
        setData('photos', [...data.photos, ...validFiles]);
    };

    const handleFileRemove = (index) => {
        setData('photos', data.photos.filter((_, i) => i !== index));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tambah Lapak
                </h2>
            }
        >
            <Head title="Form Tambah Lapak"/>

            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white shadow-md rounded-lg p-6 shadow-xl">
                    {/* border border-black"> */}
                    <h2 className="text-2xl font-bold mb-1">Buat Post Lapak Usaha</h2>
                    <p className="text-gray-500 mb-6">Isi informasi lengkap tentang lapak usaha yang ingin kamu posting</p>

                    <form onSubmit={submit} className="space-y-4" encType="multipart/form-data">
                        {/* Nama Lapak */}
                        <div>
                            <label className="block font-medium mb-1">Nama Lapak<span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Masukkan nama lapak usaha" 
                                className="w-full border rounded px-3 py-2" 
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        {/* Jenis Lapak */}
                        <div>
                            <label className="block font-medium mb-1">Jenis Lapak<span className="text-red-500">*</span></label>
                            <select 
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="w-full text-sm border rounded px-3 py-2"
                                required
                            >
                                <option value="">Pilih jenis lapak</option>
                                {types.map(({ value, label }) => (
                                    <option
                                        key={value}
                                        value={value}
                                    >
                                        {label}
                                    </option>
                                ))}
                            </select>
                            {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <label className="block font-medium mb-1">Deskripsi<span className="text-red-500">*</span></label>
                            <textarea 
                                type="text" 
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Tulis deskripsi lengkap mengenai usaha Anda, seperti keunggulan, fasilitas (air, listrik, dsb), cocok untuk apa, kondisi lingkungan, dll" 
                                className="w-full text-sm border rounded px-3 py-2 min-h-[120px]"
                                required
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                        </div>

                        {/* Ukuran */}
                        <div>
                            <label className="block font-medium mb-1">Ukuran Lapak<span className="text-red-500">*</span></label>
                            <div className="flex flex-row gap-2">
                                <input 
                                    type="number"
                                    step="0.1"
                                    value={data.size_length}
                                    onChange={e => setData('size_length', e.target.value)}
                                    placeholder="Panjang"
                                    className="w-full border rounded px-3 py-2 text-sm"
                                    min="0"
                                    required
                                />
                                <span className="text-sm self-center">
                                    meter
                                </span>
                                <input 
                                    type="number"
                                    step="0.1"
                                    value={data.size_width}
                                    onChange={e => setData('size_width', e.target.value)}
                                    placeholder="Lebar"
                                    className="w-full border rounded px-3 py-2 text-sm ml-2"
                                    min="0"
                                    required
                                />
                                <span className="text-sm self-center">
                                    meter
                                </span>
                            </div>
                        </div>

                        {/* Harga */}
                        <div>
                            <label className="block font-medium mb-1">Harga<span className="text-red-500">*</span></label>
                            <div className="flex flex-col md:flex-row gap-4">
                                <input 
                                    type="number"
                                    value={data.price}
                                    onChange={e => setData('price', e.target.value)}
                                    placeholder="Masukkan harga"
                                    className="flex w-full border rounded px-3 text-sm"
                                    min="0"
                                    required
                                />
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="radio" 
                                        name="priceType" 
                                        value="monthly"
                                        checked={data.price_type === 'monthly'}
                                        onChange={(e) => setData('price_type', e.target.value)}
                                    />
                                    <label>Per Bulan</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="radio" 
                                        name="priceType" 
                                        value="yearly"
                                        checked={data.price_type === 'yearly'}
                                        onChange={(e) => setData('price_type', e.target.value)}
                                    />
                                    <label>Per Tahun</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="radio" 
                                        name="priceType" 
                                        value="other"
                                        checked={data.price_type === 'other'}
                                        onChange={(e) => setData('price_type', e.target.value)}
                                    />
                                    <label>Lainnya</label>
                                </div>
                            </div>
                        </div>

                        {/* Kecamatan dan Kelurahan */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium mb-1">Kecamatan<span className="text-red-500">*</span></label>
                                <select 
                                    value={data.kecamatan}
                                    // onChange={(e) => setData('kecamatan', e.target.value)}
                                    onChange={handleKecamatanChange}
                                    className="w-full text-sm border rounded px-3 py-2"
                                    required
                                >
                                    <option value="">Pilih kecamatan</option>
                                    {kecamatans.map(({ value, label }) => (
                                        <option
                                            key={value}
                                            value={value}
                                        >
                                            {label}
                                        </option>
                                    ))}
                                </select>
                                {errors.kecamatan && <p className="text-red-500 text-sm">{errors.kecamatan}</p>}
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Kelurahan<span className="text-red-500">*</span></label>
                                <select 
                                    value={data.kelurahan}
                                    onChange={(e) => setData('kelurahan', e.target.value)}
                                    className="w-full text-sm border rounded px-3 py-2"
                                    disabled={!data.kecamatan}
                                    required
                                >
                                    <option value="">Pilih kelurahan</option>
                                    {availableKelurahans.map(({ value, label }) => (
                                        <option
                                            key={value}
                                            value={value}
                                        >
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Nomor Telepon */}
                        <div>
                            <label className="block font-medium mb-1">Nomor Telepon<span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                value={data.phone_number}
                                onChange={(e) => setData('phone_number', e.target.value)}
                                placeholder="Masukkan nomor telepon" 
                                className="w-full border rounded px-3 py-2" 
                                required
                            />
                            {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
                        </div>

                        {/* Alamat */}
                        <div>
                            <label className="block font-medium mb-1">Alamat Lengkap</label>
                            <textarea 
                                type="text" 
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                placeholder="Masukkan alamat lengkap lapak" 
                                className="w-full text-sm border rounded px-3 py-2" 
                            />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                        </div>

                        {/* Lokasi Peta */}
                        <div>
                            <label className="block font-medium mb-1">Lokasi di Peta</label>
                            <div className="border rounded-md p-2 bg-gray-100 flex flex-col items-center justify-center">
                                {data.lat && data.long && (
                                <iframe
                                    loading="lazy"
                                    allowFullScreen
                                    className="flex w-full h-full"
                                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${data.long},${data.lat},${data.long},${data.lat}&layer=mapnik&marker=${data.lat},${data.long}`}
                                ></iframe>
                                )}
                                <div className="text-center text-gray-500 my-2">
                                    Klik tombol untuk ambil lokasi otomatis
                                </div>
                                <button
                                    type="button"
                                    onClick={handleGetLocation}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm"
                                >
                                    Masukkan Lokasi
                                </button>
                                {locationError && <p className="text-red-500 text-sm mt-2">{locationError}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Latitude</label>
                                    <input 
                                        type="text" 
                                        value={data.lat}
                                        onChange={(e) => setData('lat', e.target.value)}
                                        placeholder="Latitude" 
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.lat && <p className="text-red-500 text-sm">{errors.lat}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Longitude</label>
                                    <input 
                                        type="text" 
                                        value={data.long}
                                        onChange={(e) => setData('long', e.target.value)}
                                        placeholder="Longitude" 
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.long && <p className="text-red-500 text-sm">{errors.long}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block font-medium mb-1">Status<span className="text-red-500">*</span></label>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="radio" 
                                        name="status" 
                                        value="available"
                                        checked={data.status === 'available'}
                                        onChange={(e) => setData('status', e.target.value)}
                                    />
                                    <label>Tersedia</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="radio" 
                                        name="status" 
                                        value="unavailable"
                                        checked={data.status === 'unavailable'}
                                        onChange={(e) => setData('status', e.target.value)}
                                    />
                                    <label>Tidak Tersedia</label>
                                </div>
                            </div>
                        </div>

                        {/* Upload Foto */}
                        <div>
                            <label htmlFor="photos" className="block mb-1 font-medium">Foto Lapak (opsional, maksimal 5 foto, ukuran maksimal 2 MB untuk setiap foto)</label>
                            <input
                                id="photos"
                                type="file"
                                multiple
                                onChange={handleMultipleFiles}
                                accept="image/jpeg,image/png,image/jpg,image/heif,image/webp"
                                className="w-full p-6 text-sm border-2 border-dashed rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
                                disabled={data.photos.length >= 5}
                            />
                            {data.photos.length >= 5 && (
                                <p className="mt-1 text-sm text-yellow-600">Anda sudah mencapai batas maksimal 5 foto.</p>
                            )}
                            {errors.photos && <span className="text-red-500">{errors.photos}</span>}
                            {typeof errors === 'object' && Object.keys(errors).some(key => key.startsWith('photos.')) && (
                                <span className="text-sm text-red-500">Terdapat masalah unggah foto. Pastikan format file adalah JPEG, JPG, PNG, HEIF, atau WEBP, serta ukuran file di bawah 2 MB.</span>
                            )}
                            
                            {data.photos.length > 0 && (
                                <div className="mt-4">
                                    <p className="mb-2 text-sm font-semibold">Preview foto yang dipilih ({data.photos.length}/5):</p>
                                    <div className="flex flex-wrap gap-3">
                                        {data.photos.map((file, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`Preview ${file.name}`}
                                                    className="object-cover rounded-md w-28 h-28"
                                                    onLoad={() => URL.revokeObjectURL(file.previewUrl)}
                                                />
                                                <Button
                                                    type="button"
                                                    onClick={() => handleFileRemove(index)}
                                                    variant="destructive"
                                                    className="absolute top-1 right-1 flex items-center justify-center w-6 h-6 p-0 text-xs text-white bg-red-500 rounded-full opacity-75 group-hover:opacity-100 hover:bg-red-700"
                                                    title="Hapus foto ini"
                                                >
                                                    X
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit */}
                        <div>
                            <Button 
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                            {processing ? 'Menyimpan...' : 'Buat Post Lapak'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
