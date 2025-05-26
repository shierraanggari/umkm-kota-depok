import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index() {
    const communities = [
        {
            name: 'Technology',
            description: 'Discuss the latest in tech, programming, and digital innovations.',
            posts: 324,
            members: 1250
        },
        {
            name: 'Business',
            description: 'Share business ideas, strategies, and entrepreneurship tips.',
            posts: 187,
            members: 843
        },
        {
            name: 'Health & Wellness',
            description: 'Topics related to physical and mental health, fitness, and wellbeing.',
            posts: 256,
            members: 976
        },
        {
            name: 'Education',
            description: 'Discussions about learning, teaching methods, and educational resources.',
            posts: 142,
            members: 621
        },
        {
            name: 'Arts & Culture',
            description: 'Share and discuss art, music, literature, and cultural topics.',
            posts: 98,
            members: 412
        },
        {
            name: 'Food & Cooking',
            description: 'Recipe sharing, cooking techniques, and food-related discussions.',
            posts: 215,
            members: 789
        },
    ];
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Pilih Komunitas Diskusi
                </h2>
            }>

                <div className="py-6 px-4 sm:px-6 lg:px-8">
                    <div className="border border-black rounded p-6">
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

                <div className="flex justify-end my-4">
                    <button className="border border-black bg-white text-black px-2 py-2 rounded hover:bg-slate-500 hover:text-white hover:border-white transition"> 
                        Buat Komunitas
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {communities.map((community, idx) => (
                        <div key={idx} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                            <h3 className="text-lg font-bold text-gray-900">{community.name}</h3>
                            <p className="text-sm text-gray-700 mt-1">{community.description}</p>
                            <div className="text-sm text-gray-600 mt-2">
                                {community.posts} posts • {community.members} members
                            </div>
                            <div className="mt-2">
                                <a
                                    href="#"
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    View
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}