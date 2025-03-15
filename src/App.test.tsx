import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('@components/layout/AppLayout', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => {
      return <><p>AppLayout component</p><div>{children}</div></>;
    }
  };
});

jest.mock('@context/hotelListingContext/HotelListingContextProvider', () => {
  return {
    HotelListingContextProvider: ({ children }: { children: React.ReactNode }) => {
      return <div>{children}</div>;
    },
  };
});

jest.mock('@components/views/hotelListingView/HotelListingView', () => {
  return {
    __esModule: true,
    default: () => {
      return <p>HotelListingView component</p>;
    }
  };
});

describe('App', () => {
  test('should render the AppLayout component', () => {
    render(<App />);
    expect(screen.getByText('AppLayout component')).toBeVisible();
    expect(screen.getByText('HotelListingView component')).toBeVisible();
  });
});
