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
      const storedUser = localStorage.getItem('userId') || '';
      const storedEmail = localStorage.getItem('email') || '';
      const storedAuthorized = localStorage.getItem('authorized') === 'true';
      if(storedAuthorized){
        setUser({userId:storedUser,email:storedEmail});
        setAuthorized(true)
      } else {
        setAuthorized(false)
      }
      
    } catch (error) {
      console.error("Failed load auth data:", error);
    }
  };

  const loggedIn = async (userId,email) => {
    try {
      // const response = await axios.get("/api/restaurants");
      // setRestaurants(response.data);
      localStorage.setItem('userId',userId)
      localStorage.setItem('email',email)
      localStorage.setItem('authorized',true)
      setUser({userId,email});
      setAuthorized(true);
    } catch (error) {
      console.error("Failed set auth data:", error);
    }
  };
  useEffect(() => {
    fetchState(); // Fetch restaurants on mount
  }, []);


  // const contextValue = { restaurants, addRestaurant };

  return (

    <AuthContext.Provider value={{ user,authorized,loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
