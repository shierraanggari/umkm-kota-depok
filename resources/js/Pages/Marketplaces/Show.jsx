import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { router } from '@inertiajs/react'
import {
  ArrowLeft,
  Phone,
  User,
  Info,
  ImageOff,
  Ruler,
  Calendar,
  Factory,
  MapPinned,
  Globe
} from 'lucide-react'
import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
};

export default function Show({ marketplace, photos, auth }) {
  const listing = {
    title: "Modern Kiosk in Shopping Mall",
    location: "Central Mall, Jakarta",
    price: 5000000,
    type: "Kiosk",
    size: "3x4 m²",
    features: [
      "Rak built-in",
      "Colokan listrik",
      "Lampu terang",
      "AC",
      "Lalu lintas pengunjung tinggi"
    ],
    description:
      "Kios strategis di pusat perbelanjaan ramai. Cocok untuk retail, fashion, atau kuliner ringan.",
    images: [
      "https://i.pinimg.com/736x/fe/de/a5/fedea5d019bd35bf8d3e5638129a8126.jpg",
      "https://us.oricon-group.com/upimg/detail/1000/1985/img660/62ed9024f073f5b108856c5d8f031d23.jpg"
    ],
    owner: {
      name: "Property Solutions Inc.",
      phone: "+62 812-3456-7890"
    }
  }

  const [selectedImage, setSelectedImage] = useState('');

  const placeholderPhoneNumber = "+62 800-0000-0000";

  const hasValidLocation = marketplace.lat && marketplace.long &&
                          isFinite(parseFloat(marketplace.lat)) &&
                          isFinite(parseFloat(marketplace.long));

  useEffect(() => {
      if (photos && photos.length > 0) {
          setSelectedImage(photos[0].url);
      } else {
          setSelectedImage('');
      }
  }, [photos]);

  return (
    <AuthenticatedLayout>
      <div className="max-w-5xl mx-auto px-6 py-8">
        
        <Link
            href={route('marketplace.index')}
            className="flex items-center mb-6 text-sm text-gray-500 transition-colors hover:text-blue-600"
        >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Kembali ke Daftar Lapak
        </Link>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
          
            <div className="p-4 space-y-3 bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="flex items-center justify-center w-full overflow-hidden bg-gray-100 rounded-lg aspect-video">
                  {selectedImage ? (
                      <img
                          src={selectedImage}
                          alt="Gambar Utama Lapak"
                          className="object-contain w-full h-full max-h-[500px]"
                      />
                  ) : (
                      <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                          <ImageOff size={64} />
                          <p className="mt-2">Tidak ada gambar</p>
                      </div>
                  )}
              </div>
              
              {photos && photos.length > 1 && (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                      {photos.map((photo) => (
                          <button
                              key={photo.id}
                              onClick={() => setSelectedImage(photo.url)}
                              className={`overflow-hidden rounded-md aspect-square focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                  ${selectedImage === photo.url ? 'ring-2 ring-blue-600 ring-offset-1' : 'hover:opacity-80'}`}
                          >
                              <img
                                  src={photo.url}
                                  alt={`Thumbnail ${photo.id}`}
                                  className="object-cover w-full h-full"
                              />
                          </button>
                      ))}
                  </div>
              )}
          </div>

          {/* Nama dan Kel Kec */}
            <div>
              <h1 className="text-2xl font-semibold"> {marketplace.name} </h1>
              <div className="flex items-center text-gray-500 text-md font-regular mt-1">
                <svg className="w-4 h-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 2C8.134 2 5 5.134 5 9c0 6.075 7 13 7 13s7-6.925 7-13c0-3.866-3.134-7-7-7zM12 11a2 2 0 100-4 2 2 0 000 4z"/>
                </svg>
                {marketplace.kelurahan}, {marketplace.kecamatan}
              </div>
            </div>
          </div>

          {/* Detail */}
          <div className="space-y-6">
            <div className="bg-white text-black rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold mb-2">{marketplace.price}</div>
              <div className="text-sm text-gray-500 mb-4">{marketplace.price_type === 'monthly' ? 'per bulan' : 'per tahun'}</div>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center">
                  <Factory className="w-4 h-4 stroke-1 mr-2"/>
                  Tipe: <span className="ml-auto font-medium">{marketplace.type}</span>
                </div>
                <div className="flex items-center">
                  <Ruler className="w-4 h-4 stroke-1 mr-2"/>
                  Ukuran: <span className="ml-auto font-medium">{+marketplace.size_length} × {+marketplace.size_width} m²</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 stroke-1 mr-2"/>
                  Diunggah pada: <span className="ml-auto font-medium">{formatDate(marketplace.created_at)}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 stroke-1 mr-2"/>
                  Diperbarui pada: <span className="ml-auto font-medium">{formatDate(marketplace.updated_at)}</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                Contact Owner
              </button>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="flex items-center mb-3 space-x-3">
                    <div className="flex items-center justify-center text-gray-500 bg-gray-200 rounded-full w-11 h-11">
                        <User className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="font-semibold text-gray-800">Informasi Pemilik</div>
                        <div className="text-sm text-gray-600">{marketplace.user ? marketplace.user.name : 'Nama Tidak Tersedia'}</div>
                    </div>
                </div>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-700">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        {placeholderPhoneNumber}
                    </div>
                </div>
            </div>
          </div>
        </div>


        {/* Deskripsi */}
        <div className="mt-6 space-y-6 bg-white text-black rounded-xl p-6 shadow-sm">
          <section>
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
              <Info className="w-5 h-5" />
              Deskripsi
            </div>
            <p className="text-gray-700 leading-relaxed">{marketplace.description}</p>
          </section>
        </div>

        {/* Alamat */}
        <div className="mt-6 space-y-6 bg-white text-black rounded-xl p-6 shadow-sm">
          <section>
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
              <MapPinned className="w-5 h-5" />
              Alamat
            </div>
            <p className="text-gray-700 leading-relaxed">{marketplace.address}</p>

          </section>
          {hasValidLocation && (
            <section>
                <div className="flex items-center gap-2 mb-3 text-xl font-semibold text-gray-800">
                    <Globe className="w-5 h-5 text-gray-600" />
                    Lokasi di Peta
                </div>
                <div className="w-full overflow-hidden rounded-lg h-80 md:h-96"> {/* Memberi tinggi pada container iframe */}
                    <iframe
                        loading="lazy"
                        allowFullScreen
                        className="w-full h-full border-0"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(marketplace.long) - 0.005},${parseFloat(marketplace.lat) - 0.005},${parseFloat(marketplace.long) + 0.005},${parseFloat(marketplace.lat) + 0.005}&layer=mapnik&marker=${marketplace.lat},${marketplace.long}`}
                        title="Peta Lokasi Lapak"
                    ></iframe>
                </div>
            </section>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
