import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('@components/layout/AppLayout', () => {
  return () => (
    <div>AppLayout component</div>
  );
}
);

describe('App', () => {
  test('should render the AppLayout component', () => {
    render(<App />);
    expect(screen.getByText('AppLayout component')).toBeInTheDocument();
  });
});
