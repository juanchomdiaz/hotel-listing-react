import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('@components/layout/AppLayout', () => {
  return () => (
    <div>AppLayout component</div>
  );
});

jest.mock('@context/hotelListingContext/HotelListingContextProvider', () => {
  return {
    HotelListingContextProvider: ({ children }: { children: React.ReactNode }) => {
      return <div>{children}</div>;
    },
  };
});

describe('App', () => {
  test('should render the AppLayout component', () => {
    render(<App />);
    expect(screen.getByText('AppLayout component')).toBeInTheDocument();
  });
});
