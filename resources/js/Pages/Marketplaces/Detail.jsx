import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { router } from '@inertiajs/react'
import {
  ArrowLeft,
  MapPin,
  Building2,
  Ruler,
  Phone,
  User,
  Info,
  Star
} from 'lucide-react'

export default function Detail() {
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

  return (
    <AuthenticatedLayout>
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.go(-1)}
          className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Kembali
        </button>

        <div class="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div class="md:col-span-2 space-y-4">
          {/* image */}
            <div class="bg-gray-100">
              <img
                src={listing.images[0]}
                alt="Kiosk"
                className="w-full max-h-96 object-cover rounded-xl"
              />
            </div>
          {/* image */}
            <div>
              <h1 class="text-2xl font-semibold">{listing.title}</h1>
              <div class="flex items-center text-gray-500 text-md font-regular mt-1">
                <svg class="w-4 h-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 2C8.134 2 5 5.134 5 9c0 6.075 7 13 7 13s7-6.925 7-13c0-3.866-3.134-7-7-7zM12 11a2 2 0 100-4 2 2 0 000 4z"/>
                </svg>
                {listing.location}
              </div>
            </div>
          </div>

          {/* detail */}
          <div class="space-y-6">
            <div class="bg-white text-black rounded-xl p-6 shadow-sm">
              <div class="text-3xl font-bold mb-2">Rp 5.000.000</div>
              <div class="text-sm text-gray-500 mb-4">per bulan</div>
              <div class="space-y-2 text-sm text-gray-700">
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  Tipe: <span class="ml-auto font-medium">Kiosk</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 4h16v16H4z" />
                  </svg>
                  Ukuran: <span class="ml-auto font-medium">3×4 m²</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Diunggah pada: <span class="ml-auto font-medium">May 10, 2023</span>
                </div>
              </div>
              <button class="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                Contact Owner
              </button>
            </div>

            <div class="bg-white text-black rounded-xl p-6 shadow-sm">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.652 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div class="font-medium">Property Solutions Inc.</div>
                </div>
              </div>
              <div class="mt-4 space-y-1 text-sm">
                <div class="flex items-center text-gray-700">
                  <svg class="w-4 h-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 5h18M3 19h18M5 3v18M19 3v18M9 9h6v6H9z" />
                  </svg>
                  +62 812-3456-7890
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Details */}
        <div className="mt-6 space-y-6">
          <section>
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Fitur Unggulan
            </div>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              {listing.features.map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
              <Info className="w-5 h-5" />
              Deskripsi
            </div>
            <p className="text-gray-700 leading-relaxed">{listing.description}</p>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
              <Phone className="w-5 h-5" />
              Kontak Pemilik
            </div>
            <div className="text-gray-700 space-y-1">
              <p className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {listing.owner.name}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {listing.owner.phone}
              </p>
            </div>
          </section>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
