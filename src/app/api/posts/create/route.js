import dbConnect from '@/lib/dbConnect';
import Post from '@/lib/models/Post';
import { NextResponse } from 'next/server';
import slugify from 'slugify';

export async function POST(request) {
  try {
    await dbConnect();
    const { title, content, tags = [], excerpt = '', status = 'draft' } = await request.json();

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true
    });

    // Create and save post
    const post = new Post({
      title,
      content,
      slug,
      tags,
      excerpt,
      status
    });

    await post.save();

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    console.error('POST /api/posts/create error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}