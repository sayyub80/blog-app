'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TiptapEditor from '@/components/TiptapEditor';
import { FiArrowLeft, FiSave, FiTag, FiFileText } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: [],
    status: 'draft'
  });
  const [currentTag, setCurrentTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()]
      });
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // For publishing (status: published or whatever is selected)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, status: 'published' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create post');
      }

      toast.success('Post published successfully!');
      router.push('/admin/posts');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // For saving as draft
  const handleSaveDraft = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, status: 'draft' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save draft');
      }

      toast.success('Draft saved!');
      router.push('/admin/posts');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <FiArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Post
          </h1>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
            {/* Title Section */}
            <div className="p-6 sm:p-8">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiFileText className="mr-2 text-blue-600" />
                Post Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your post title..."
                required
              />
            </div>

            {/* Status & Excerpt Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt (SEO Description)
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Brief summary for SEO..."
                  maxLength={160}
                />
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {formData.excerpt.length}/160 characters
                </p>
              </div>
            </div>

            {/* Tags Section */}
            <div className="p-6 sm:p-8">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiTag className="mr-2 text-blue-600" />
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map(tag => (
                  <span 
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1.5 inline-flex text-blue-400 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add tags (press Enter)"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 sm:p-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <div className="mt-1 border border-gray-300 rounded-lg overflow-hidden">
                <TiptapEditor 
                  value={formData.content} 
                  onChange={(content) => setFormData({...formData, content})} 
                />
              </div>
            </div>

            {/* Actions Section */}
            <div className="px-6 py-5 sm:px-8 bg-gray-50 flex justify-between">
              <button
                type="button"
                onClick={() => router.push('/admin/posts')}
                className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={isSubmitting}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <FiSave className="-ml-1 mr-2 h-4 w-4" />
                      Publish Post
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}