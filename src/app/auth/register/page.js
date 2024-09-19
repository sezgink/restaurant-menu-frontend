"use client"; // Mark this component as a Client Component

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router
import Link from 'next/link'; // Import Link for navigation

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      // Send registration data to the API
      const res = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/register', data);
      router.push('/auth/login'); // Redirect to the login page after successful registration
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Email"
              className={`mt-1 block w-full px-3 py-2 border bg-white text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('email', { required: 'Email is required' })}
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
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          {/* Password Again Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password Repetition</label>
            <input
              type="password"
              placeholder="Password Repetition"
              className={`mt-1 block w-full px-3 py-2 border bg-white text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('passwordRepeat', { required: 'Password repetition is required' })}
            />
            {errors.passwordRepeat && <p className="mt-2 text-sm text-red-600">{errors.passwordRepeat.message}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>

        {/* Login Link for existing users */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}