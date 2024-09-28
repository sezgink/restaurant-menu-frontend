// src/app/admin/restaurants/[id]/page.js
// src/app/admin/restaurants/[id]/page.js
"use client"; // Mark this component as a Client Component

// src/app/admin/restaurants/[id]/page.js

import { useState,useContext } from 'react';
import Layout from '../../../../components/Layout';
import { RestaurantContext } from '@/context/RestaurantContext';

export default function RestaurantProfilePage({ params }) {
  const { restaurantId } = params; // Get the restaurant ID from the URL
  const [activeTab, setActiveTab] = useState('categories'); // Default tab
  const { currentRestaurant,setCurrentRestaurant,chooseRestaurantById} = useContext(RestaurantContext);


  // Dummy data for categories and products
  const categories = [
    { id: 1, name: "Appetizers" },
    { id: 2, name: "Main Courses" },
  ];

  const products = [
    { id: 1, name: "Pizza", category: "Main Courses" },
    { id: 2, name: "Salad", category: "Appetizers" },
  ];

  const fetchRestaurant = async ()=>{
    try {
      //TODO if restaurant id null, return to homepage
      // chooseRestaurantById(restaurantId)
    
      
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+restaurantId+'/categories',{withCredentials:true});
      console.log(response);
      const fetchedCategories = response.data.filter(
        (category) => category.category_name.trim().toLowerCase() !== "uncategorized" );
        setCategories(fetchedCategories || []);
        // setRestaurants(restaurantsMock);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
  }

  return (
    <Layout>
      <div className="container mx-auto p-6">
      <img
                    // src={category.image}
                    src={process.env.NEXT_PUBLIC_API_URL+'/uploads/' +currentRestaurant.profile_pic}
                    alt={currentRestaurant.name}
                    className="w-40 h-40 object-cover rounded-md shadow-md"
                    // className="w-40 h-40 object-cover rounded-md shadow-md flex-start"
                    // className="w-40 h-40 object-cover mb-4 rounded-full shadow-md"
                  />
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Restaurant Profile (ID: {restaurantId})</h2>
        <h2 className="text-2xl font-extrabold text-left text-gray-800 mb-8">Restaurant Name : {currentRestaurant.name}</h2>
        <h2 className="text-2xl font-extrabold text-left text-gray-800 mb-8">About Restaurant : {currentRestaurant.description}</h2>

        
      </div>
    </Layout>
  );
}
