"use client"; // Mark this component as a Client Component

import Layout from "../../../components/Layout";
import { useState } from "react";
import CategoryForm from "../../../components/CategoryForm";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]); // Fetch from API
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
    setShowCreateForm(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex flex-col items-center py-12 px-4">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Categories</h2>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full max-w-7xl">
            {categories.map((category) => (
              <div key={category.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-40 h-40 object-cover mb-4 rounded-full shadow-md"
                />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-center">{category.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-600 mb-8 text-center">No categories available. Please create one.</p>
        )}

        {/* Create Category Button */}
        {!showCreateForm && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200"
          >
            Create Category
          </button>
        )}

        {/* Create Category Form */}
        {showCreateForm && (
          <div className="w-full max-w-2xl mt-8 bg-white shadow-lg rounded-lg p-6">
            <CategoryForm onCreate={handleCreateCategory} />
          </div>
        )}
      </div>
    </Layout>
  );
}
