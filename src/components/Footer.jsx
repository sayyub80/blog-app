export default function Footer() {
  return (
    <footer className="bg-white shadow-lg ">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} BlogSite. All rights reserved.
        </div>
      </div>
    </footer>
  );
}