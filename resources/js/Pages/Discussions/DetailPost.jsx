import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function DetailPost() {
  return (
    <AuthenticatedLayout>
        <div className="p-4">
            <div className="mx-auto p-6 bg-white border rounded-md shadow-sm">
                <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div>
                    <h2 className="font-semibold">Yukimiya Kenyu</h2>
                    <p className="text-sm text-gray-500">May 15, 2023, 5:30 PM</p>
                </div>
                </div>

                <h1 className="text-xl font-bold mb-2">What's your favorite programming language and why?</h1>
                <p className="mb-2">
                I've been using Python for most of my projects, but I'm curious what others prefer and why.
                </p>
                <p className="mb-2">
                Python has been great for me because of its readability and the vast ecosystem of libraries. It's perfect for data science and machine learning, which are my main areas of interest.
                </p>
                <p className="mb-2">
                However, I've heard good things about languages like Rust for performance-critical applications, and TypeScript for web development.
                </p>
                <p className="mb-4">
                What languages do you use, and what do you like about them?
                </p>

                <div className="flex items-center text-sm text-gray-600 space-x-4 border-t pt-2">
                <span>👍 42</span>
                <span>💬 28 comments</span>
                </div>
            </div>

            <div className="mx-auto mt-6 p-6 bg-white border rounded-md shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Komentar</h3>
                <textarea
                placeholder="Tulis komentar..."
                className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring"
                rows={3}
                ></textarea>
                <button className="border border-black bg-white text-black px-2 py-2 rounded hover:bg-slate-500 hover:text-white hover:border-white transition"> 
                    Kirim Komentar
                </button>
            </div>

            <div className="mx-auto mt-4 p-6 bg-white border rounded-md shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                    <img
                        src="https://i.pinimg.com/736x/fe/de/a5/fedea5d019bd35bf8d3e5638129a8126.jpg"
                        alt="Yukimiya Kenyu"
                        className="w-8 h-8 rounded-full"
                    />
                    <div>
                        <h4 className="font-semibold">Aldi Maldini</h4>
                        <p className="text-sm text-gray-500">May 15, 2023, 6:15 PM</p>
                    </div>
                </div>
                <p>
                I'm a big fan of JavaScript/TypeScript for web development. The ecosystem is huge, and with frameworks like React and Next.js, you can build almost anything.
                </p>
            </div>
        </div>
    </AuthenticatedLayout>
  );
}
