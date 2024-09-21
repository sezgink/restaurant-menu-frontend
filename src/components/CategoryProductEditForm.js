"use client"; // Mark this component as a Client Component

import { useForm } from "react-hook-form";
import { useState,useEffect } from "react";
import axios from "axios";



export default function CategoryProductEditForm({ onEdit,product }) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [imageName, setImageName] = useState(null); // Store the image name after upload
  const [uploadState, setUploadState] = useState(null); // Manage upload state
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
  const [isDumping, setIsDumping] = useState(false);
  const [oldPrice, setOldPrice] = useState(0);

  // Handle main form submission
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    if(isDumping){
      formData.append("old_price", oldPrice);
      formData.append("is_dumping", 1);
    }else {
      formData.append("is_dumping", 0);
    }
    console.log(formData)

    if(imageName!==""&&imageName!=null&&imageName!==undefined){
      formData.append("product_pic", imageName); // Add the image name to the form data
    }

    onEdit(formData); // Send form data to the onCreate handler
  };

  useEffect(()=>{
    setValue("name",product.name);
    setValue("description",product.description);
    setValue("price",product.price);
    setValue("product_pic",product.product_pic);
    setIsDumping(product.is_dumping===1);
    setOldPrice(product.old_price);
    if(isDumping){
      
      // setTimeout(()=>{setValue("old_price",product.old_price)},1000);
      // setValue("old_price",product.old_price);
    }
  },[product]);

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
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
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

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Price</label>
        <textarea
          name="price"
          placeholder="Enter price"
          rows="4"
          className={`block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.description ? "border-red-500" : ""
          } text-black bg-white`}
          {...register("price", { required: "Price is required" })}
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
      </div>

      {/* Is Dumping Checkbox */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1">Is Dumping</label>
        <input type="checkbox" className="ml-30vw p-3 border border-gray-300 rounded-md" name="is_dumping" checked={isDumping} onChange={()=>{setIsDumping((isDumping)=>!isDumping)}}
        // <input type="checkbox" className="ml-30vw p-3 border border-gray-300 rounded-md" name="is_dumping" {...register("is_dumping", { required: "Price is required" })}
        ></input>
        {/* <textarea
          name="price"
          placeholder="Enter price"
          rows="4"
          className={`block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.description ? "border-red-500" : ""
          } text-black bg-white`}
          {...register("price", { required: "Price is required" })}
        /> */}
        {errors.is_dumping && <p className="text-red-500 text-sm mt-1">{errors.is_dumping.message}</p>}
      </div>

      {/* Old Price */}
      {(isDumping===true) && (<div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Old Price</label>
        <input
          name="old_price"
          placeholder="Enter old price"
          className={`block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.description ? "border-red-500" : ""
          } text-black bg-white`}
          value={oldPrice}
          onChange={e=>setOldPrice(e.target.value)}
          // {...register("old_price")}
        />
        {errors.old_price && <p className="text-red-500 text-sm mt-1">{errors.old_price.message}</p>}
      </div>)}

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
            Edit Product
          </button>
    </form>
  );
}
