// src/components/Layout.js

import Link from "next/link";
import { redirect } from 'next/navigation'
import { useState, useContext, useEffect } from "react";
import { RestaurantContext } from '../context/RestaurantContext.js';
import { AuthContext } from "@/context/AuthContext.js"; 
import { useRouter } from 'next/navigation';

export default function Layout({ children }) {
  const [isRestaurantDropdownOpen, setIsRestaurantDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { restaurants, addRestaurant, currentRestaurant, setCurrentRestaurant } = useContext(RestaurantContext);
  const { user,loggedOut } = useContext(AuthContext);

  const { push } = useRouter();
  

  // Mock restaurant data with icons
  const restaurantsMock = [
    { id: 1, name: "Pizza Palace", icon: "🍕" },
    { id: 2, name: "Burger House", icon: "🍔" },
    { id: 3, name: "Sushi World", icon: "🍣" },
  ];

  // useEffect(() => {
  //   const fetchRestaurants = async () => {
  //     try {
  //       setRestaurants(restaurantsMock);
  //       // Uncomment and modify the following lines if you're fetching from an API
  //       // const response = await axios.get("/api/restaurants"); // Replace with your API endpoint
  //       // setRestaurants(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch restaurants:", error);
  //     }
  //   };

  //   fetchRestaurants();
  // }, [setRestaurants]);

  const handleRestaurantChange = (restaurant) => {
    setCurrentRestaurant(restaurant); // Store the selected restaurant
    setIsRestaurantDropdownOpen(false); // Close the dropdown after selection
  };

  const handleLogout = async () => {
    // console.log("User logged out");
    loggedOut();
    setIsUserMenuOpen(false);
    // redirect('/login');
    push('/auth/login');
    
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 w-full bg-gray-800 text-white flex justify-between items-center h-16 px-6 z-50">
        {/* Left Side: App name or Logo */}
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">Menu Studio</h2>
        </div>

        {/* Right Side: Restaurant selector and User email with dropdown */}
        <div className="flex items-center space-x-6">
          {/* Restaurant Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRestaurantDropdownOpen(!isRestaurantDropdownOpen)}
              className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 flex items-center"
            >
              {currentRestaurant ? (
                <>
                  <span className="mr-2">{currentRestaurant.icon}</span>
                  {currentRestaurant.name} ▼
                </>
              ) : (
                "Select Restaurant ▼"
              )}
            </button>
            {isRestaurantDropdownOpen && (
              <ul className="absolute right-0 mt-2 bg-white text-gray-800 shadow-lg rounded-lg w-56">
                {restaurants.map((restaurant) => (
                  <li
                    key={restaurant.id}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center"
                    onClick={() => handleRestaurantChange(restaurant)}
                  >
                    <span className="mr-2">{restaurant.icon}</span>
                    {restaurant.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* User Email and Logout */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
              {user.email} ▼
            </button>
            {isUserMenuOpen && (
              <ul className="absolute right-0 mt-2 bg-white text-gray-800 shadow-lg rounded-lg w-48">
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <nav className="fixed top-16 left-0 w-64 bg-gray-800 text-white flex flex-col py-6 h-full">
        <h2 className="text-2xl font-bold mb-8 px-6 text-left">Dashboard</h2>
        <ul className="space-y-4 w-full">
          <li>
            <Link href="/admin/restaurants" className="block text-lg py-2 px-6 rounded-lg hover:bg-gray-700 text-left">
              Restaurants
            </Link>
          </li>
          <li>
            <Link href="/admin/categories" className="block text-lg py-2 px-6 rounded-lg hover:bg-gray-700 text-left">
              Categories
            </Link>
          </li>
          <li>
            <Link href="/admin/products" className="block text-lg py-2 px-6 rounded-lg hover:bg-gray-700 text-left">
              Products
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 ml-64 mt-16">
        {children}
      </main>
    </div>
  );
}
