'use client';

import { useEffect, useState } from 'react';

export function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const h2s = Array.from(doc.querySelectorAll('h2, h3')).map((h) => ({
      id: h.id || h.textContent.toLowerCase().replace(/\s+/g, '-'),
      text: h.textContent,
      level: h.tagName.toLowerCase(),
    }));
    setHeadings(h2s);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Table of Contents</h3>
        <nav className="space-y-2">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`block text-gray-600 hover:text-blue-600 transition-colors ${
                heading.level === 'h3' ? 'pl-4 text-sm' : 'font-medium'
              }`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}