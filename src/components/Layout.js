// src/components/Layout.js

// src/components/Layout.js

import Link from "next/link";
import { useState,useContext,useEffect } from "react";

// import { Providers } from '../context/Providers.js';
import { RestaurantContext } from '../context/RestaurantContext.js';

export default function Layout({ children }) {
  // const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const [isRestaurantDropdownOpen, setIsRestaurantDropdownOpen] = useState(false);
  // const [restaurants, setRestaurants] = useState([]);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // const { restaurants, addRestaurant} = useContext(Providers);
  // const { restaurants, addRestaurant} = useContext(RestaurantContext);
  const { restaurants, currentRestaurant,setCurrentRestaurant} = useContext(RestaurantContext);
  
  const user = {
    email: "user@example.com", // Replace with actual user email data
  };

  // Mock restaurant data with icons
  const restaurantsMock = [
    { id: 1, name: "Pizza Palace", icon: "🍕" },
    { id: 2, name: "Burger House", icon: "🍔" },
    { id: 3, name: "Sushi World", icon: "🍣" },
  ];

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setRestaurants(restaurantsMock);
        return;
        const response = await axios.get("/api/restaurants"); // Replace with your API endpoint
        setRestaurants(response.data); // Assuming the response contains restaurant data
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []); // Empty dependency array ensures this runs only once

  const handleRestaurantChange = (restaurant) => {
    setCurrentRestaurant(restaurant); // Store the selected restaurant
    setIsRestaurantDropdownOpen(false); // Close the dropdown after selection
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 w-full bg-gray-800 text-white flex justify-between items-center p-4 z-50">
        {/* Left Side: App name or Logo */}
        <div className="flex items-center ml-6">
          <h2 className="text-2xl font-bold">App Name</h2>
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

      <div className="flex w-full">
        {/* Sidebar */}
        {/* <nav className="sticky top-16 w-64 bg-gray-800 text-white flex flex-col py-6 h-screen"> */}
        <nav className="sticky top-52 w-64 bg-gray-800 text-white flex flex-col py-6 h-screen">
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
        <main className="flex-1 bg-gray-100 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
