import React from 'react';
import styles from './ListingItemRating.module.css';

interface ListingItemRatingProps {
    rating: number;
    variant?: 'star' | 'circle';
}

/**
 * A component that displays a rating for a listing item.
 * It iterates over a list of 5 stars and assignes the appropriate class to each icon based on the rating.
 * 
 * @param rating A number between 0 and 5 indicating the rating. Supports .5 increments.
 * @param variant The type of rating icon to display. Can be 'star' or 'circle'. Default to 'star'.
 * @returns 
 */
const ListingItemRating = ({ rating, variant = 'star' }: ListingItemRatingProps): React.JSX.Element => {
    const icon = variant === 'star' ? '★' : '●';

    return (
        <div className={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((position) => {
                let positionClassname = '';

                if (position <= rating) {
                    positionClassname = styles.filled;
                } else if (position - 0.5 <= rating) {
                    positionClassname = `${styles.halfFilled} ${styles[variant]}`;
                } else {
                    positionClassname = styles.unfilled;
                }

                return (
                    <div
                        key={position}
                        className={`${styles.ratingIcon} ${positionClassname}`}
                        data-icon={icon}
                    >
                        <span className={styles[variant]}>{icon}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default ListingItemRating;
