import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button"; 
import { useForm, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Edit({ marketplace, types, kelurahans, kecamatans, auth }) { 
    const { data, setData, post, processing, errors, reset } = useForm({ 
        _method: 'PUT', 
        name: marketplace.name || '',
        type: marketplace.type || '',
        description: marketplace.description || '',
        size_length: marketplace.size_length || '',
        size_width: marketplace.size_width || '',
        price: marketplace.price || '',
        price_type: marketplace.price_type || 'monthly',
        kecamatan: marketplace.kecamatan || '',
        kelurahan: marketplace.kelurahan || '',
        phone_number: marketplace.phone_number || '',
        address: marketplace.address || '',
        long: marketplace.long || '',
        lat: marketplace.lat || '',
        status: marketplace.status || 'available',
        photos: [], 
        deleted_photos: [], 
    });

    const [locationError, setLocationError] = useState(null);
    const availableKelurahans = data.kecamatan && kelurahans[data.kecamatan] ? kelurahans[data.kecamatan] : [];
    
    const existingPhotosToShow = marketplace.photos ? marketplace.photos.filter(photo => !data.deleted_photos.includes(photo.id)) : [];
    const totalPhotosCount = existingPhotosToShow.length + data.photos.length;

    const handleKecamatanChange = (e) => {
        setData(prevData => ({ 
            ...prevData,
            kecamatan: e.target.value,
            kelurahan: '', 
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('marketplace.update', marketplace.id), {
            onError: () => {
            },
            onSuccess: () => {
            }
        });
    };

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            setLocationError(null);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setData(prevData => ({
                        ...prevData,
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                    }));
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

    const handleMultipleFiles = (e) => {
        const newFiles = Array.from(e.target.files);
        const validFiles = newFiles.filter(f =>
            ['image/jpeg', 'image/png', 'image/jpg', 'image/heif', 'image/webp'].includes(f.type) 
        );

        if (newFiles.length !== validFiles.length) {
            alert('Beberapa file memiliki format yang tidak didukung. Hanya JPG, JPEG, PNG, HEIF, WEBP yang diizinkan.');
        }

        if (validFiles.length === 0) return;

        const currentExistingPhotosCount = marketplace.photos ? marketplace.photos.filter(p => !data.deleted_photos.includes(p.id)).length : 0;
        const currentNewPhotosCount = data.photos.length;

        if (currentExistingPhotosCount + currentNewPhotosCount + validFiles.length > 5) {
            alert(`Maksimal 5 foto. Anda sudah memiliki ${currentExistingPhotosCount} foto lama dan ${currentNewPhotosCount} foto baru terpilih. Anda hanya bisa menambah ${5 - (currentExistingPhotosCount + currentNewPhotosCount)} foto lagi.`);
            
            e.target.value = null;
            return;
        }
        setData('photos', [...data.photos, ...validFiles]);
        
        e.target.value = null;
    };

    const handleFileRemove = (index) => { 
        setData('photos', data.photos.filter((_, i) => i !== index));
    };

    const handleDeleteExistingPhoto = (mediaId) => { 
        if (data.deleted_photos.includes(mediaId)) {            
            setData('deleted_photos', data.deleted_photos.filter(id => id !== mediaId));
        } else {
            setData('deleted_photos', [...data.deleted_photos, mediaId]);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Lapak: {marketplace.name}
                </h2>
            }
        >
            <Head title="Form Edit Lapak"/>

            <div className="max-w-4xl p-6 mx-auto">
                <div className="p-6 bg-white rounded-lg shadow-xl">
                    <h2 className="mb-1 text-2xl font-bold">Edit Post Lapak Usaha</h2>
                    <p className="mb-6 text-gray-500">Ubah data lapak usaha</p>

                    <form onSubmit={submit} className="space-y-4">
                        {/* Nama Lapak */}
                        <div>
                            <label className="block mb-1 font-medium">Nama Lapak<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Masukkan nama lapak usaha"
                                className="w-full px-3 py-2 text-sm border rounded"
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>

                        {/* Jenis Lapak */}
                        <div>
                            <label className="block mb-1 font-medium">Jenis Lapak<span className="text-red-500">*</span></label>
                            <select
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="w-full px-3 py-2 text-sm border rounded"
                            >
                                <option value="">Pilih jenis lapak</option>
                                {types.map(({ value, label }) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <label className="block mb-1 font-medium">Deskripsi<span className="text-red-500">*</span></label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Tulis deskripsi lengkap mengenai usaha Anda, seperti keunggulan, fasilitas (air, listrik, dsb), cocok untuk apa, kondisi lingkungan, dll"
                                className="w-full min-h-[120px] px-3 py-2 text-sm border rounded"
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                        </div>

                        {/* Ukuran */}
                        <div>
                            <label className="block mb-1 font-medium">Ukuran Lapak<span className="text-red-500">*</span></label>
                            <div className="flex flex-row gap-2">
                                <input
                                    type="number"
                                    step="0.1"
                                    value={data.size_length}
                                    onChange={e => setData('size_length', e.target.value)}
                                    placeholder="Panjang"
                                    className="w-full px-3 py-2 text-sm border rounded"
                                />
                                <span className="self-center text-sm">meter</span>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={data.size_width}
                                    onChange={e => setData('size_width', e.target.value)}
                                    placeholder="Lebar"
                                    className="w-full px-3 py-2 ml-2 text-sm border rounded"
                                />
                                <span className="self-center text-sm">meter</span>
                            </div>
                            {errors.size_length && <p className="text-sm text-red-500">{errors.size_length}</p>}
                            {errors.size_width && <p className="text-sm text-red-500">{errors.size_width}</p>}
                        </div>

                        {/* Harga */}
                        <div>
                            <label className="block mb-1 font-medium">Harga<span className="text-red-500">*</span></label>
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
                            {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                            {errors.price_type && <p className="text-sm text-red-500">{errors.price_type}</p>}
                        </div>

                        {/* Kecamatan dan Kelurahan */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="block mb-1 font-medium">Kecamatan<span className="text-red-500">*</span></label>
                                <select
                                    value={data.kecamatan}
                                    onChange={handleKecamatanChange}
                                    className="w-full px-3 py-2 text-sm border rounded"
                                >
                                    <option value="">Pilih kecamatan</option>
                                    {kecamatans.map(({ value, label }) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                                {errors.kecamatan && <p className="text-sm text-red-500">{errors.kecamatan}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Kelurahan<span className="text-red-500">*</span></label>
                                <select
                                    value={data.kelurahan}
                                    onChange={(e) => setData('kelurahan', e.target.value)}
                                    className="w-full px-3 py-2 text-sm border rounded"
                                    disabled={!data.kecamatan || availableKelurahans.length === 0}
                                >
                                    <option value="">Pilih kelurahan</option>
                                    {availableKelurahans.map(({ value, label }) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                                {errors.kelurahan && <p className="text-sm text-red-500">{errors.kelurahan}</p>}
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
                            <label className="block mb-1 font-medium">Alamat Lengkap</label>
                            <textarea
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                placeholder="Masukkan alamat lengkap lapak"
                                className="w-full px-3 py-2 text-sm border rounded"
                            />
                            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                        </div>

                        {/* Lokasi Peta */}
                        <div>
                            <label className="block mb-1 font-medium">Lokasi di Peta</label>
                            <div className="flex flex-col items-center justify-center p-2 bg-gray-100 border rounded-md">
                                {data.lat && data.long && (
                                    <div className="w-full h-64 mb-2">
                                        <iframe
                                            loading="lazy"
                                            allowFullScreen
                                            className="w-full h-full border-0"
                                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${data.long-0.005},${data.lat-0.005},${data.long+0.005},${data.lat+0.005}&layer=mapnik&marker=${data.lat},${data.long}`}
                                        ></iframe>
                                    </div>
                                )}
                                <div className="my-2 text-center text-gray-500">
                                    Klik tombol untuk ambil lokasi otomatis
                                </div>
                                <button
                                    type="button"
                                    onClick={handleGetLocation}
                                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                                >
                                    Masukkan Lokasi Otomatis
                                </button>
                                {locationError && <p className="mt-2 text-sm text-red-500">{locationError}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Latitude</label>
                                    <input
                                        type="text"
                                        value={data.lat}
                                        onChange={(e) => setData('lat', e.target.value)}
                                        placeholder="Latitude"
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                    {errors.lat && <p className="text-sm text-red-500">{errors.lat}</p>}
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Longitude</label>
                                    <input
                                        type="text"
                                        value={data.long}
                                        onChange={(e) => setData('long', e.target.value)}
                                        placeholder="Longitude"
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                    {errors.long && <p className="text-sm text-red-500">{errors.long}</p>}
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
                            <label className="block mb-1 font-medium">Foto Lapak (opsional, maksimal 5 foto, ukuran maksimal 2 MB untuk setiap foto)</label>
                            
                            {/* Foto Lama */}
                            {marketplace.photos && marketplace.photos.length > 0 && (
                                <div className="mb-4">
                                    <p className="mb-1 text-sm font-semibold">Foto saat ini:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {marketplace.photos.map((photo) => (
                                            <div key={photo.id} className="relative">
                                                <img
                                                    src={photo.url}
                                                    alt={`Foto lama ${photo.id}`}
                                                    className={`w-24 h-24 object-cover rounded ${data.deleted_photos.includes(photo.id) ? 'opacity-50 grayscale' : ''}`}
                                                />
                                                <Button
                                                    type="button"
                                                    onClick={() => handleDeleteExistingPhoto(photo.id)}
                                                    className={`absolute top-1 right-1 text-white ${data.deleted_photos.includes(photo.id) ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-red-500 hover:bg-red-600'} rounded-full w-6 h-6 flex items-center justify-center text-xs p-0`}
                                                    title={data.deleted_photos.includes(photo.id) ? "Batal Hapus" : "Hapus Foto Ini"}
                                                >
                                                    {data.deleted_photos.includes(photo.id) ? "↩" : "X"}
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Input untuk Foto Baru */}
                            <div className="mb-2">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleMultipleFiles}
                                    accept="image/jpeg,image/png,image/jpg,image/heif,image/webp"
                                    className="w-full p-6 text-sm border-2 border-dashed rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    disabled={totalPhotosCount >= 5}
                                />
                                {totalPhotosCount >= 5 && <p className="mt-1 text-sm text-yellow-600">Anda sudah mencapai batas maksimal 5 foto.</p>}
                                {errors.photos && <span className="text-red-500">{errors.photos}</span>}
                                {typeof errors === 'object' && Object.keys(errors).some(key => key.startsWith('photos.')) && (
                                    <span className="text-sm text-red-500">Terdapat masalah unggah foto. Pastikan format file adalah JPEG, JPG, PNG, HEIF, atau WEBP, serta ukuran file di bawah 2 MB.</span>
                                )}

                            </div>
                            
                            {/* Preview Foto Baru */}
                            {data.photos.length > 0 && (
                                <div className="mt-2 text-sm">
                                    <p className="mb-1 font-semibold">Foto baru yang akan diupload: ({data.photos.length})</p>
                                    <div className="flex flex-wrap gap-2">
                                        {data.photos.map((file, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`Preview ${file.name}`}
                                                    className="object-cover rounded w-28 h-28"
                                                    onLoad={() => URL.revokeObjectURL(file.previewUrl)}
                                                />
                                                <Button
                                                    type="button"
                                                    onClick={() => handleFileRemove(index)}
                                                    className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 p-0 text-xs text-white bg-red-500 rounded-full hover:bg-red-600"
                                                >
                                                    X
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                             <p className="mt-2 text-sm text-gray-600">Total foto yang akan disimpan: {totalPhotosCount} / 5</p>
                        </div>

                        {/* Submit */}
                        <div>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                            {totalPhotosCount > 5 && <p className="mt-1 text-sm text-red-500">Jumlah foto melebihi batas maksimal 5.</p>}
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}