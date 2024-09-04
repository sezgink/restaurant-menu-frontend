// /pages/admin/restaurants.js
import Layout from "../../components/Layout";
import { useState } from "react";
import RestaurantForm from "../../components/RestaurantForm";

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]); // Fetch from API
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateRestaurant = (newRestaurant) => {
    setRestaurants([...restaurants, newRestaurant]);
    setShowCreateForm(false);
  };

  return (
    <Layout>
      <h2>Your Restaurants</h2>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id}>{restaurant.name}</div>
      ))}
      {!showCreateForm && (
        <button onClick={() => setShowCreateForm(true)}>
          Create Restaurant
        </button>
      )}
      {showCreateForm && <RestaurantForm onCreate={handleCreateRestaurant} />}
    </Layout>
  );
}
