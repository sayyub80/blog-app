import dbConnect from '@/lib/dbConnect';
import Post from '@/lib/models/Post';
import { format } from 'date-fns';
import { FaCalendarAlt, FaClock, FaShareAlt } from 'react-icons/fa';
import { ReadingTime } from '@/components/ReadingTime';
import { ShareButton } from '@/components/ShareButton';
import { TableOfContents } from '@/components/TableOfContent';
import { PostSuggestions } from '@/components/PostSuggestions';

export async function generateMetadata({ params }) {
   await dbConnect();
  const post = await Post.findOne({ slug: params.slug }).select('title content slug createdAt updatedAt tags excerpt');

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The post you are looking for does not exist.',
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${params.slug}`
      }
    };
  }

  const description = post.excerpt || post.content.replace(/<[^>]+>/g, '').substring(0, 160);

  return {
    title: `${post.title} | Your Blog Name`,
    description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description
    }
  };
}

export default async function BlogPost(props) {
  const {params} = await props; // Ensure params are awaited correctly
  await dbConnect();
  const post = await Post.findOne({ slug: params.slug }).select('title content slug createdAt updatedAt');
  const recentPosts = await Post.find({ _id: { $ne: post?._id } })
    .sort({ createdAt: -1 })
    .limit(3)
    .select('title slug createdAt');

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Post Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The post you're looking for doesn't exist or may have been removed.
          </p>
          <a
            href="/blog"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Browse All Posts
          </a>
        </div>
      </div>
    );
  }

  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200); // 200 wpm

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* Article Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-500">
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2" />
              <span>{format(new Date(post.createdAt), 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center">
              <FaClock className="mr-2" />
              <span>{readingTime} min read</span>
            </div>
            <ShareButton 
              url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`}
              title={post.title}
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents (desktop) */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <TableOfContents content={post.content} />
          </div>

          {/* Main Content */}
          <article className="flex-1 bg-white rounded-md shadow-sm p-6 sm:p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>

        {/* Suggested Posts */}
        {recentPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">More to read</h2>
            <PostSuggestions posts={recentPosts} />
          </div>
        )}
      </div>
    </div>
  );
}