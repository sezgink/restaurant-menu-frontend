"use client"; // Mark this component as a Client Component

import Layout from "@/components/Layout";
import { useState,useEffect,useContext } from "react";
import CategoryProductForm from "@/components/CategoryProductForm";
import { RestaurantContext } from "@/context/RestaurantContext";
import axios from "axios";

export default function CategoryProductsPage({params}) {
  const [products, setProducts] = useState([]); // Fetch from API
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { currentRestaurant,setCurrentRestaurant} = useContext(RestaurantContext);

  const { id } = params; // Get the restaurant ID from the URL


  const handleCreateProduct = async (newProduct) => {
    //restaurants/:restaurantId/categories
    console.log(currentRestaurant)
    // newCategory = {category_name:"fuck",description:"fuck"}
    // console.log(newProduct)
    newProduct.append("category_id",id);
    try{
    const response = await axios.post('http://localhost:3000/api/restaurants/'+currentRestaurant.id+'/products',newProduct,{withCredentials:true,headers: {
      'Content-Type': 'application/json', // Sending JSON data
    }});
    console.log(response);
    

    // setCategories(fetchedCategories || []);
    setShowCreateForm(false);
    fetchCategoryProducts();
    } catch(err){
      console.log(err)
    }
  };

  const fetchCategoryProducts = async ()=>{
    try {
      //   if (typeof window == "undefined") {
      //     console.log("Application fetch restnis on server side");
      // } else {
      //     alert("Application fetch rest is on client side");
      // }
      console.log(currentRestaurant)
      const response = await axios.get('http://localhost:3000/api/restaurants/'+currentRestaurant.id+'/products/categories/'+id,{withCredentials:true});
      console.log(response);
      const fetchedProducts = response.data;
        setProducts(fetchedProducts || []);
        // setRestaurants(restaurantsMock);
      } catch (error) {
        console.error("Failed to fetch category products:", error);
      }

  }

  useEffect(()=>{
    fetchCategoryProducts();
  },[])
  useEffect(()=>{
    fetchCategoryProducts();
  },[currentRestaurant,id])
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex flex-col items-center py-12 px-4">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Selected Category Products</h2>

        {/* Categories Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full max-w-7xl">
            {products.map((product) => (
              <div key={product.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                <img
                  // src={category.image}
                  src={'http://localhost:3000/uploads/' +product.product_pic}
                  alt={product.name}
                  className="w-40 h-40 object-cover mb-4 rounded-md shadow-md"
                  // className="w-40 h-40 object-cover mb-4 rounded-full shadow-md"
                />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{product.product_name}</h3>
                <p className="text-gray-600 text-center">{product.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-600 mb-8 text-center">No produts available on this category. Please create one.</p>
        )}

        {/* Create Category Button */}
        {!showCreateForm && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200"
          >
            Create Category
          </button>
        )}

        {/* Create Category Form */}
        {showCreateForm && (
          <div className="w-full max-w-2xl mt-8 bg-white shadow-lg rounded-lg p-6">
            <CategoryProductForm onCreate={handleCreateProduct} />
          </div>
        )}
      </div>
    </Layout>
  );
}
