// src/app/admin/restaurants/[id]/page.js
// src/app/admin/restaurants/[id]/page.js
"use client"; // Mark this component as a Client Component

// src/app/admin/restaurants/[id]/page.js

import { useState } from 'react';
import Layout from '../../../../components/Layout';

export default function RestaurantProfilePage({ params }) {
  const { id } = params; // Get the restaurant ID from the URL
  const [activeTab, setActiveTab] = useState('categories'); // Default tab

  // Dummy data for categories and products
  const categories = [
    { id: 1, name: "Appetizers" },
    { id: 2, name: "Main Courses" },
  ];

  const products = [
    { id: 1, name: "Pizza", category: "Main Courses" },
    { id: 2, name: "Salad", category: "Appetizers" },
  ];

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Restaurant Profile (ID: {id})</h2>

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b mb-4">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 ${activeTab === 'categories' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 ${activeTab === 'products' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
          >
            Products
          </button>
        </div>

        {/* Dynamic Tab Content */}
        <div>
          {activeTab === 'categories' && (
            <div>
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <ul>
                {categories.map((category) => (
                  <li key={category.id} className="mb-2">
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <h3 className="text-xl font-bold mb-4">Products</h3>
              <ul>
                {products.map((product) => (
                  <li key={product.id} className="mb-2">
                    {product.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
