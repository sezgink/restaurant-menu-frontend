"use client"; // Mark this component as a Client Component

import Layout from "@/components/Layout";
import { useState,useEffect,useContext } from "react";
import CategoryProductForm from "@/components/CategoryProductForm";
import { RestaurantContext } from "@/context/RestaurantContext";
import axios from "axios";
import FoodItem from "@/components/FoodItem";
import CategoryProductEditForm from "@/components/CategoryProductEditForm";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import SubtitleItem from "@/components/SubtitleItem";
import SubcategoryCreateForm from "@/components/SubcategoryCreateForm";
import SubcategoryEditForm from "@/components/SubcategoryEditForm";

export default function CategoryProductsPage({params}) {
  const [products, setProducts] = useState([]); // Fetch from API
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSubcategoryCreateForm, setShowSubcategoryCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState({state:false,product:{}});
  const [showSubEditForm, setShowSubEditForm] = useState({state:false,product:{}});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState({
    state: false,
    product: null,
  });
  const [showSubDeleteConfirmation, setShowSubDeleteConfirmation] = useState({
    state: false,
    product: null,
  });

  const { currentRestaurant,setCurrentRestaurant,chooseRestaurantById} = useContext(RestaurantContext);

  const { categoryId,restaurantId } = params; // Get the restaurant ID from the URL


  function handleOnDragEnd(result) {
    if (!result.destination) return;
  
    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
  
    setProducts(items);
  
    // Send the new order to the backend
    // const newOrder = items.map((product) => product.id);
    const productsToOrder= []
    const subtitlesToOrder=[]
    const newOrder = items.map((product,index) => {
      if(product.listType===0){
        productsToOrder.push({'productId':product.id,'row_order':index})
      } else {
        subtitlesToOrder.push({'subcategoryId':product.id,'row_order':index})

      }
    });
    // updateProductOrder(newOrder);
    updateProductOrder(productsToOrder,subtitlesToOrder);
  }
  async function updateProductOrder(products,subtitles) {
    try {
      await axios.patch(
        // `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants/${restaurantId}/products/reorder`,
        `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants/${restaurantId}/reorder/products`,
        products,
        { withCredentials: true }
      );

      await axios.patch(
        // `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants/${restaurantId}/subcategories/reorder`,
        `${process.env.NEXT_PUBLIC_API_URL}/api/reorder/subcategories`,
        subtitles,
        { withCredentials: true }
      );
  
      // Optionally, fetch the products again to ensure the order is correct
      fetchCategoryProducts();
    } catch (err) {
      console.error('Failed to update product order:', err);
    }
  }
  // async function updateProductOrder(newOrder) {
  //   try {
  //     await axios.patch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants/${restaurantId}/products/order`,
  //       {
  //         products: newOrder,
  //       },
  //       { withCredentials: true }
  //     );
  
  //     // Optionally, fetch the products again to ensure the order is correct
  //     fetchCategoryProducts();
  //   } catch (err) {
  //     console.error('Failed to update product order:', err);
  //   }
  // }
    
  const openProductEdit = async (product) =>{
    // showEditForm.product = product;
    // setShowEditForm(true);
    setShowEditForm({state:true,product})

  }
  const openSubEdit = async (product) =>{
    // showEditForm.product = product;
    // setShowEditForm(true);
    setShowSubEditForm({state:true,product})

  }

  const handleCreateProduct = async (newProduct) => {
    //restaurants/:restaurantId/categories
    console.log(currentRestaurant)
    // newCategory = {category_name:"fuck",description:"fuck"}
    // console.log(newProduct)
    newProduct.append("category_id",categoryId);

    newProduct.append("row_order", products.length);
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

  const handleCreateSubtitle = async (newProduct) => {
    //restaurants/:restaurantId/categories
    // console.log(currentRestaurant)
    newProduct.append("row_order", products.length);
    // newCategory = {category_name:"fuck",description:"fuck"}
    // console.log(newProduct)

    // newProduct.append("category_id",categoryId);
    try{
    // const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+currentRestaurant.id+'/products',newProduct,{withCredentials:true,headers: {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+restaurantId+'/subcategories/categories/'+categoryId,newProduct,{withCredentials:true,headers: {
      'Content-Type': 'application/json', // Sending JSON data
    }});
    console.log(response);
    

    // setCategories(fetchedCategories || []);
    setShowCreateForm(false);
    setShowSubcategoryCreateForm(false);

    fetchCategoryProducts();
    } catch(err){
      console.log(err)
    }
  };

  const cancelForm = ()=>{
    setShowCreateForm(false);
    setShowSubcategoryCreateForm(false)
    setShowEditForm({state:false,product:null})
  }

  const handleEditProduct = async (productChanges) => {
    //restaurants/:restaurantId/categories
    console.log(currentRestaurant)
    // newCategory = {category_name:"fuck",description:"fuck"}
    // console.log(newProduct)
    
    // productChanges.append("category_id",categoryId);
    // productChanges.append("category_id",categoryId);

    try{
    // const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+currentRestaurant.id+'/products',newProduct,{withCredentials:true,headers: {
    const response = await axios.patch(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+restaurantId+'/products/'+showEditForm.product.id,productChanges,{withCredentials:true,headers: {
      'Content-Type': 'application/json', // Sending JSON data
    }});
    console.log(response);
    

    // setCategories(fetchedCategories || []);
    setShowEditForm({state:false,product:null});
    fetchCategoryProducts();
    } catch(err){
      console.log(err)
    }
  };

  const handleEditSub = async (productChanges) => {
    //restaurants/:restaurantId/categories
    console.log(currentRestaurant)
    // newCategory = {category_name:"fuck",description:"fuck"}
    // console.log(newProduct)
    
    // productChanges.append("category_id",categoryId);
    // productChanges.append("category_id",categoryId);

    try{
    // const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+currentRestaurant.id+'/products',newProduct,{withCredentials:true,headers: {
    // const response = await axios.patch(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+restaurantId+'/products/'+showEditForm.product.id,productChanges,{withCredentials:true,headers: {
    const response = await axios.patch(process.env.NEXT_PUBLIC_API_URL+'/api/subcategories/'+showSubEditForm.product.id,productChanges,{withCredentials:true,headers: {
      'Content-Type': 'application/json', // Sending JSON data
    }});
    console.log(response);
    

    // setCategories(fetchedCategories || []);
    setShowSubEditForm({state:false,product:null});
    fetchCategoryProducts();
    } catch(err){
      console.log(err)
    }
  };

  const handleDeleteProduct = async (product_id) => {
    try{
    // const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+currentRestaurant.id+'/products',newProduct,{withCredentials:true,headers: {
    const response = await axios.delete(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+restaurantId+'/products/'+product_id,{withCredentials:true,headers: {
      'Content-Type': 'application/json', // Sending JSON data
    }});
    console.log(response);
    

    // setCategories(fetchedCategories || []);
    setShowDeleteConfirmation({state:false,product:null});
    fetchCategoryProducts();
    } catch(err){
      console.log(err)
    }
  };
  
  const handleDeleteSub = async (product_id) => {
    try{
    // const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+currentRestaurant.id+'/products',newProduct,{withCredentials:true,headers: {
    const response = await axios.delete(process.env.NEXT_PUBLIC_API_URL+'/api/subcategories/'+product_id,{withCredentials:true,headers: {
      'Content-Type': 'application/json', // Sending JSON data
    }});
    console.log(response);
    

    // setCategories(fetchedCategories || []);
    setShowSubDeleteConfirmation({state:false,product:null});
    fetchCategoryProducts();
    } catch(err){
      console.log(err)
    }
  };

  const showDeleteDialog = (product) => {
    setShowDeleteConfirmation({ state: true, product });
  };
  const showSubDeleteDialog = (product) => {
    setShowSubDeleteConfirmation({ state: true, product });
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
      const productResponse = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+restaurantId+'/products/categories/'+categoryId,{withCredentials:true});
      console.log(productResponse);
      const fetchedProducts = productResponse.data;
      const subResponse = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/api/restaurants/'+restaurantId+'/subcategories/categories/'+categoryId,{withCredentials:true});
      const fetchedSubs = subResponse.data;

      for (let i = 0; i < fetchedProducts.length; i++) {
        fetchedProducts[i].listType=0;
        
      }
      for (let i = 0; i < fetchedSubs.length; i++) {
        fetchedSubs[i].listType=1;
        fetchedProducts.splice(fetchedSubs[i].row_order,0,fetchedSubs[i]);
      }

      console.log(fetchedProducts)
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
          <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="products">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="grid gap-3 mb-8 w-full max-w-7x">
                {products.map((product, index) => (
                  <Draggable key={product.id.toString()} draggableId={product.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        className="product-item "
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {(product.listType===0)?                        
                        <FoodItem product={product} openProductEdit={openProductEdit} 
                        showDeleteDialog={showDeleteDialog} /> : 
                        <SubtitleItem product={product} openProductEdit={openSubEdit} 
                        showDeleteDialog={showSubDeleteDialog} />}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        
        ) : (
          <p className="text-lg text-gray-600 mb-8 text-center">No produts available on this category. Please create one.</p>
        )}

        {/* Create Category Button */}
        {!showCreateForm && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200"
          >
            Create Product
          </button>
        )}

        {/* Create Product Form */}
        {showCreateForm && (
          <div className="w-full max-w-2xl mt-8 bg-white shadow-lg rounded-lg p-6">
            <CategoryProductForm onCreate={handleCreateProduct} cancelCreateForm={cancelForm} />
          </div>
        )}

        {/* Create Category Button */}
        {!showSubcategoryCreateForm && (
          <button
            onClick={() =>{
              setShowSubcategoryCreateForm(true);
              setShowCreateForm(false);
              
            } }
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200"
          >
            Create Subtitle
          </button>
        )}

        {/* Create Product Form */}
        {showSubcategoryCreateForm && (
          <div className="w-full max-w-2xl mt-8 bg-white shadow-lg rounded-lg p-6">
            <SubcategoryCreateForm onCreate={handleCreateSubtitle} cancelCreateForm={cancelForm} />
          </div>
        )}

        {/* Edit Product Form */}
        {showEditForm.state && (
          <div className="w-full max-w-2xl mt-8 bg-white shadow-lg rounded-lg p-6">
            <CategoryProductEditForm onEdit={handleEditProduct} 
            product={showEditForm.product} cancelCreateForm={cancelForm} />
          </div>
        )}

        {/* Edit Product Form */}
        {showSubEditForm.state && (
          <div className="w-full max-w-2xl mt-8 bg-white shadow-lg rounded-lg p-6">
            <SubcategoryEditForm onEdit={handleEditSub} cancelEditForm={cancelForm} 
            category={showEditForm.product} cancelCreateForm={cancelForm} />
          </div>
        )}

         {/* Confirmation Dialog for Deleting Product */}
         {showDeleteConfirmation.state && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full transform transition-transform duration-300 scale-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                Are you sure you want to delete{" "}
                <span className="text-red-600">{showDeleteConfirmation.product.name}</span>?
              </h3>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setShowDeleteConfirmation({ state: false, product: null })}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
                >
                  No
                </button>
                <button
                  onClick={() => handleDeleteProduct(showDeleteConfirmation.product.id)}
                  className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Dialog for Deleting Product */}
        {showSubDeleteConfirmation.state && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full transform transition-transform duration-300 scale-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                Are you sure you want to delete{" "}
                <span className="text-red-600">{showSubDeleteConfirmation.product.name}</span>?
              </h3>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setShowSubDeleteConfirmation({ state: false, product: null })}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
                >
                  No
                </button>
                <button
                  onClick={() => handleDeleteSub(showSubDeleteConfirmation.product.id)}
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
