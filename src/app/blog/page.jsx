import BlogCard from '@/components/BlogCard';
import dbConnect from '@/lib/dbConnect';
import Post from '@/lib/models/Post';

async function getAllPosts() {
  await dbConnect();
  const posts = await Post.find().sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(posts));
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-10 text-center">
          All <span className="text-blue-400">Blog Posts</span>
        </h1>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard
                key={post._id}
                post={post}
                className="transform hover:scale-[1.02] transition-transform duration-300"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-800 rounded-full mb-6">
              <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-white mb-2">No posts yet</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              We're working on creating amazing content for you. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}