"use client"; // Mark this component as a Client Component

import Layout from "@/components/Layout";
import { useState,useEffect,useContext } from "react";
import CategoryProductForm from "@/components/CategoryProductForm";
import { RestaurantContext } from "@/context/RestaurantContext";
import axios from "axios";
import FoodItem from "@/components/FoodItem";
import CategoryProductEditForm from "@/components/CategoryProductEditForm";

export default function CategoryProductsPage({params}) {
  const [products, setProducts] = useState([]); // Fetch from API
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState({state:false,product:{}});

  const { currentRestaurant,setCurrentRestaurant,chooseRestaurantById} = useContext(RestaurantContext);

  const { categoryId,restaurantId } = params; // Get the restaurant ID from the URL


  const openProductEdit = async (product) =>{
    // showEditForm.product = product;
    // setShowEditForm(true);
    setShowEditForm({state:true,product})

  }
  const handleCreateProduct = async (newProduct) => {
    //restaurants/:restaurantId/categories
    console.log(currentRestaurant)
    // newCategory = {category_name:"fuck",description:"fuck"}
    // console.log(newProduct)
    newProduct.append("category_id",categoryId);
    try{
    // const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+currentRestaurant.id+'/products',newProduct,{withCredentials:true,headers: {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+restaurantId+'/products',newProduct,{withCredentials:true,headers: {
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

  const handleEditProduct = async (newProduct) => {
    //restaurants/:restaurantId/categories
    console.log(currentRestaurant)
    // newCategory = {category_name:"fuck",description:"fuck"}
    // console.log(newProduct)
    newProduct.append("category_id",categoryId);
    try{
    // const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+currentRestaurant.id+'/products',newProduct,{withCredentials:true,headers: {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+restaurantId+'/products',newProduct,{withCredentials:true,headers: {
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
      chooseRestaurantById(restaurantId)
      // setCurrentRestaurant(restaurantId)
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+restaurantId+'/products/categories/'+categoryId,{withCredentials:true});
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
  },[restaurantId,categoryId])
  // },[currentRestaurant,id])
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex flex-col items-center py-12 px-4">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Selected Category Products</h2>

        {/* Categories Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full max-w-7xl">
            {products.map((product) => (
              <FoodItem product={product} key={product.id} openProductEdit={openProductEdit}></FoodItem>
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

        {/* Create Product Form */}
        {showCreateForm && (
          <div className="w-full max-w-2xl mt-8 bg-white shadow-lg rounded-lg p-6">
            <CategoryProductForm onCreate={handleCreateProduct} />
          </div>
        )}

        {/* Edit Product Form */}
        {showEditForm.state && (
          <div className="w-full max-w-2xl mt-8 bg-white shadow-lg rounded-lg p-6">
            <CategoryProductEditForm onEdit={handleEditProduct} product={showEditForm.product} />
          </div>
        )}
      </div>
    </Layout>
  );
}
