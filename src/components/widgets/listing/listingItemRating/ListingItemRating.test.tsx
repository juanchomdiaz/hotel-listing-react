import React from 'react';
import { render, screen } from '@testing-library/react';
import ListingItemRating from './ListingItemRating';

describe('ListingItemRating Component', () => {
    test('should render 5 stars by default', () => {
        render(<ListingItemRating rating={3} />);
        const ratingIcons = screen.getAllByText('★');
        expect(ratingIcons).toHaveLength(5);
    });

    test('should render using circle variant when specified', () => {
        render(<ListingItemRating rating={3} variant="circle" />);
        const ratingIcons = screen.getAllByText('●');
        expect(ratingIcons).toHaveLength(5);
    });

    test('should apply filled class to stars that are less than or equal to rating', () => {
        const { container } = render(<ListingItemRating rating={3} />);

        const ratingIcons = container.querySelectorAll('.ratingIcon');

        expect(ratingIcons[0].classList.contains('filled')).toBe(true);
        expect(ratingIcons[1].classList.contains('filled')).toBe(true);
        expect(ratingIcons[2].classList.contains('filled')).toBe(true);
        expect(ratingIcons[3].classList.contains('unfilled')).toBe(true);
        expect(ratingIcons[4].classList.contains('unfilled')).toBe(true);
    });

    test('should apply halfFilled class to stars with half ratings', () => {
        const { container } = render(<ListingItemRating rating={3.5} />);

        const ratingIcons = container.querySelectorAll('.ratingIcon');

        expect(ratingIcons[0].classList.contains('filled')).toBe(true);
        expect(ratingIcons[1].classList.contains('filled')).toBe(true);
        expect(ratingIcons[2].classList.contains('filled')).toBe(true);
        expect(ratingIcons[3].classList.contains('halfFilled')).toBe(true);
        expect(ratingIcons[4].classList.contains('unfilled')).toBe(true);
    });

    test('should apply the variant class to half-filled stars', () => {
        const { container } = render(<ListingItemRating rating={3.5} variant="circle" />);
        const halfFilledIcon = container.querySelectorAll('.halfFilled')[0];

        expect(halfFilledIcon.classList.contains('circle')).toBe(true);
    });

    test('should render with full 5-star rating', () => {
        const { container } = render(<ListingItemRating rating={5} />);
        const ratingIcons = container.querySelectorAll('.ratingIcon');

        for (let i = 0; i < 5; i++) {
            expect(ratingIcons[i].classList.contains('filled')).toBe(true);
        }
    });

    test('should render with zero rating', () => {
        const { container } = render(<ListingItemRating rating={0} />);
        const ratingIcons = container.querySelectorAll('.ratingIcon');

        for (let i = 0; i < 5; i++) {
            expect(ratingIcons[i].classList.contains('unfilled')).toBe(true);
        }
    });

    test('should set the correct data-icon attribute', () => {
        const { container } = render(<ListingItemRating rating={3} />);
        const firstIcon = container.querySelector('.ratingIcon');

        expect(firstIcon).toHaveAttribute('data-icon', '★');
    });
});
