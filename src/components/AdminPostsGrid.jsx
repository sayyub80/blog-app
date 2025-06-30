'use client';

import BlogCard from '@/components/BlogCard';

export default function AdminPostsGrid({ posts }) {
 

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.length > 0 ? (
        posts.map((post) => (
          <BlogCard key={post._id} post={post} admin />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No posts yet</h3>
          <p className="text-gray-500 mb-4">Get started by creating your first blog post</p>
          <a
            href="/admin/create"
            className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Create Post
          </a>
        </div>
      )}
    </div>
  );
}