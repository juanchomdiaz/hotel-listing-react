import React from 'react';
import { render, screen } from '@testing-library/react';
import ListingItem from './ListingItem';
import { Hotel } from '@custom-types/hotel';
import mockHotelsData from '../../../../../development/data/hotels.json';

jest.mock('@components/widgets/listing/listingItemRating/ListingItemRating', () => {
    return {
        __esModule: true,
        default: jest.fn(() => <div data-testid="mocked-rating" />)
    };
});

describe('ListingItem Component', () => {
    const mockHotel: Hotel = mockHotelsData.results[0];

    test('should render the hotel title correctly', () => {
        render(<ListingItem hotel={mockHotel} />);
        expect(screen.getByText(mockHotel.property.title)).toBeVisible();
    });

    test('should render the hotel address correctly', () => {
        render(<ListingItem hotel={mockHotel} />);
        expect(screen.getByText(mockHotel.property.address.join(', '))).toBeVisible();
    });

    test('should render the hotel image with correct alt text', () => {
        render(<ListingItem hotel={mockHotel} />);
        const image = screen.getByAltText(`${mockHotel.property.title} property view`);
        expect(image).toBeVisible();
        expect(image).toHaveAttribute('src', mockHotel.property.previewImage.url);
    });

    test('should render the promotion when available', () => {
        render(<ListingItem hotel={mockHotel} />);
        expect(screen.getByText(mockHotel.offer.promotion.title)).toBeVisible();
    });

    test('should render the room type correctly', () => {
        render(<ListingItem hotel={mockHotel} />);
        expect(screen.getByText(mockHotel.offer.name)).toBeVisible();
    });

    test('should render the price correctly', () => {
        render(<ListingItem hotel={mockHotel} />);
        // The formatted price should be displayed
        expect(screen.getByText(`$${Math.floor(mockHotel.offer.displayPrice.amount)}`)).toBeVisible();
    });

    test('should render savings information when available', () => {
        render(<ListingItem hotel={mockHotel} />);
        if (mockHotel.offer.savings) {
            expect(screen.getByText(/Save/)).toBeVisible();
        }
    });

    test('should render free cancellation message when applicable', () => {
        // Get a hotel with free cancellation
        const hotelWithFreeCancellation: Hotel = mockHotelsData.results.find(
            hotel => hotel.offer.cancellationOption.cancellationType === 'FREE_CANCELLATION'
        ) as Hotel;

        render(<ListingItem hotel={hotelWithFreeCancellation} />);
        expect(screen.getByText('Free cancellation')).toBeVisible();
    });

    test('should not render free cancellation message when not applicable', () => {
        // Get a hotel without free cancellation
        const hotelWithoutFreeCancellation: Hotel = mockHotelsData.results.find(
            hotel => hotel.offer.cancellationOption.cancellationType !== 'FREE_CANCELLATION'
        ) as Hotel;

        render(<ListingItem hotel={hotelWithoutFreeCancellation} />);
        expect(screen.queryByText('Free cancellation')).not.toBeInTheDocument();
    });

    test('should render ListingItemRating component with correct props', () => {
        render(<ListingItem hotel={mockHotel} />);

        const mockedRating = screen.getByTestId('mocked-rating');
        expect(mockedRating).toBeInTheDocument();
    });

    test('should have proper accessibility attributes', () => {
        render(<ListingItem hotel={mockHotel} />);
        const article = screen.getByRole('article');
        expect(article).toHaveAttribute('aria-labelledby', `hotel-name-${mockHotel.property.propertyId}`);
    });
});
