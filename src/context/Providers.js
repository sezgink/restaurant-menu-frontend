'use client';

import { RestaurantProvider } from './RestaurantContext.js';
import { AuthProvider } from './AuthContext.js';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <RestaurantProvider>
          {children}
      </RestaurantProvider>
    </AuthProvider>

  );
}