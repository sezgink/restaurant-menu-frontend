// /pages/admin/categories.js
import Layout from "../../components/Layout";
import { useState } from "react";
import CategoryForm from "../../components/CategoryForm";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]); // Fetch from API
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
    setShowCreateForm(false);
  };

  return (
    <Layout>
      <h2>Categories</h2>
      {categories.map((category) => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          <p>{category.description}</p>
          <img src={category.image} alt={category.name} />
        </div>
      ))}
      {!showCreateForm && (
        <button onClick={() => setShowCreateForm(true)}>Create Category</button>
      )}
      {showCreateForm && <CategoryForm onCreate={handleCreateCategory} />}
    </Layout>
  );
}
