import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HotelListingContextProvider } from './HotelListingContextProvider';
import { useHotelListingContext } from '@hooks/context/useHotelListingContext';
import { API_URL } from '@constants/environment';
import * as mockHotels from "../../../development/data/hotels.json";

// Mock fetch globally
global.fetch = jest.fn();

// Helper to set up fetch mock
const setupFetchMock = (data = mockHotels, ok = true) => {
    (global.fetch as jest.Mock).mockResolvedValue({
        ok,
        json: async () => data,
    });
};

// Create a test query client
const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            gcTime: 0,
            staleTime: 0,
        },
        mutations: {
            retry: false,
        },
    },
});

// Test component that consumes the context using the custom hook
const TestConsumer = () => {
    const context = useHotelListingContext();

    return (
        <div>
            <div data-testid="loading">{context.isLoading.toString()}</div>
            <div data-testid="hotels-count">{context.hotels.length}</div>
            <div data-testid="sort-order">{context.sortOrder}</div>
            <button data-testid="change-sort" onClick={() => context.setSortOrder('price-low-to-high')}>
                Change Sort
            </button>
            <button data-testid="refetch" onClick={() => context.refetch()}>
                Refetch
            </button>
            {!!context.error && <div data-testid="error">{context.error instanceof Error ? context.error.message : String(context.error)}</div>}
        </div>
    );
};

// Wrapper component with QueryClient
const renderWithClient = (ui: React.ReactElement) => {
    const testQueryClient = createTestQueryClient();
    return render(
        <QueryClientProvider client={testQueryClient}>
            {ui}
        </QueryClientProvider>
    );
};

describe('HotelListingContextProvider', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        setupFetchMock();
    });

    test('Should fetch hotels with correct initial sort order parameter', async () => {
        renderWithClient(
            <HotelListingContextProvider>
                <TestConsumer />
            </HotelListingContextProvider>
        );

        expect(screen.getByTestId('loading').textContent).toBe('true');

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('sortOrder=price-high-to-low'));
        });
    });

    test('Should update sort order when setSortOrder is called', async () => {
        const user = userEvent.setup();

        renderWithClient(
            <HotelListingContextProvider>
                <TestConsumer />
            </HotelListingContextProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('loading').textContent).toBe('false');
        });

        // Change the sort order using userEvent
        await user.click(screen.getByTestId('change-sort'));

        // Verify sort order was updated in the context
        expect(screen.getByTestId('sort-order').textContent).toBe('price-low-to-high');

        // Verify fetch was called with the new sort order
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('sortOrder=price-low-to-high'));
        });
    });

    test('Should display loading state while fetching data', async () => {
        // Delay the fetch response to ensure loading state is visible
        (global.fetch as jest.Mock).mockImplementation(() =>
            new Promise(resolve => setTimeout(() => resolve({
                ok: true,
                json: async () => mockHotels
            }), 100))
        );

        renderWithClient(
            <HotelListingContextProvider>
                <TestConsumer />
            </HotelListingContextProvider>
        );

        // Initially should be loading
        expect(screen.getByTestId('loading').textContent).toBe('true');

        // Eventually loading should complete
        await waitFor(() => {
            expect(screen.getByTestId('loading').textContent).toBe('false');
        });
    });

    test('Should handle fetch errors correctly', async () => {
        // Silence console errors for this test
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        // Mock a failed response
        (global.fetch as jest.Mock).mockRejectedValue(new Error('Failed to fetch hotels'));

        renderWithClient(
            <HotelListingContextProvider>
                <TestConsumer />
            </HotelListingContextProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('loading').textContent).toBe('false');
        });

        // Error should be displayed
        expect(screen.getByTestId('error')).toBeInTheDocument();
        expect(screen.getByTestId('error').textContent).toBe('Failed to fetch hotels');

        // Restore console.error
        consoleErrorSpy.mockRestore();
    });

    test('Should handle API returning non-OK response', async () => {
        // Silence console errors for this test
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        // Mock an 5XX response
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error',
        });

        renderWithClient(
            <HotelListingContextProvider>
                <TestConsumer />
            </HotelListingContextProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('loading').textContent).toBe('false');
        });

        // Error should be in the context
        expect(screen.getByTestId('error')).toBeInTheDocument();

        // Restore console.error
        consoleErrorSpy.mockRestore();
    });

    test('Should call refetch when refetch function is called', async () => {
        const user = userEvent.setup();

        renderWithClient(
            <HotelListingContextProvider>
                <TestConsumer />
            </HotelListingContextProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('loading').textContent).toBe('false');
        });

        await user.click(screen.getByTestId('refetch'));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('sortOrder=price-high-to-low'));
        });
    });

    test('Should use the correct API URL from constants', async () => {
        renderWithClient(
            <HotelListingContextProvider>
                <TestConsumer />
            </HotelListingContextProvider>
        );

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining(API_URL));
        });
    });
});
