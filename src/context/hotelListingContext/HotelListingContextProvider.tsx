import React, { createContext, useState, ReactNode, useMemo } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Hotel } from '@custom-types/hotel';
import { SortOrder } from '@custom-types/sorting';
import { GC_TIME_TEN_MINUTES, DATA_STALE_TIME_FIVE_MINUTES } from '@constants/listing';
import { API_URL } from '@constants/environment';

export interface HotelListingContextData {
  hotels: Hotel[];
  isLoading: boolean;
  error: unknown;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  refetch: () => Promise<UseQueryResult>;
}

export const HotelListingContext = createContext<HotelListingContextData | undefined>(undefined);

interface HotelListingProviderProps {
  children: ReactNode;
}

/**
 * A function to fetch hotels from the API.
 * This function is used by React Query to fetch hotels.
 * It can be placed in a service layer, but it will 
 * be placed here for simplicity.
 * 
 * @param {SortOrder} sortOrder the sort order to fetch hotels
 * @returns {Promise<Hotel[]>}
 */
const fetchHotels = async (sortOrder: SortOrder): Promise<Hotel[]> => {
  const url = new URL(API_URL);
  url.searchParams.append('sortOrder', sortOrder);
  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error('Failed to fetch hotels');
    }
    return response.json();
  }
  catch (error) {
    console.error('Failed to fetch hotels', error);
    throw error;
  }
};


/**
 * Provider component for the HotelListingContext.
 * 
 * This component fetches hotel data based on the current sort order and provides
 * the following data and functionality to its children:
 * - List of hotels
 * - Loading state
 * - Error information
 * - Current sort order
 * - Function to change the sort order
 * - Function to refetch the data (not actually needed in this case)
 * 
 * It internally uses react-query for data fetching, leveraging things like caching and
 * automatic retryings.
 * The data is refreshed when the sort order changes, and has configurable 
 * stale time and garbage collection time.
 * 
 * @param props - The component props
 * @param props.children - Child components that will have access to the context
 * @returns The provider component with the hotel listing context
 */
export const HotelListingContextProvider = ({ children }: HotelListingProviderProps): React.JSX.Element => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('price-high-to-low');

  const { data = [], isLoading, error, refetch } = useQuery<Hotel[], Error>({
    queryKey: ['hotels', sortOrder],
    queryFn: () => fetchHotels(sortOrder),
    staleTime: DATA_STALE_TIME_FIVE_MINUTES,
    refetchOnWindowFocus: false,
    gcTime: GC_TIME_TEN_MINUTES,
  });

  const contextValue: HotelListingContextData = useMemo(() => ({
    hotels: data,
    isLoading,
    error,
    sortOrder,
    setSortOrder,
    refetch,
  }), [data, isLoading, error, sortOrder, refetch]);

  return (
    <HotelListingContext.Provider value={contextValue}>
      {children}
    </HotelListingContext.Provider>
  );
};
