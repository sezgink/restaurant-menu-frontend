// src/app/admin/restaurants/[id]/page.js
// src/app/admin/restaurants/[id]/page.js
"use client"; // Mark this component as a Client Component

// src/app/admin/restaurants/[id]/page.js

import { useState,useContext, useEffect } from 'react';
import Layout from '../../../../components/Layout';
import { RestaurantContext } from '@/context/RestaurantContext';
import { useForm } from 'react-hook-form';
import RestaurantProfileEditForm from '@/components/RestaurantProfileEditForm';
import axios from "axios";


export default function RestaurantProfilePage({ params }) {
  const { restaurantId } = params; // Get the restaurant ID from the URL
  const [activeTab, setActiveTab] = useState('categories'); // Default tab
  const { currentRestaurant,setCurrentRestaurant,chooseRestaurantById,updateRestaurant} = useContext(RestaurantContext);
  const [editMode,setEditMode] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const fetchRestaurant = async ()=>{
    try {
      //TODO if restaurant id null, return to homepage
      // chooseRestaurantById(restaurantId)
    
      
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

  const getKeyColor = ()=>{
    if(currentRestaurant.key_color!==null&&currentRestaurant.key_color!==undefined&&currentRestaurant.key_color!=='')
      return currentRestaurant.key_color;
    return '#327cc7';
  }
  // useEffect(()=>{
  //   setCurrentColor(currentRestaurant.key_color)
  // },[currentRestaurant]);

  const toggleEditMode = (newState)=>{
    // setCurrentColor(getKeyColor())
    setEditMode(newState);
  }
  const styles = ()=>{
      return ({
      root: {
        display: "block"
      },
      item: {
        color: "white",
        backgroundColor : getKeyColor(),
    
        complete: {
          textDecoration: "line-through"
        },
    
        due: {
          color: "red"
        }
      }
    });
  }
  
  useEffect(()=>{
    console.log(currentRestaurant)
  },[currentRestaurant])

  const onSubmit = (data) => {
    const newProduct = {
      id: Date.now(), // Temporary ID until you integrate with the backend
      ...data,
      image: URL.createObjectURL(data.image[0]) // Temporarily render the image
    };
    setEditMode(false);
    onCreate(newProduct); // Callback to pass the new product up to the parent component
  };

  const onEdit = async (changes)=>{
    try{
      // const response = await axios.patch(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+restaurantId,changes,{withCredentials:true,headers: {
      //   'Content-Type': 'application/json', // Sending JSON data
      // }});

      await updateRestaurant(changes,restaurantId);
      // chooseRestaurantById(restaurantId)
      // console.log(response);
      
  
      // setCategories(fetchedCategories || []);
      setEditMode(false);

      //WIP fetch restaurant if needed
      // fetchRestaurant();

      } catch(err){
        console.log(err)
      }
  }

  return (
    <Layout>
      <div className="container mx-auto p-6 flex flex-col">
        {editMode ?
        <RestaurantProfileEditForm beginColor={getKeyColor()} restaurant={currentRestaurant} onEdit={onEdit} cancelCreateForm={()=>setEditMode(false)} />
         : <>
         <img
                    // src={category.image}
                    src={process.env.NEXT_PUBLIC_API_URL+'/uploads/' +currentRestaurant.profile_pic}
                    alt={currentRestaurant.name}
                    className="w-40 h-40 object-cover rounded-md shadow-md"
                    // className="w-40 h-40 object-cover rounded-md shadow-md flex-start"
                    // className="w-40 h-40 object-cover mb-4 rounded-full shadow-md"
                  />
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Restaurant Profile (ID: {restaurantId})</h2>
        <h2 className="text-2xl font-extrabold text-left text-gray-800 mb-8">Restaurant Name : {currentRestaurant.name}</h2>
        <h2 className="text-2xl font-extrabold text-left text-gray-800 mb-8">About Restaurant : {currentRestaurant.description}</h2>
        <h2 className="text-2xl font-extrabold text-left text-gray-800 mb-8">Restaurant Url : <a href={'https://sitename.com/'+currentRestaurant.restoname}> https://sitename.com/{currentRestaurant.restoname}</a> </h2>
        <div className="flex flex-row">
        {/* <h2 className="text-2xl font-extrabold text-left text-gray-800 mb-8">Key Color : {currentRestaurant.key_color}</h2> */}
        <h2 className="text-2xl font-extrabold text-left text-gray-800 mb-8">Key Color: </h2>
        <div style={styles().item} className='w-16 h-8 object-cover mb-4 rounded-md shadow-md'></div>
        

        </div>
        <button className="bg-indigo-600 w-1/4 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200"
         type="submit" onClick={()=>toggleEditMode(true)}>
          Edit Restaurant Profile
        </button>

        </>}
      


        
      </div>
    </Layout>
  );
}
