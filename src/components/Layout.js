// src/components/Layout.js

import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { RestaurantContext } from '../context/RestaurantContext.js';
import { AuthContext } from "@/context/AuthContext.js"; 
import { useRouter,useParams } from 'next/navigation';
import { redirect,usePathname } from 'next/navigation'
import LeftSidebar from "./LeftSidebar.js";



export default function Layout({ children }) {
  const [isRestaurantDropdownOpen, setIsRestaurantDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { restaurants, addRestaurant, currentRestaurant, setCurrentRestaurant,chooseRestaurantById } = useContext(RestaurantContext);
  const { user,loggedOut } = useContext(AuthContext);

  const { push } = useRouter();
  const {restaurantId} = useParams();
  const pathname = usePathname();
  // const {restaurantId} = query ||{};

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

  // useEffect(()=>{
  //   if(restaurantId!==undefined&&restaurantId!==null&&restaurantId!==""){
  //     console.log({"CurrentRest":currentRestaurant})
  //     if(currentRestaurant===null||currentRestaurant===undefined||currentRestaurant===-1){
  //       console.log({"restaurantsAre":restaurants});
  //       if(restaurants!==null){
  //         setCurrentRestaurant(restaurantId)
  //         // restaurants.forEach(restaurant => {
  //         //   if(restaurant.id==restaurantId){
  //         //     setCurrentRestaurant(restaurant);
  //         //   }
  //         // });
  //       }
  //     }
  //   } else 
  //   console.log("Restoran id undefined")
  // },[]);
  useEffect(()=>{console.log("Restochange");
    console.log(currentRestaurant)
  },[currentRestaurant]);

  useEffect(()=>{
    // console.log("Layout can read params:"+restaurantId)
    if(currentRestaurant===-1){
      console.log("Lets go")
      chooseRestaurantById(restaurantId);

    }

  },[restaurantId])

  const handleRestaurantChange = (restaurant) => {
    
    setCurrentRestaurant(restaurant); // Store the selected restaurant
    setIsRestaurantDropdownOpen(false); // Close the dropdown after selection
    if(restaurantId!==null&&restaurantId!==undefined){
      const newPath=pathname.replace('restaurants/'+restaurantId,'restaurants/'+restaurant.id);
      push(newPath);
    }
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
      <header className="fixed top-0 left-0 w-full bg-gray-900 text-white flex justify-between items-center h-16 px-6 z-50 ">
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
      <LeftSidebar restaurantId={restaurantId} currentRestaurant={currentRestaurant}/>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 ml-64 mt-16">
        {children}
      </main>
    </div>
  );
}
