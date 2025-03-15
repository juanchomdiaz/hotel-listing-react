import React from 'react';
import { render, screen } from '@testing-library/react';
import ListingResults from './ListingResults';
import { useHotelListingContext } from '@hooks/context/useHotelListingContext';
import mockHotelsData from '../../../../../development/data/hotels.json';
import { Hotel } from '@custom-types/hotel';

// Mock the hotel context hook
jest.mock('@hooks/context/useHotelListingContext');

// Mock the ListingItem component
jest.mock('@components/widgets/listing/listingItem/ListingItem', () => {
    return {
        __esModule: true,
        default: jest.fn(({ hotel }) => (
            <div
                data-testid={`hotel-item-${hotel.id}`}
            >
                {hotel.property.title}
            </div>
        ))
    };
});

describe('ListingResults Component', () => {
    const mockHotels = mockHotelsData.results as Hotel[];
    const mockUseHotelListingContext = useHotelListingContext as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should show loading state when isLoading is true', () => {
        mockUseHotelListingContext.mockReturnValue({
            hotels: [],
            isLoading: true,
            error: null
        });

        render(<ListingResults />);
        expect(screen.getByText('Loading hotels...')).toBeVisible();
    });

    test('should show error state when there is an error', () => {
        const errorMessage = 'Failed to fetch hotels';
        mockUseHotelListingContext.mockReturnValue({
            hotels: [],
            isLoading: false,
            error: new Error(errorMessage)
        });

        render(<ListingResults />);
        expect(screen.getByText(`Error loading hotels: ${errorMessage}`)).toBeVisible();
    });

    test('should show empty state when hotels array is empty', () => {
        mockUseHotelListingContext.mockReturnValue({
            hotels: [],
            isLoading: false,
            error: null
        });

        render(<ListingResults />);
        expect(screen.getByText('No hotels found')).toBeVisible();
    });

    test('should render hotel items when hotels are available', () => {
        mockUseHotelListingContext.mockReturnValue({
            hotels: mockHotels,
            isLoading: false,
            error: null
        });

        render(<ListingResults />);

        // Check if all hotels are rendered
        mockHotels.forEach(hotel => {
            expect(screen.getByTestId(`hotel-item-${hotel.id}`)).toBeInTheDocument();
            expect(screen.getByText(hotel.property.title)).toBeInTheDocument();
        });
    });

    test('should handle null hotels data gracefully', () => {
        mockUseHotelListingContext.mockReturnValue({
            hotels: null,
            isLoading: false,
            error: null
        });

        render(<ListingResults />);
        expect(screen.getByText('No hotels found')).toBeVisible();
    });
});
