import { useForm } from "react-hook-form";

export default function CategoryForm({ onCreate }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onCreate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
  {/* Category Name */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
    <input
      name="name"
      placeholder="Enter category name"
      className={`block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        errors.name ? "border-red-500" : ""
      } text-black bg-white`} // Explicitly define text and background color
      {...register("name", { required: "Name is required" })}
    />
    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
  </div>

  {/* Category Description */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Category Description</label>
    <textarea
      name="description"
      placeholder="Enter category description"
      rows="4"
      className={`block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        errors.description ? "border-red-500" : ""
      } text-black bg-white`} // Explicitly define text and background color
      {...register("description", { required: "Description is required" })}
    />
    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
  </div>

  {/* Category Image */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
    <input
      name="image"
      type="file"
      className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black bg-white" // Explicitly define text and background color
      {...register("image")}
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200"
  >
    Create Category
  </button>
</form>

  );
}
