import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListingToolbar from './ListingToolbar';
import { useHotelListingContext } from '@hooks/context/useHotelListingContext';
import { SORT_ORDER_LABELS } from '@constants/listing';
import { SortOrder } from '@custom-types/sorting';

// Mock the context hook
jest.mock('@hooks/context/useHotelListingContext');
const mockUseHotelListingContext = useHotelListingContext as jest.MockedFunction<typeof useHotelListingContext>;

describe('ListingToolbar', () => {
    const mockSetSortOrder = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        // Setup default mock return values
        mockUseHotelListingContext.mockReturnValue({
            sortOrder: 'price-high-to-low' as SortOrder,
            setSortOrder: mockSetSortOrder,
            hotels: [{ id: 1 }, { id: 2 }, { id: 3 }] as any[],
            isLoading: false,
            error: null,
            refetch: jest.fn()
        });
    });

    test('Should render with correct number of hotels', () => {
        render(<ListingToolbar />);
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('hotels in')).toBeInTheDocument();
        expect(screen.getByText('Sydney')).toBeInTheDocument();
    });

    test('Should render with zero hotels when hotels array is empty', () => {
        mockUseHotelListingContext.mockReturnValue({
            sortOrder: 'price-high-to-low' as SortOrder,
            setSortOrder: mockSetSortOrder,
            hotels: [],
            isLoading: false,
            error: null,
            refetch: jest.fn()
        });

        render(<ListingToolbar />);
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    test('Should render with zero hotels when hotels is null', () => {
        mockUseHotelListingContext.mockReturnValue({
            sortOrder: 'price-high-to-low' as SortOrder,
            setSortOrder: mockSetSortOrder,
            hotels: null as any,
            isLoading: false,
            error: null,
            refetch: jest.fn()
        });

        render(<ListingToolbar />);
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    test('Should display the correct sort order in select', () => {
        render(<ListingToolbar />);
        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toHaveValue('price-high-to-low');
    });

    test('Should call setSortOrder when sort order is changed', async () => {
        const user = userEvent.setup();
        render(<ListingToolbar />);

        const selectElement = screen.getByRole('combobox');
        await user.selectOptions(selectElement, 'price-low-to-high');

        expect(mockSetSortOrder).toHaveBeenCalledWith('price-low-to-high');
    });

    test('Should have proper accessibility attributes', () => {
        render(<ListingToolbar />);

        // Check section has aria-label
        const section = screen.getByRole('region');
        expect(section).toHaveAttribute('aria-label', 'Hotel listing controls');

        // Check label is properly associated with select
        const label = screen.getByText('Sort by:');
        const select = screen.getByRole('combobox');
        expect(select).toHaveAttribute('id', 'sort-select');
        expect(label).toHaveAttribute('for', 'sort-select');
        expect(label).toHaveAttribute('id', 'sort-label');

        // Check select has aria-label
        expect(select).toHaveAttribute('aria-label', 'Sort hotels by');

        // Check div has role="group" and aria-labelledby
        const sortingSection = screen.getByRole('group');
        expect(sortingSection).toHaveAttribute('aria-labelledby', 'sort-label');
    });

    test('Should render all sort options', () => {
        render(<ListingToolbar />);

        // Check that all options from SORT_ORDER_LABELS are rendered
        Object.entries(SORT_ORDER_LABELS).forEach(([value, label]) => {
            expect(screen.getByRole('option', { name: label })).toHaveValue(value);
        });
    });
});
