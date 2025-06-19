import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Link, usePage, Head } from '@inertiajs/react';
import hasAnyPermission from '@/Utils/Permission';
import { Users,
    MessagesSquare,
    ShoppingBag, 
    MessageCircle, 
    Zap, 
    ArrowRight, 
    Search, 
    Building2
 } from 'lucide-react';

// const placeholderCariLapak = "https://placehold.co/600x400/EBF4FF/4F46E5?text=Fitur+Cari+Lapak";
const placeholderCariLapak = "https://img.freepik.com/free-vector/flat-hotel-review-concept-background_23-2148172419.jpg?semt=ais_hybrid&w=740";
const placeholderForumDiskusi = "https://img.freepik.com/premium-vector/online-chatting-laptop-concept-people-connecting-together-work-from-anywhere-flat-vector_545399-1184.jpg";

export default function Index() {
    const { props: pageProps } = usePage();
    const permission = pageProps.permission || {};

    return (
        <AuthenticatedLayout>

            <Head title="Selamat Datang di Platform UMKM Kota Depok" />
            {/* <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50 text-gray-800 font-inter"> */}
                
                {/* Section 1 */}
                <header className="bg-indigo-700 relative pt-28 pb-20 md:pt-40 md:pb-28 text-center overflow-hidden">
                    <div className="absolute inset-0 hero-gradient opacity-80 transform -skew-y-3 z-0"></div>
                    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
                            Platform Kolaborasi <span className="block text-indigo-200">UMKM Kota Depok</span>
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto">
                            Temukan peluang, jalin koneksi, dan kembangkan usaha Anda bersama komunitas UMKM terpadu di Kota Depok. Dari mencari lapak hingga forum diskusi yang memberdayakan.
                        </p>
                        <div className="mt-12">
                            <Link
                                href={route('login')}
                                className="inline-block bg-white text-indigo-700 px-10 py-4 rounded-lg text-lg font-bold shadow-xl hover:bg-indigo-50 transition duration-300 ease-in-out transform hover:scale-105 cta-button"
                            >
                                Log In
                            </Link>
                            <Link
                                href={route('register')}
                                className="inline-block ml-3 bg-white text-indigo-700 px-10 py-4 rounded-lg text-lg font-bold shadow-xl hover:bg-indigo-50 transition duration-300 ease-in-out transform hover:scale-105 cta-button"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </header>

                <section id="fitur" className="py-16 sm:py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Solusi Terpadu untuk UMKM Depok
                            </h2>
                            <p className="mt-4 text-lg leading-8 text-gray-600">
                                Kami menyediakan alat dan komunitas yang Anda butuhkan untuk berkembang.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 lg:mb-24">
                            <div className="order-2 lg:order-1">
                                <div className="inline-flex items-center bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                                    <ShoppingBag size={18} className="mr-2" /> Lokasi Usaha
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Temukan Lapak Ideal Anda</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Cari dan temukan berbagai pilihan lapak usaha yang tersedia di seluruh Kota Depok. Filter berdasarkan lokasi, tipe, ukuran, dan harga untuk mendapatkan tempat yang paling sesuai dengan kebutuhan bisnis Anda. Lihat detail lengkap dan hubungi pemilik dengan mudah.
                                </p>
                                <Link href={route('marketplace.index')} className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
                                    Jelajahi Pilihan Lapak <ArrowRight size={20} className="ml-2" />
                                </Link>
                            </div>
                            <div className="order-1 lg:order-2">
                                <img 
                                    src={placeholderCariLapak} 
                                    alt="Ilustrasi pencarian lapak UMKM di Depok" 
                                    className="rounded-xl shadow-2xl w-full h-auto object-cover aspect-video" 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="order-2">
                                <div className="inline-flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                                    <MessagesSquare size={18} className="mr-2" /> Kolaborasi & Wawasan
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Bergabung dalam Forum Diskusi</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Terhubung dengan sesama pelaku UMKM, bagikan pengalaman, ajukan pertanyaan, dan dapatkan solusi bersama. Forum diskusi kami adalah tempat untuk belajar, berjejaring, dan tumbuh bersama komunitas UMKM Kota Depok.
                                </p>
                                <Link href={route('community.index')} className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-800 transition-colors">
                                    Masuk ke Forum Diskusi <ArrowRight size={20} className="ml-2" />
                                </Link>
                            </div>
                            <div className="order-1">
                                <img 
                                    src={placeholderForumDiskusi} 
                                    alt="Ilustrasi forum diskusi UMKM Depok" 
                                    className="rounded-xl shadow-2xl w-full h-auto object-cover aspect-video" 
                                />
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="bg-indigo-700 hero-gradient py-16 sm:py-20">
                    <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            Siap Menjadi Bagian dari Kemajuan UMKM Depok?
                        </h2>
                        <p className="mt-4 text-lg text-indigo-100">
                            Bergabunglah dengan ribuan pelaku UMKM lainnya. Daftar sekarang, gratis, dan tanpa ribet!
                        </p>
                        <Link
                            href={route('register')}
                            className="mt-10 w-full inline-flex items-center justify-center px-8 py-4 rounded-lg shadow-lg text-lg font-medium text-indigo-700 bg-white hover:bg-indigo-50 sm:w-auto cta-button"
                        >
                            Daftar Sekarang
                        </Link>
                    </div>
                </section>

                <footer className="bg-gray-800 text-gray-400 border-t border-gray-700">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-sm">&copy; {new Date().getFullYear()} Platform UMKM Kota Depok. Semua Hak Cipta Dilindungi.</p>
                    </div>
                </footer>
            {/* </div> */}
        </AuthenticatedLayout>
    )
}