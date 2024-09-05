// src/components/Layout.js

import Link from "next/link"; // Import Next.js Link

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white flex flex-col items-center py-6">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <ul className="space-y-4 w-full px-6">
          <li>
            <Link href="/admin/restaurants" className="block text-lg py-2 px-4 rounded-lg hover:bg-gray-700">
              Restaurants
            </Link>
          </li>
          <li>
            <Link href="/admin/categories" className="block text-lg py-2 px-4 rounded-lg hover:bg-gray-700">
              Categories
            </Link>
          </li>
          <li>
            <Link href="/admin/products" className="block text-lg py-2 px-4 rounded-lg hover:bg-gray-700">
              Products
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
