"use client"; // Mark this component as a Client Component

import { useState } from "react";
import Layout from "../../../components/Layout";
import RestaurantForm from "../../../components/RestaurantForm";
import Link from "next/link";

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateRestaurant = (newRestaurant) => {
    setRestaurants([...restaurants, newRestaurant]);
    setShowCreateForm(false);
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
        <div className="w-full max-w-3xl mx-auto p-8">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Your Restaurants</h2>
          
          {restaurants.length === 0 ? (
            <p className="text-lg text-gray-600 text-center mb-6">
              You have no restaurants yet. Click the button below to add one.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {restaurants.map((restaurant) => (
                <Link
                  key={restaurant.id}
                  href={`/admin/restaurants/${restaurant.id}`}
                  className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-800">{restaurant.name}</h3>
                </Link>
              ))}
            </div>
          )}

          {!showCreateForm && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition ease-in-out duration-150 mb-6"
            >
              Create Restaurant
            </button>
          )}

          {showCreateForm && (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <RestaurantForm onCreate={handleCreateRestaurant} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
