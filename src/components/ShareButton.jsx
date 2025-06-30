'use client';

import { FaTwitter, FaFacebook, FaLinkedin, FaLink, FaShareAlt } from 'react-icons/fa';

export function ShareButton({ url, title, variant = 'desktop' }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  if (variant === 'mobile') {
    return (
      <div className="flex space-x-4">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-500"
        >
          <FaTwitter size={20} />
        </a>
        <button onClick={copyToClipboard} className="text-gray-400 hover:text-gray-500">
          <FaLink size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-500">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-500"
        aria-label="Share on Twitter"
      >
        <FaTwitter size={16} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-700"
        aria-label="Share on Facebook"
      >
        <FaFacebook size={16} />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 hover:text-blue-800"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin size={16} />
      </a>
      <button 
        onClick={copyToClipboard} 
        className="text-gray-500 hover:text-gray-600"
        aria-label="Copy link"
      >
        <FaLink size={16} />
      </button>
    </div>
  );
}