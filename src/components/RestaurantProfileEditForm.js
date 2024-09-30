"use client"; // Mark this component as a Client Component

import { useForm } from "react-hook-form";
import { useState,useEffect } from "react";
import axios from "axios";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { SwatchesPicker } from 'react-color';



export default function RestaurantProfileEditForm ({ onEdit,restaurant,beginColor,cancelCreateForm }) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [imageName, setImageName] = useState(null); // Store the image name after upload
  const [uploadState, setUploadState] = useState(null); // Manage upload state
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
  const [colorEditMode,setColorEditMode] = useState(false);
  const [currentColor,setCurrentColor] = useState("#ffffff")



  // Handle main form submission
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("key_color", currentColor);

    if(imageName!==""&&imageName!=null&&imageName!==undefined){
      formData.append("profile_pic", imageName); // Add the image name to the form data
    }

    onEdit(formData); // Send form data to the onCreate handler
  };

  useEffect(()=>{
    setValue("name",restaurant.name);
    setValue("description",restaurant.description);
    
    setValue("profile_pic",restaurant.profile_pic);
    setCurrentColor(beginColor)
  },[restaurant]);

  useEffect(()=>{    
    setCurrentColor(beginColor)
  },[beginColor])

  const handleColorChangeComplete = (color)=>{
    console.log(color)
    setCurrentColor(color.hex)
    setColorEditMode(false)
  }

  // Handle image upload with axios
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(null)
      setUploadState("Uploading...");
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("file", file);

      try {
        // Use axios to upload the image
        const postConfig = {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress); // Set the upload progress percentage
          }, 
          withCredentials: true
        }; 


        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/api/uploadPic", formData,postConfig );
        // const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/api/restaurants", formData,postConfig );

        setImageName(response.data.pic_name); // Assuming the server returns the image's name
        setUploadState("Upload complete");
      } catch (error) {
        setUploadState("Upload failed");
        console.error("Image upload failed:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      {/* Category Name */}
      <div className="relative">
      <button
                // className="absolute top-0 right-0 h-16 w-16 text-gray-500 hover:text-gray-700"
                className="absolute -top-4 right-4 h-1 w-1 text-red-500 hover:text-red-700"
                onClick={() => cancelCreateForm()}
                >
                <XCircleIcon className="h-8 w-8" aria-hidden="true" />
                </button>
        <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
        <input
          name="name"
          placeholder="Enter product name"
          className={`block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.name ? "border-red-500" : ""
          } text-black bg-white`}
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      {/* Category Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">About Restaurant: </label>
        <textarea
          name="description"
          placeholder="Enter category description"
          rows="4"
          className={`block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.description ? "border-red-500" : ""
          } text-black bg-white`}
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

       {/* Pick key color */}
       <div className="flex flex-row">
        <h2 className="text-2xl font-extrabold text-left text-gray-800 mb-8">Key Color :</h2>

        {colorEditMode? <SwatchesPicker color={currentColor} onChangeComplete={handleColorChangeComplete } />
        // : <div style={{background:currentColor}} 
        : <div style={{backgroundColor:currentColor}} 
        className='w-16 h-8 object-cover mb-4 rounded-md shadow-md hover:w-20 hover:h-10'
        onClick={()=>setColorEditMode(true)}></div>
        
        }
        </div>

     

      {/* Image Upload Form */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
        <input
          type="file"
          name="image"
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black bg-white"
          onChange={handleImageUpload}
        />
        {/* Show Upload State */}
        {uploadState && (
          <p className={`mt-2 text-sm ${uploadState === "Upload failed" ? "text-red-500" : "text-green-500"}`}>
            {uploadState}
          </p>
        )}
        {/* Show Upload Progress */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <p className="text-sm text-gray-500">Uploading... {uploadProgress}%</p>
        )}
      </div>

      {/* Main Form Submission is only enabled if the image is uploaded */}
      {imageName && (
        <>
          <p className="text-green-500">Image uploaded successfully</p>
        </>
      )}
      {/* Submit Button */}
      <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200"
          >
            Update Restaurant
          </button>
    </form>
  );
}
