'use client';

import { RestaurantProvider } from './RestaurantContext.js';

export function Providers({ children }) {
  return (

    <RestaurantProvider>
        {children}
    </RestaurantProvider>

  );
}