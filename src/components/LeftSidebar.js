
import Link from "next/link";

export default function leftSidebar({currentRestaurant,restaurantId}){
    return(
    <nav className="fixed top-16 left-0 w-64 bg-gray-800 text-white flex flex-col py-6 h-full">
        <h2 className="text-2xl font-bold mb-8 px-6 text-left">Dashboard</h2>
        <ul className="space-y-4 w-full">
          <li>
            <Link href="/admin/restaurants" className="block text-lg py-2 px-6 rounded-lg hover:bg-gray-700 text-left">
              Restaurants
            </Link>
          </li>
          <li>
            <Link href={"/admin/restaurants/"+restaurantId} className="block text-lg py-2 px-6 rounded-lg hover:bg-gray-700 text-left">
              My Restaurant
            </Link>
          </li>
          <li>
            <Link href={"/admin/restaurants/"+(restaurantId?restaurantId:currentRestaurant.id)+"/categories"} className="block text-lg py-2 px-6 rounded-lg hover:bg-gray-700 text-left">
            {/* <Link href={"/admin/restaurants/"+currentRestaurant.id+"/categories"} className="block text-lg py-2 px-6 rounded-lg hover:bg-gray-700 text-left"> */}
              Categories
            </Link>
          </li>
          
        </ul>
      </nav>);
}