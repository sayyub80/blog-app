import Link from 'next/link';
import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function BlogCard({ post, admin = false, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <FaCalendarAlt className="mr-2 text-blue-500" />
          <span>
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600">
          {admin ? (
            post.title
          ) : (
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          )}
        </h2>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-gray-500 mb-2">{post.excerpt}</p>
        )}

        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.content.replace(/<[^>]+>/g, '').slice(0, 200)}...
        </p>

        {admin ? (
          <div className="flex gap-2">
            <Link
              href={`/admin/edit/${post.slug}`}
              className="inline-flex items-center px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
              title="Edit"
            >
              <FiEdit className="mr-1" /> Edit
            </Link>
           
          </div>
        ) : (
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
          >
            Read more
            <FaArrowRight className="ml-2" />
          </Link>
        )}
      </div>
    </div>
  );
}