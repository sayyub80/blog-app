import mongoose from 'mongoose';
import slugify from 'slugify';

const PostSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true,
      trim: true
    },
    content: { 
      type: String, 
      required: true 
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: 160
    },
    tags: {
      type: [String],
      default: []
    },
    slug: { 
      type: String, 
      required: true, 
      unique: true 
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft'
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

PostSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      trim: true
    }) + '-' + Math.random().toString(36).substring(2, 7);
  }
  next();
});

PostSchema.index({ title: 'text', content: 'text', tags: 'text' });

export default mongoose.models.Post || mongoose.model('Post', PostSchema);