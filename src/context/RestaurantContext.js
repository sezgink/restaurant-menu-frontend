// src/context/RestaurantContext.js
'use client';

import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create Restaurant Context
// export const RestaurantContext = createContext();
export const RestaurantContext = createContext();

// const RestaurantContext = createContext();

// Create a provider component
export function RestaurantProvider({ children }) {
  const [restaurants, setRestaurants] = useState([]);

  const restaurantsMock = [
    { id: 1, name: "Pizza Palace", icon: "🍕" },
    { id: 2, name: "Burger House", icon: "🍔" },
    { id: 3, name: "Sushi World", icon: "🍣" },
  ];

  

  // Fetch restaurants from API
  const fetchRestaurants = async () => {
    try {
      // const response = await axios.get("/api/restaurants");
      // setRestaurants(response.data);
      setRestaurants(restaurantsMock);
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
    }
  };

  // Function to add a new restaurant
  const addRestaurant = async (newRestaurant) => {
    try {
      await axios.post("/api/restaurants", newRestaurant);
      fetchRestaurants(); // Refetch the updated restaurant list
    } catch (error) {
      console.error("Failed to add restaurant", error);
    }
  };

  useEffect(() => {
    fetchRestaurants(); // Fetch restaurants on mount
  }, []);

  // const contextValue = { restaurants, addRestaurant };

  return (
    // <RestaurantContext.Provider value={restaurants}>
    // <RestaurantContext.Provider value={contextValue}>
    <RestaurantContext.Provider value={{ restaurants, addRestaurant }}>
      {children}
    </RestaurantContext.Provider>
  );
}
