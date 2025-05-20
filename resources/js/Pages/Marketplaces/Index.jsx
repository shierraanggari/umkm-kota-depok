// import Layout from "../Layout/Layout";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from "@inertiajs/react";

const listings = [
  {
    title: "Modern Kiosk in Shopping Mall",
    location: "Central Mall, Jakarta",
    price: "Rp 5.000.000",
    description: "Well-positioned kiosk in a busy shopping mall with high foot traffic. Perfect for retail or food service.",
    type: "Kiosk",
    size: "3×4 m²",
  },
  {
    title: "Corner Shop in Business District",
    location: "Sudirman Street, Jakarta",
    price: "Rp 8.500.000",
    description: "Strategic corner shop in the heart of the business district. Recently renovated with modern facilities.",
    type: "Shop",
    size: "5×8 m²",
  },
  {
    title: "Food Court Stall",
    location: "Mega Food Court, Bandung",
    price: "Rp 3.500.000",
    description: "Ready-to-use food stall in a popular food court. Comes with basic kitchen equipment and counter.",
    type: "Food Stall",
    size: "2×3 m²",
  },
  {
    title: "Food Court Stall",
    location: "Mega Food Court, Bandung",
    price: "Rp 3.500.000",
    description: "Ready-to-use food stall in a popular food court. Comes with basic kitchen equipment and counter.",
    type: "Food Stall",
    size: "2×3 m²",
  },
];

export default function Index() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Cari Lapak
                </h2>
            }
        >
            <div className="border border-black rounded p-6 m-5">
                <h2 className="text-xl font-semibold mb-4">Search Filters</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <input type="text" placeholder="Search listings..." className="p-2 rounded bg-white border border-gray-600 placeholder-gray-400" />
                <select className="p-2 rounded bg-white border border-gray-600">
                    <option>Depok Dua</option>
                    <option>Depok Timur</option>
                    <option>Margonda</option>
                </select>
                <select className="p-2 rounded bg-white border border-gray-600">
                    <option>Ruko</option>
                    <option>Kios</option>
                    <option>Tenda</option>
                </select>
                <select className="p-2 rounded bg-white border border-gray-600">
                    <option>Any price</option>
                    <option>Any price</option>
                    <option>Any price</option>
                </select>
                </div>
                <button className="border border-black bg-white text-black px-2 py-2 rounded hover:bg-slate-500 hover:text-white hover:border-white transition"> 
                    Apply Filters 
                </button>
            </div>            

            <div className="m-5 flex flex-row justify-between items-center gap-3">
                <h2 className="text-xl font-semibold leading-tight text-gray-800"> Pilih lapakmu </h2>
                <button className="border border-black bg-white text-black px-2 py-2 rounded hover:bg-slate-500 hover:text-white hover:border-white transition">
                    Tambah Lapak
                </button>
            </div>

            <div className="grid grid-cols-1 m-5 md:grid-cols-3 gap-6">
                {listings.map((item, index) => (
                <div key={index} className="bg-white/10 border border-gray-700 rounded-lg overflow-hidden">
                    <div className="h-40 bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500">[ Image Placeholder ]</span>
                    </div>
                    <div className="p-4">
                    <div className="flex justify-between items-center font-semibold">
                        <h3>{item.title}</h3>
                        <span>{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{item.location}</p>
                    <p className="text-sm mb-4">{item.description}</p>
                    <div className="flex justify-between text-sm text-gray-300 mb-4">
                        <span>📦 {item.type}</span>
                        <span>📐 {item.size}</span>
                    </div>
                    <button className="border border-black bg-white text-black w-full py-2 rounded self-end hover:bg-slate-500 hover:text-white hover:border-white transition">View Details</button>
                    </div>
                </div>
                ))}
            </div>
                <Link preserveScroll href="/carilapak" className="block title mt-[1000px]">
                    {new Date().toLocaleTimeString()}
                </Link>
        </AuthenticatedLayout>
    )
}

// function CariLapak({name}) {
//     return (
//         <>
//             <h1 className="title"> 
//                 Hello, {name}
//             </h1>

//             <Link preserveScroll href="/" className="block title mt-[1000px]">
//                 {new Date().toLocaleTimeString()}
//             </Link>
//         </>
//     )
// }

// CariLapak.layout = page => <Layout children={page}/>

// export default CariLapak;