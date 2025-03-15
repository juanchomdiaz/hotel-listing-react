import React from 'react';
import { render, screen } from '@testing-library/react';
import AppLayout from './AppLayout';

jest.mock('@assets/images/qantas-logo.png', () => 'mocked-logo-path');

describe('AppLayout', () => {
    test('should render and display the logo', () => {
        render(<AppLayout />);
        const logoElement = screen.getByAltText('qantas logo');
        expect(logoElement).toBeVisible();
        expect(logoElement).toHaveAttribute('src', 'mocked-logo-path');
    });

    test('should render children when provided', () => {
        const testText = 'Test Child Content';
        render(
            <AppLayout>
                <div data-testid="child-element">{testText}</div>
            </AppLayout>
        );

        const childElement = screen.getByTestId('child-element');
        expect(childElement).toBeVisible();
        expect(childElement).toHaveTextContent(testText);
    });

    test('should have the correct layout structure', () => {
        render(<AppLayout />);

        // Check for header
        const headerElement = document.querySelector('header');
        expect(headerElement).toBeInTheDocument();

        // Check for main content area
        const mainElement = document.querySelector('main');
        expect(mainElement).toBeInTheDocument();
    });
});
