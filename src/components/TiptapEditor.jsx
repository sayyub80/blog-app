'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useState, useEffect } from 'react';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaHeading,
  FaListUl,
  FaListOl,
  FaLink,
  FaUnlink,
  FaQuoteRight,
  FaCode,
  FaRedo,
  FaUndo,
  FaImage
} from 'react-icons/fa';

export default function TiptapEditor({ value, onChange }) {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Write something beautiful...',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] p-4',
      },
    },
  });

  const setLink = () => {
    if (linkUrl === null) {
      return;
    }

    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      setIsLinkModalOpen(false);
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: linkUrl })
      .run();

    setIsLinkModalOpen(false);
  };

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return <div className="min-h-[300px] bg-gray-50 rounded-lg border border-gray-200 animate-pulse" />;
  }

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border border-gray-200 rounded-t-lg shadow-sm">
        {/* Text Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
          aria-label="Bold"
        >
          <FaBold />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
          aria-label="Italic"
        >
          <FaItalic />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
          aria-label="Underline"
        >
          <FaUnderline />
        </button>

        {/* Headings */}
        <div className="h-6 w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
          aria-label="Heading 1"
        >
          <span className="flex items-center">
            <FaHeading className="mr-1" />1
          </span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
          aria-label="Heading 2"
        >
          <span className="flex items-center">
            <FaHeading className="mr-1" />2
          </span>
        </button>

        {/* Lists */}
        <div className="h-6 w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
          aria-label="Bullet List"
        >
          <FaListUl />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
          aria-label="Numbered List"
        >
          <FaListOl />
        </button>

        {/* Block Elements */}
        <div className="h-6 w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
          aria-label="Blockquote"
        >
          <FaQuoteRight />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('codeBlock') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
          aria-label="Code Block"
        >
          <FaCode />
        </button>

        {/* Links */}
        <div className="h-6 w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => {
            const previousUrl = editor.getAttributes('link').href;
            setLinkUrl(previousUrl || '');
            setIsLinkModalOpen(true);
          }}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
          aria-label="Link"
        >
          <FaLink />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="p-2 rounded hover:bg-gray-200 text-gray-700"
          disabled={!editor.isActive('link')}
          aria-label="Remove Link"
        >
          <FaUnlink />
        </button>

        {/* History */}
        <div className="h-6 w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded hover:bg-gray-200 text-gray-700 disabled:opacity-50"
          disabled={!editor.can().undo()}
          aria-label="Undo"
        >
          <FaUndo />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded hover:bg-gray-200 text-gray-700 disabled:opacity-50"
          disabled={!editor.can().redo()}
          aria-label="Redo"
        >
          <FaRedo />
        </button>
      </div>

      {/* Editor Content */}
      <div className="bg-white border border-gray-200 rounded-b-lg shadow-sm">
        <EditorContent editor={editor} />
      </div>

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Add Link</h3>
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={setLink}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}