'use client';

import Link from 'next/link';
import { FiHome, FiUser, FiBook, FiMessageSquare, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed w-full z-50 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 ">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                  BlogVista
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-centerspace-x-8">
                <Link 
                  href="/" 
                  className="group relative px-3 py-2   transition-colors"
                >
                  <div className="flex items-center">
                    <FiHome className="mr-2" />
                    Home
                  </div>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>

                <Link 
                  href="/blog" 
                  className="group relative px-3 py-2   transition-colors"
                >
                  <div className="flex items-center">
                    <FiBook className="mr-2" />
                    Blog
                  </div>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>

                <Link 
                  href="/contact" 
                  className="group relative px-3 py-2  transition-colors"
                >
                  <div className="flex items-center">
                    <FiMessageSquare className="mr-2" />
                    Contact
                  </div>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>

                <Link 
                  href="/admin" 
                  className="group relative px-3 py-2 transition-colors"
                >
                  <div className="flex items-center">
                    <FiUser className="mr-2" />
                    Admin
                  </div>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
              >
                {isOpen ? (
                  <FiX className="h-6 w-6" />
                ) : (
                  <FiMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-white bg-opacity-5 backdrop-blur-lg border-b border-gray-800 -z-10"></div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-20 inset-x-0 z-40 bg-gray-900 bg-opacity-95 backdrop-blur-sm border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <FiHome className="mr-3" />
              Home
            </Link>
            <Link
              href="/blog"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <FiBook className="mr-3" />
              Blog
            </Link>
            <Link
              href="/contact"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <FiMessageSquare className="mr-3" />
              Contact
            </Link>
            <Link
              href="/admin"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <FiUser className="mr-3" />
              Admin
            </Link>
          </div>
        </div>
      )}
    </>
  );
}