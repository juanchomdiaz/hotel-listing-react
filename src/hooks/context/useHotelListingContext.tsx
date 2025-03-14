import { useContext } from 'react';
import { HotelListingContext, HotelListingContextData } from '@context/hotelListingContext/HotelListingContextProvider';


/**
 * Custom hook to access the HotelListingContext
 * @returns The hotel listing context value
 * @throws Error if used outside of a HotelListingProvider
 */
export const useHotelListingContext = (): HotelListingContextData => {
    const context = useContext(HotelListingContext);

    if (typeof context === 'undefined') {
        throw new Error('useHotelListingContext must be used within a HotelListingProvider');
    }

    return context;
};
