import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import hasAnyPermission from '@/Utils/Permission';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const { auth } = usePage().props;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    
    const { props } = usePage();
    const successMessage = props.flash?.success;
    
    useEffect(() => {
        console.log("Flash props:", props.flash);
        if (successMessage) {
            toast.success(successMessage);
        }
    }, [successMessage]);

    const userPhotoUrl = user?.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&color=7F9CF5&background=EBF4FF`;

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex h-10 justify-between">
                        <div className="flex">
                            {/* Logo */}
                            <div className="flex shrink-0 items-center">
                                {/* <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link> */}
                                <img src="/image/logo_depokpreneur.png" alt="Logo" className="w-20 object-contain"></img>
                            </div>

                            {/* Navbar Utama */}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            { auth.user ? (
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                            ) : (
                                <NavLink
                                    href={route('guest')}
                                    active={route().current('guest')}
                                >
                                    Home
                                </NavLink>
                            )}
                                <NavLink
                                    href={route('marketplace.index')}
                                    active={route().current('marketplace*')}
                                >
                                    Cari Lapak
                                </NavLink>
                                <NavLink
                                    href={route('community.index')}
                                    active={route().current('community*') || route().current('post*')}
                                >
                                    Forum Diskusi UMKM
                                </NavLink>
                            </div>
                        </div>
                        
                        {/* Navbar Kanan */}
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <span className="inline-flex rounded-md">
                                        { auth.user ? (
                                            <Dropdown.Trigger>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                                >
                                                    {user.name}
                                                    
                                                    <img src={userPhotoUrl}
                                                        alt={user?.name || 'User Avatar'}
                                                        className="w-10 h-10 ml-2 rounded-full object-cover object-center"
                                                    />

                                                    <svg
                                                        className="-me-0.5 ms-2 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </Dropdown.Trigger>
                                        ) : (
                                            <nav className="-mx-3 flex flex-1 justify-end">
                                                <Link
                                                    href={route('login')}
                                                    className="rounded-md px-3 py-2 text-black text-sm font-medium ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                                >
                                                    Log In
                                                </Link>
                                                <Link
                                                    href={route('register')}
                                                    className="rounded-md px-3 py-2 text-black text-sm font-medium ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                                >
                                                    Register
                                                </Link>
                                            </nav>
                                            )}
                                    </span>
                                    
                                    {/* Dropdown Content */}
                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route('profile.edit')}
                                            >
                                                Profil
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route('profile.myMarketplaces')}
                                                as="button"
                                            >
                                                Lapak Saya
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route('profile.myPosts')}
                                                as="button"
                                            >
                                                Postingan Saya
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route('profile.bookmarkedPosts')}
                                                as="button"
                                            >
                                                Postingan Disimpan
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Dropdown Mobile */}
                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        { user ? (
                            <div>
                                <ResponsiveNavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </ResponsiveNavLink>
                            </div>
                        ) : (
                            <div>
                                <ResponsiveNavLink
                                    href={route('guest')}
                                    active={route().current('guest')}
                                >
                                    Home
                                </ResponsiveNavLink>
                            </div>
                        )}
                        <div>
                            <ResponsiveNavLink
                                href={route('marketplace.index')}
                                active={route().current('marketplace*')}
                            >
                                Cari Lapak
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route('community.index')}
                                active={route().current('community*') || route().current('post*')}
                            >
                                Forum Diskusi UMKM
                            </ResponsiveNavLink>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pb-1 pt-4">
                        { user && (
                            <div className="flex items-center">
                                <img src={userPhotoUrl}
                                    alt={user?.name || 'User Avatar'}
                                    className="w-10 h-10 rounded-full object-cover"/>
                                <div className="px-4">
                                    <div className="text-base font-medium text-gray-800">
                                        {user.name}
                                    </div>
                                    <div className="text-sm font-medium text-gray-500">
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Dropdown Mobile 2 */}
                        { auth.user ? (
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>
                                    Profil
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('profile.myMarketplaces')}
                                    as="button"
                                >
                                    Lapak Saya
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('profile.myPosts')}
                                    as="button"
                                >
                                    Postingan Saya
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('profile.bookmarkedPosts')}
                                    as="button"
                                >
                                    Postingan Disimpan
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route('logout')}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        ) : (
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink
                                    href={route('login')}
                                    as="button"
                                >
                                    Log In
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('register')}
                                    as="button"
                                >
                                    Register
                                </ResponsiveNavLink>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>
                <ToastContainer 
                    position="top-right" 
                    autoClose={3000} 
                    hideProgressBar 
                    toastClassName={() =>
                        "flex items-center gap-1 bg-green-100 border border-green-500 text-green-800 rounded-lg shadow-md p-5 font-medium text-sm"
                    }
                />
                {children}
            </main>
        </div>
    );
}
