// src/app/page.js
"use client"; // Mark this component as a Client Component

import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page when accessing the home route
    router.push('/auth/login');
  }, [router]);

  return null; // Since we're redirecting, no need to return any JSX
}
