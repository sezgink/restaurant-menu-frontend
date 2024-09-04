// src/app/admin/products/page.js
import { useState } from 'react';
import Layout from '../../../components/Layout';
import ProductForm from '../../../components/ProductForm';

export default function ProductsPage() {
  const [products, setProducts] = useState([]); // This would come from an API in a real scenario
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    setShowCreateForm(false);
  };

  return (
    <Layout>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <img src={product.image} alt={product.name} width="100" />
        </div>
      ))}

      {!showCreateForm && (
        <button onClick={() => setShowCreateForm(true)}>
          Create Product
        </button>
      )}

      {showCreateForm && <ProductForm onCreate={handleCreateProduct} />}
    </Layout>
  );
}
