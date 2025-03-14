import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HotelListingContextProvider } from '@context/hotelListingContext/HotelListingContextProvider';
import { useHotelListingContext } from './useHotelListingContext';

// Create a custom hook wrapper for testing
const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            <HotelListingContextProvider>
                {children}
            </HotelListingContextProvider>
        </QueryClientProvider>
    );
};

describe('useHotelListingContext', () => {
    beforeEach(() => {
        // Mock fetch to return empty hotels
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => ([])
        });
    });

    test('throws error when used outside provider', () => {
        const consoleSpy = jest.spyOn(console, 'error');
        consoleSpy.mockImplementation(() => { });

        expect(() => {
            renderHook(() => useHotelListingContext());
        }).toThrow('useHotelListingContext must be used within a HotelListingProvider');

        consoleSpy.mockRestore();
    });

    test('should return the context values when used within provider', async () => {
        const { result } = renderHook(() => useHotelListingContext(), {
            wrapper: createWrapper()
        });

        expect(result.current).toHaveProperty('hotels');
        expect(result.current).toHaveProperty('isLoading');
        expect(result.current).toHaveProperty('sortOrder');
        expect(result.current).toHaveProperty('setSortOrder');
        expect(result.current).toHaveProperty('refetch');
    });


});
