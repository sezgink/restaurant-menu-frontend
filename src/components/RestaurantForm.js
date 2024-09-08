// src/components/RestaurantForm.js

import { useForm } from "react-hook-form";

export default function RestaurantForm({ onCreate }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    onCreate({
      name: data.name,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
      {/* Restaurant Name Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
        <input
          type="text"
          placeholder="Enter restaurant name"
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          {...register('name', { required: 'Restaurant name is required' })}
        />
        {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Create Restaurant
        </button>
      </div>
    </form>
  );
}
