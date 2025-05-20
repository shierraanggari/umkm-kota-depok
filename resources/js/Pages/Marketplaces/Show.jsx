import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react'

export default function Show() {
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
    description: "Kios strategis di pusat perbelanjaan ramai. Cocok untuk retail, fashion, atau kuliner ringan.",
    images: ["https://i.pinimg.com/736x/fe/de/a5/fedea5d019bd35bf8d3e5638129a8126.jpg", 
        "https://us.oricon-group.com/upimg/detail/1000/1985/img660/62ed9024f073f5b108856c5d8f031d23.jpg", 
        "https://us.oricon-group.com/upimg/detail/1000/1985/img660/62ed9024f073f5b108856c5d8f031d23.jpg"],
    owner: {
      name: "Property Solutions Inc.",
      phone: "+62 812-3456-7890",
    },
  }

  return (
    <AuthenticatedLayout>
      <header>
        <button onClick={() => router.go(-1)} 
          class="text-black hover:text-blue-600 transition-colors duration-200 font-semibold p-4">
          ← Kembali
        </button>
      </header>
        <div className="max-w-4xl mx-auto px-6 pb-6">
        {/* <button className="text-md font-regular text-black mb-4 hover:underline"> Test</button> */}

        <div className="grid md:grid-cols-2 gap-6">
            <img 
            src={listing.images[0]} 
            alt="Kiosk" 
            className="w-full h-64 object-cover rounded-lg shadow-md"
            />

            <div className="space-y-4 p-5 border border-black rounded">
            <h1 className="text-3xl font-bold">{listing.title}</h1>
            <div className="text-gray-600 flex items-center gap-2">
                📍 <span>{listing.location}</span>
            </div>
            <div className="text-green-600 text-2xl font-semibold">
                💰 Rp {listing.price.toLocaleString('id-ID')} / bulan
            </div>

            <div className="flex gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">🏢 {listing.type}</span>
                <span className="flex items-center gap-1">📐 {listing.size}</span>
            </div>
            </div>
        </div>

        <div className="mt-10 space-y-6">
            <section>
            <h2 className="text-xl font-semibold mb-2">✨ Fitur Unggulan</h2>
            <ul className="list-disc pl-6 text-gray-700">
                {listing.features.map((feat, idx) => (
                <li key={idx}>{feat}</li>
                ))}
            </ul>
            </section>

            <section>
            <h2 className="text-xl font-semibold mb-2">📝 Deskripsi</h2>
            <p className="text-gray-700">{listing.description}</p>
            </section>

            <section className="border-t-2 border-slate-300 pt-4">
            <h2 className="text-xl font-semibold mb-2">📞 Kontak Pemilik</h2>
            <p className="text-gray-800">👤 {listing.owner.name}</p>
            <p className="text-gray-800">📱 {listing.owner.phone}</p>
            </section>
        </div>
        </div>
    </AuthenticatedLayout>
  )
}
