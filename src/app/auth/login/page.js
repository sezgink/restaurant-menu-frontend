"use client"; // Mark this component as a Client Component

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import Link from "next/link"; // Import Link for navigation
import 'dotenv/config'

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      // Handle login logic (e.g., send login data to API)
      const res = await axios.post("http://localhost:3000/api/login", data);
      console.log(res) // For debug
      router.push("/admin/restaurants"); // Redirect to the admin page after successful login
      // router.push("/admin/restaurants"); // Redirect to the admin page after successful login
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Login</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Email"
              className={`mt-1 block w-full px-3 py-2 border bg-white text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register('email', { required: "Email is required" })}
            />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password"
              className={`mt-1 block w-full px-3 py-2 border bg-white text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register('password', { required: "Password is required" })}
            />
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
