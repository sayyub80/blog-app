import AdminPostsGrid from '@/components/AdminPostsGrid';
import dbConnect from '@/lib/dbConnect';
import Post from '@/lib/models/Post';
import { FiPlus } from 'react-icons/fi'; // Importing the plus icon for new post button
async function getPosts() {
  await dbConnect();
  const posts = await Post.find().sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(posts));
}

export default async function AdminPosts() {
  const posts = await getPosts();

  return (
    <div className="max-w-7xl  mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Posts</h1>
          <p className="text-gray-500 mt-1">Manage all your published and draft posts</p>
        </div>
        <a
          href="/admin/create"
          className="mt-4 sm:mt-0 inline-flex items-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
        >
          <FiPlus className="mr-2" />
          New Post
        </a>
      </div>
      {/* Posts grid */}
      <AdminPostsGrid posts={posts} />
    </div>
  );
}