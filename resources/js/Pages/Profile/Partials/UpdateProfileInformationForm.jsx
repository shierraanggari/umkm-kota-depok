import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, router, usePage } from '@inertiajs/react';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/Components/ui/button';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            _method: 'patch',
            name: user.name,
            email: user.email,
            photo: null,
        });

    const submit = (e) => {
        e.preventDefault();

        post(route('profile.update'), {
            onSuccess: () => {
                if (photoInput.current) {
                    photoInput.current.value = '';
                }
                setPhotoPreview(null);
            }
        });
    };    

    const [photoPreview, setPhotoPreview] = useState(null);
    const photoInput = useRef(null);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('photo', file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleDeletePhoto = (e) => {
        e.preventDefault();
        if (confirm('Apakah Anda yakin ingin menghapus foto profil Anda?')) {
            router.delete(route('profile.photo.destroy'), { 
                preserveScroll: true,
                onSuccess: () => {
                    setData('photo', null); 
                    setPhotoPreview(null); 
                }
            });
        }
    };

    const clearPhotoPreview = () => {
        setData('photo', null);
        setPhotoPreview(null);
        if (photoInput.current) {
            photoInput.current.value = '';
        }
    };

    const currentPhotoUrl = photoPreview || user.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&color=7F9CF5&background=EBF4FF`;

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">

                {/* Bagian Foto Profil */}
                <div>
                    <InputLabel htmlFor="photo" value="Photo" />
                    <div className="mt-2 flex items-center space-x-4">
                        <span className="inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100">
                            <img 
                                src={currentPhotoUrl} 
                                alt="Profile Photo" 
                                className="h-full w-full object-cover"
                            />
                        </span>
                        <input
                            type="file"
                            id="photo"
                            className="hidden"
                            ref={photoInput}
                            onChange={handlePhotoChange}
                            accept="image/*"
                        />
                        <Button 
                            type="button" 
                            variant="outline" // Sesuaikan dengan Button Anda
                            onClick={() => photoInput.current.click()}
                        >
                            Pilih Foto Baru
                        </Button>
                        {user.profile_photo_url && !photoPreview && (
                            <Button
                                type="button"
                                variant="destructive" // atau "outline" dengan style merah
                                onClick={handleDeletePhoto}
                                disabled={processing} // Bisa juga pakai state processing terpisah jika perlu
                            >
                                Hapus Foto
                            </Button>
                        )}
                        {photoPreview && ( // Tombol untuk menghapus preview jika ada foto baru dipilih
                            <Button 
                                type="button" 
                                variant="ghost" // Atau variant lain
                                onClick={clearPhotoPreview}
                            >
                                Remove Photo
                            </Button>
                        )}
                    </div>
                    {/* Menampilkan error untuk 'photo' dari backend */}
                    <InputError className="mt-2" message={errors.photo} />
                </div>
                {/* Akhir Bagian Foto Profil */}

                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>{processing ? 'Menyimpan...' : 'Simpan'}</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Tersimpan.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
