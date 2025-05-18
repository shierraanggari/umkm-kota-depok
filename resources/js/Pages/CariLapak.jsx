// import Layout from "../Layout/Layout";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from "@inertiajs/react";

export default function CariLapak() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Cari Lapak
                </h2>
            }
        >
            <h1 className="title"> 
                 Hello, {name}
             </h1>

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