// src/context/RestaurantContext.js
'use client';

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { list } from "postcss";

// Create Restaurant Context
// export const RestaurantContext = createContext();
export const RestaurantContext = createContext();

// const RestaurantContext = createContext();

// Create a provider component
export function RestaurantProvider({ children }) {
  const [restaurants, setRestaurants] = useState([]);
  const [currentRestaurant, setCurrentRestaurant] = useState(-1);

  const restaurantsMock = [
    { id: 1, name: "Pizza Palace", icon: "🍕" },
    { id: 2, name: "Burger House", icon: "🍔" },
    { id: 3, name: "Sushi World", icon: "🍣" },
  ];

  const chooseRestaurantById = async (restaurantId)=>{
    try{
      const found = restaurants.find((resto)=>resto.id===restaurantId);
      if(found)
        setCurrentRestaurant(found);

    } catch(err){
      console.log(err);
    }
  }

  // Fetch restaurants from API
  const fetchRestaurants = async () => {
    try {
    //   if (typeof window == "undefined") {
    //     console.log("Application fetch restnis on server side");
    // } else {
    //     alert("Application fetch rest is on client side");
    // }
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+"/api/restaurants",{withCredentials:true});
      console.log(response)
      setRestaurants(response.data || []);
      // setRestaurants(restaurantsMock);
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
    }
  };


  // Function to add a new restaurant
  const addRestaurant = async (newRestaurant) => {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/api/restaurants", newRestaurant,{withCredentials:true});
      console.log(response)
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
    <RestaurantContext.Provider value={{ restaurants, addRestaurant,currentRestaurant,setCurrentRestaurant,chooseRestaurantById }}>
      {children}
    </RestaurantContext.Provider>
  );
}
