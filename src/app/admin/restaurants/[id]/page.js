// src/app/admin/restaurants/[id]/page.js
import Layout from '../../../../components/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RestaurantDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch restaurant details from the API using the restaurant ID
      axios.get(`/api/restaurants/${id}`).then((res) => {
        setRestaurant(res.data);
      });
    }
  }, [id]);

  if (!restaurant) {
    return <p>Loading...</p>; // Show loading while the restaurant details are being fetched
  }

  return (
    <Layout>
      <h2>{restaurant.name}</h2>
      <p>Manage categories and products here</p>
      {/* Here you can add logic to navigate between categories and products */}
    </Layout>
  );
}
