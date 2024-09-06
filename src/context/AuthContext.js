// src/context/RestaurantContext.js
'use client';

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import {isAuthenticated,Authenticate,Logout} from '@/utils/auth'

// Create Restaurant Context
// export const RestaurantContext = createContext();
export const AuthContext = createContext();

// const RestaurantContext = createContext();

// Create a provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState({userId:'',email:''});
  const [authorized, setAuthorized] = useState({isAuthorized:false});

  // Fetch restaurants from API
  const fetchState = async () => {
    try {
      // const response = await axios.get("/api/restaurants");
      // setRestaurants(response.data);
      const storedUsername = localStorage.getItem('username') || '';
      const storedAuthorized = localStorage.getItem('authorized') === 'true';
      setUser({storedUsername, });
    } catch (error) {
      console.error("Failed load auth data:", error);
    }
  };

  const loggedIn = async (username,email) => {
    try {
      // const response = await axios.get("/api/restaurants");
      // setRestaurants(response.data);
      const storedUsername = localStorage.getItem('username') || '';
      const storedAuthorized = localStorage.getItem('authorized') === 'true';
      setUser({storedUsername, });
    } catch (error) {
      console.error("Failed load auth data:", error);
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
    fetchState(); // Fetch restaurants on mount
  }, []);

  // const contextValue = { restaurants, addRestaurant };

  return (

    <AuthContext.Provider value={{ user,setUser,authorized,setAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
}
