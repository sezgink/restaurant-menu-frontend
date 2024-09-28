"use client"; // Mark this component as a Client Component

import Layout from "../../../../../components/Layout";
import { useState,useEffect,useContext } from "react";
import CategoryForm from "../../../../../components/CategoryForm";
import { RestaurantContext } from "@/context/RestaurantContext";
import axios from "axios";
import Link from "next/link";
import CategoryItem from "@/components/CategoryItem";
import CategoryEditForm from "@/components/CategoryEditForm";
import { set } from "react-hook-form";

export default function CategoriesPage({params}) {
  const [categories, setCategories] = useState([]); // Fetch from API
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState({state:false,category:{}});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState({
    state: false,
    category: null,
  });

  const { currentRestaurant,setCurrentRestaurant,chooseRestaurantById} = useContext(RestaurantContext);
  const { restaurantId } = params; // Get the restaurant ID from the URL


  const openCategoryEdit = async (category) =>{
    // showEditForm.product = product;
    // setShowEditForm(true);
    setShowEditForm({state:true,category})
    setShowCreateForm(false);

  }
  const handleCreateCategory = async (newCategory) => {
    //restaurants/:restaurantId/categories
    console.log(currentRestaurant)
    // newCategory = {category_name:"fuck",description:"fuck"}
    console.log(newCategory)
    try{
    // const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+currentRestaurant.id+'/categories',newCategory,{withCredentials:true,headers: {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+restaurantId+'/categories',newCategory,{withCredentials:true,headers: {
      'Content-Type': 'application/json', // Sending JSON data
    }});
    console.log(response);
    

    // setCategories(fetchedCategories || []);
    setShowCreateForm(false);
    fetchCategories();
    } catch(err){
      console.log(err)
    }
  };

  const handleEditCategory= async (categoryChanges) => {

    try{
    // const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+currentRestaurant.id+'/products',newProduct,{withCredentials:true,headers: {
    const response = await axios.patch(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+restaurantId+'/categories/'+showEditForm.category.id,categoryChanges,{withCredentials:true,headers: {
      'Content-Type': 'application/json', // Sending JSON data
    }});
    console.log(response);
    

    // setCategories(fetchedCategories || []);
    setShowEditForm({state:false,category:null});
    fetchCategories();
    } catch(err){
      console.log(err)
    }
  };

  const handleDeleteCategory = async (category_id) => {
    try{
    // const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+currentRestaurant.id+'/products',newProduct,{withCredentials:true,headers: {
    const response = await axios.delete(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+restaurantId+'/categories/'+category_id,{withCredentials:true,headers: {
      'Content-Type': 'application/json', // Sending JSON data
    }});
    console.log(response);
    

    // setCategories(fetchedCategories || []);
    setShowDeleteConfirmation({state:false,category:null});
    fetchCategories();
    } catch(err){
      console.log(err)
    }
  };

  const showDeleteDialog = (category) => {
    setShowDeleteConfirmation({ state: true, category });
  };

  const cancelEditForm = () => {
    setShowEditForm({state:false,category:null})
  }
  const cancelCreateForm = () => {
    setShowCreateForm(false)
  }

  const fetchCategories = async ()=>{
    try {
      chooseRestaurantById(restaurantId)
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+restaurantId+'/categories',{withCredentials:true});
      console.log(response);
      const fetchedCategories = response.data.filter(
        (category) => category.category_name.trim().toLowerCase() !== "uncategorized" );
        setCategories(fetchedCategories || []);
        // setRestaurants(restaurantsMock);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }

  }

  // useEffect(()=>{
  //   fetchCategories();
  // },[])
  useEffect(()=>{
    fetchCategories();
  },[restaurantId])
  // },[restaurantId,currentRestaurant])
  // },[currentRestaurant])
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex flex-col items-center py-12 px-4">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Categories</h2>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full max-w-7xl">
            {categories.map((category) => (
              // <div key={category.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
              //   <Link href={`/admin/restaurants/${restaurantId}/categories/${category.id}`}>
              //   {/* <Link href={`/admin/categories/${category.id}`}> */}
              //   <img
              //     // src={category.image}
              //     src={process.env.NEXT_PUBLIC_API_URL+'/uploads/' +category.category_pic}
              //     alt={category.name}
              //     className="w-40 h-40 object-cover mb-4 rounded-md shadow-md"
              //     // className="w-40 h-40 object-cover mb-4 rounded-full shadow-md"
              //   />
              //   <h3 className="text-2xl font-bold text-gray-800 mb-2">{category.category_name}</h3>
              //   <p className="text-gray-600 text-center">{category.description}</p>
              //   </Link>
              // </div>
              <CategoryItem key={category.id} 
              category={category} 
              openCategoryEdit={openCategoryEdit} showDeleteDialog={showDeleteDialog}
              href={`/admin/restaurants/${restaurantId}/categories/${category.id}`} />
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-600 mb-8 text-center">No categories available. Please create one.</p>
        )}

        {/* Create Category Button */}
        {!showCreateForm && (
          <button
            onClick={() => {setShowCreateForm(true);
              setShowEditForm(false,null);
            }}
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200"
          >
            Create Category
          </button>
        )}

        {/* Create Category Form */}
        {showCreateForm && (
          <div className="w-full max-w-2xl mt-8 bg-white shadow-lg rounded-lg p-6">
            <CategoryForm onCreate={handleCreateCategory} cancelCreateForm={cancelCreateForm} />
          </div>
        )}

        {/* Edit Category Form */}
        {showEditForm.state && (
          <div className="w-full max-w-2xl mt-8 bg-white shadow-lg rounded-lg p-6">
            <CategoryEditForm onEdit={handleEditCategory} category={showEditForm.category} 
            cancelEditForm={cancelEditForm} />
          </div>
        )}

        {/* Confirmation Dialog for Deleting Product */}
        {showDeleteConfirmation.state && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full transform transition-transform duration-300 scale-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                Are you sure you want to delete{" "}
                <span className="text-red-600">{showDeleteConfirmation.category.name}</span>?
              </h3>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setShowDeleteConfirmation({ state: false, category: null })}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
                >
                  No
                </button>
                <button
                  onClick={() => handleDeleteCategory(showDeleteConfirmation.category.id)}
                  className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}
