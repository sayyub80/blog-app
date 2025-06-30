import BlogCard from '@/components/BlogCard';
import dbConnect from '@/lib/dbConnect';
import Post from '@/lib/models/Post';
import { FaArrowRight } from 'react-icons/fa';

async function getPosts() {
  await dbConnect();
  const posts = await Post.find().sort({ createdAt: -1 }).limit(5);
  return JSON.parse(JSON.stringify(posts));
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br  from-gray-900 to-gray-800 pt-15">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold text-white sm:text-6xl">
            Discover <span className="text-blue-400">Amazing</span> Content
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the latest insights, stories, and ideas from our community of writers.
          </p>
        </div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      {/* Featured Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-white">
            Latest <span className="text-blue-400">Posts</span>
          </h2>
          <a 
            href="/blog" 
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            View all <FaArrowRight className="ml-2" />
          </a>
        </div>

        {/* Posts Grid */}
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

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to share your story?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join our community of writers and share your knowledge with the world.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100 transition-colors"
          >
            Start Writing Now
          </a>
        </div>
      </div>
    </div>
  );
}