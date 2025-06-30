import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { FiPlus, FiEdit, FiEye, FiTrendingUp } from 'react-icons/fi';
import { FaRegComments, FaRegEye } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';

export default function AdminDashboard() {
  return (
    <div className="space-y-8 pt-9">
      {/* Header with animated gradient */}
      <div
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 shadow-lg transition-all duration-500"
      >
        <h1 className="text-4xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-indigo-100 mt-2">Welcome back! Here's what's happening with your blog.</p>
      </div>

      {/* Action Cards with hover animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="transform transition-transform duration-200 hover:scale-105 active:scale-95">
          <Card className="p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-indigo-300 transition-all">
            <Link href="/admin/create" className="block">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                  <FiPlus className="text-xl" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Create New Post</h2>
              </div>
              <p className="text-gray-600 pl-16">Craft and publish a new blog post</p>
            </Link>
          </Card>
        </div>

        <div className="transform transition-transform duration-200 hover:scale-105 active:scale-95">
          <Card className="p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-indigo-300 transition-all">
            <Link href="/admin/posts" className="block">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <FiEdit className="text-xl" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Manage Posts</h2>
              </div>
              <p className="text-gray-600 pl-16">Edit or delete existing content</p>
            </Link>
          </Card>
        </div>

        <div className="transform transition-transform duration-200 hover:scale-105 active:scale-95">
          <Card className="p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-indigo-300 transition-all">
            <Link href="/" className="block">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                  <FiEye className="text-xl" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">View Site</h2>
              </div>
              <p className="text-gray-600 pl-16">See your blog as visitors do</p>
            </Link>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FiTrendingUp className="mr-2 text-indigo-600" />
          Quick Statistics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Posts" 
            value="24" 
            icon={<IoDocumentTextOutline className="text-2xl" />}
            color="text-indigo-600"
            bgColor="bg-indigo-100"
          />
          <StatCard 
            title="Drafts" 
            value="3" 
            icon={<IoDocumentTextOutline className="text-2xl" />}
            color="text-yellow-600"
            bgColor="bg-yellow-100"
          />
          <StatCard 
            title="Comments" 
            value="56" 
            icon={<FaRegComments className="text-2xl" />}
            color="text-blue-600"
            bgColor="bg-blue-100"
          />
          <StatCard 
            title="Page Views" 
            value="1.2K" 
            icon={<FaRegEye className="text-2xl" />}
            color="text-purple-600"
            bgColor="bg-purple-100"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color, bgColor }) {
  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all transform hover:-translate-y-1"
    >
      <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center mb-4`}>
        <span className={color}>{icon}</span>
      </div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  );
}