import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HotelListingContextProvider } from '@context/hotelListingContext/HotelListingContextProvider';
import HotelListingView from '@components/views/hotelListingView/HotelListingView';
import AppLayout from '@components/layout/AppLayout';

// Create a client
const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <HotelListingContextProvider>
        <AppLayout>
          <HotelListingView />
        </AppLayout>
      </HotelListingContextProvider>
    </QueryClientProvider>
  );
}

export default App;
