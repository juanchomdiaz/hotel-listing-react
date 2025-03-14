import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HotelListingContextProvider } from '@context/hotelListingContext/HotelListingContextProvider';
import HotelListing from '@components/widgets/hotelListing/HotelListing';
import AppLayout from '@components/layout/AppLayout';

// Create a client
const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <HotelListingContextProvider>
        <AppLayout>
          <HotelListing />
        </AppLayout>
      </HotelListingContextProvider>
    </QueryClientProvider>
  );
}

export default App;
