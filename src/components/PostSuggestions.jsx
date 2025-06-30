import Link from 'next/link';
import { format } from 'date-fns';

export function PostSuggestions({ posts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div key={post._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="text-sm text-gray-500 mb-2">
              {format(new Date(post.createdAt), 'MMMM d, yyyy')}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mt-4"
            >
              Read more
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}