import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('should render the app component', () => {
    render(<App />);
    expect(screen.getByText('Hotel Listing App')).toBeInTheDocument();
  });
});
