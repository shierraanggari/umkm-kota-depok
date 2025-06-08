import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Edit3,
    ArrowLeft,
    Trash2,
    ThumbsUp,
    MessageCircle,
    Bookmark,
    Send
 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Link, router, useForm, Head } from "@inertiajs/react";

import { formatDistanceToNow, parseISO } from "date-fns";
import { id as idLocale } from "date-fns/locale";

const formatTimestamp = (dateString) => {
    if (!dateString) return 'N/A'; // Handle jika dateString null atau undefined
    try {
        const date = parseISO(dateString); // parseISO untuk string tanggal ISO 8601 dari Laravel
        const now = new Date();
        
        // Jika tanggal lebih dari 7 hari yang lalu, tampilkan format tanggal absolut
        // Anda bisa sesuaikan batas ini (misalnya 24 jam, 3 hari, dll.)
        if ((now.getTime() - date.getTime()) > 7 * 24 * 60 * 60 * 1000) { // Lebih dari 7 hari
            return new Intl.DateTimeFormat('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            }).format(date);
        }
        // Jika kurang dari itu, tampilkan format relatif "X waktu yang lalu"
        return formatDistanceToNow(date, { addSuffix: true, locale: idLocale });
    } catch (error) {
        console.error("Error parsing date:", dateString, error);
        return "Tanggal tidak valid"; // Fallback jika parsing gagal
    }
};

const CommentItem = ({ comment, currentUserId, onLikeComment, onDeleteComment /*, onEditComment */ }) => {
    const canEditOrDelete = (currentUserId === comment.user_id || currentUserId === 1);

    return (
        <div className="flex items-start space-x-3 py-3 border-b border-gray-200 last:border-b-0">
            {/* Avatara */}
            {/* <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 font-semibold ${comment.user ? 'bg-gray-200' : 'bg-gray-300'}`}>
                {comment.user ? comment.user.name.charAt(0).toUpperCase() : <UserCircle size={20} />}
            </div> */}
            <img src={comment.user?.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user?.name || 'User')}&color=7F9CF5&background=EBF4FF`}
                alt={comment.user?.name || 'User Avatar'}
                className="w-10 h-10 rounded-full object-cover"
            />

            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-gray-800">{comment.user ? comment.user.name : 'User Anonim'}</span>
                        
                        <span className="text-xs text-gray-500">• {formatTimestamp(comment.created_at)}</span>
                    </div>
                    {canEditOrDelete && (
                        <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onDeleteComment(comment.id, comment.content)}>
                                <Trash2 size={14} className="text-gray-500 hover:text-red-600" />
                            </Button>
                        </div>
                    )}
                </div>
                <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                <div className="flex items-center mt-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center text-xs px-1 py-0.5 h-auto ${comment.is_liked_by_user ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                        onClick={() => onLikeComment(comment.id)}
                    >
                        <ThumbsUp size={14} className="mr-1" /> ({comment.likers_count || 0})
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default function Show({ auth, post }) {
    const { user: currentUser } = auth;

    const { data: commentData, setData: setCommentData, post: postComment, processing: processingComment, errors: commentErrors, reset: resetCommentForm } = useForm({
        content: '',
        post_id: post.id,
    });

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        postComment(route('comment.store', { post: post.id }), {
            preserveScroll: true,
            onSuccess: () => resetCommentForm(),
        });
    };

    const handleLikePost = () => {
        router.post(route('post.like.toggle', post.id), {}, { preserveScroll: true, preserveState: true });
    };
    const handleBookmarkPost = () => {
        router.post(route('post.bookmark.toggle', post.id), {}, { preserveScroll: true, preserveState: true });
    };
    const handleLikeComment = (commentId) => {
        router.post(route('comment.like.toggle', commentId), {}, { preserveScroll: true, preserveState: true });
    };
    const handleDeleteComment = (commentId, commentContent) => {
        if (confirm(`Apakah Anda yakin ingin menghapus komentar ini: "${commentContent.substring(0, 50)}..."?`)) {
            router.delete(route('comment.destroy', commentId), { preserveScroll: true });
        }
    };

    const canModifyPost = currentUser && post && post.user &&
        (currentUser.id === post.user.id ||
         currentUser.id === 1 ||
         (post.community && currentUser.id === post.community.creator_id)
        );

    return (
        <AuthenticatedLayout>

            <Head title={`Post di ${post.community.name}`} />

            <div className="p-4">
                <Link
                    href={route('community.show', post.community.id)}
                    className="flex items-center mb-6 text-sm text-gray-500 transition-colors hover:text-blue-600"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Kembali ke Komunitas
                </Link>
                
                <div className="mx-auto p-6 bg-white border rounded-md shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
                        {/* Foto */}
                        <img src={post.user?.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.user?.name || 'User')}&color=7F9CF5&background=EBF4FF`}
                          alt={post.user?.name || 'User Avatar'}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {/* <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${post.user ? 'bg-blue-500' : 'bg-gray-300'}`}>
                            {post.user ? post.user.name.charAt(0).toUpperCase() : <UserCircle size={24} />}
                        </div> */}

                        {/* Author */}
                        <div className="flex-grow"> 
                            <p className="text-sm font-semibold text-gray-900">{post.user ? post.user.name : 'User Anonim'}</p>
                            <div className="flex flex-col sm:flex-row text-xs text-gray-500">
                                {post.community && ( 
                                    <Link href={route('community.show', post.community.id)} className="text-blue-600 hover:underline">                                        
                                        <span className="">Komunitas: </span>{post.community.name}
                                    </Link>
                                )}

                                <span className="mx-1 sm:inline hidden"> • </span>
                                
                                <span>{formatTimestamp(post.created_at)}</span>
                            </div>
                        </div>

                        {/* Edit */}
                        {canModifyPost && (
                            <div className="flex-shrink-0 flex items-center space-x-1 self-start sm:self-center"> 
                                <Link href={route('post.edit', post.id)}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600" title="Edit Postingan">
                                        <Edit3 size={16} />
                                    </Button>
                                </Link>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-gray-500 hover:text-red-600"
                                    title="Hapus Postingan"
                                    onClick={() => {
                                        if(confirm(`Anda yakin ingin menghapus postingan ini?`)) {
                                            router.delete(route('post.destroy', post.id));
                                        }
                                    }}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Konten */}
                    <h1 className="text-base font-semibold text-gray-900 mb-1">{post.title}</h1>
                    <p className="mb-2 text-base whitespace-pre-wrap">
                        {post.description}
                    </p>

                    {/* Like, Bookmark */}
                    <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 border-t border-gray-200 mt-3 pt-3 space-y-2 sm:space-y-0">
                            <div className="flex items-center space-x-3">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleLikePost}
                                    className={`flex items-center px-2 py-1 rounded-md ${post.is_liked_by_user ? 'text-blue-600 bg-blue-100 font-semibold' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
                                >
                                    <ThumbsUp size={16} className="mr-1.5" /> Suka ({post.likers_count || 0})
                                </Button>
                                <span className="flex items-center text-gray-500 px-2 py-1">
                                    <MessageCircle size={16} className="mr-1.5" /> {post.comments_count || 0} Komentar
                                </span>
                            </div>
                            {currentUser && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleBookmarkPost}
                                    className={`flex items-center px-2 py-1 rounded-md ${post.is_bookmarked_by_user ? 'text-yellow-600 bg-yellow-100 font-semibold' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
                                >
                                    <Bookmark size={16} className="mr-1.5" /> {post.is_bookmarked_by_user ? 'Di-bookmark' : 'Bookmark'}
                                </Button>
                            )}
                        </div>
                </div>

                {/* Komentar */}
                {currentUser && (
                    <div className="mt-6 p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tulis Komentar Anda</h3>
                        <form onSubmit={handleCommentSubmit} className="space-y-3">
                            <textarea
                                value={commentData.content}
                                onChange={(e) => setCommentData('content', e.target.value)}
                                placeholder="Bagikan pendapat Anda..."
                                className={`w-full p-2.5 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-y ${commentErrors.content ? 'border-red-500' : 'border-gray-300'}`}
                                rows={3}
                            />
                            {commentErrors.content && <p className="text-xs text-red-500">{commentErrors.content}</p>}
                            <div className="flex justify-end">
                                <Button type="submit" disabled={processingComment} className="bg-blue-600 hover:bg-blue-700 flex items-center">
                                    <Send size={16} className="mr-2" />
                                    {processingComment ? 'Mengirim...' : 'Kirim Komentar'}
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Daftar Komentar */}
                <div className="mt-6 p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Semua Komentar
                    </h3>
                    {post.comments && post.comments.length > 0 ? (
                        post.comments.map((comment) => (
                            <div key={comment.id} className="mb-2 p-2 rounded-md border border-2">
                                <CommentItem
                                    comment={comment}
                                    currentUserId={currentUser?.id}
                                    onLikeComment={handleLikeComment}
                                    onDeleteComment={handleDeleteComment}
                                />
                            </div>
                        ))
                    ) : (
                        currentUser && <p className="p-6 text-sm text-center text-gray-500 bg-white border border-gray-200 rounded-xl shadow-lg">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
                    )}
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
