'use client'
import AdminNavbar from '@/components/AdminNavbar';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminNavbar />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}