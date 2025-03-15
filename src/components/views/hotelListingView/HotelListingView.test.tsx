import React from 'react';
import { render, screen } from '@testing-library/react';
import HotelListingView from './HotelListingView';

// Mock the ListingToolbar component
jest.mock('@components/widgets/listing/listingToolbar/ListingToolbar', () => {
    return {
        __esModule: true,
        default: jest.fn(() => <div data-testid="mocked-listing-toolbar" />)
    };
});

// Mock the ListingResults component
jest.mock('@components/widgets/listing/listingResults/ListingResults', () => {
    return {
        __esModule: true,
        default: jest.fn(() => <div data-testid="mocked-listing-results" />)
    };
});

describe('HotelListingView Component', () => {
    test('should render ListingToolbar and ListingResults components', () => {
        render(<HotelListingView />);

        // Check if ListingToolbar is rendered
        const listingToolbar = screen.getByTestId('mocked-listing-toolbar');
        expect(listingToolbar).toBeInTheDocument();
        expect(listingToolbar).toBeVisible();

        // Check if ListingResults is rendered
        const listingResults = screen.getByTestId('mocked-listing-results');
        expect(listingResults).toBeInTheDocument();
        expect(listingResults).toBeVisible();
    });
});
