import React from 'react';
import { useHotelListingContext } from '@hooks/context/useHotelListingContext';
import { SORT_ORDERS, SORT_ORDER_LABELS } from '@constants/listing';
import { SortOrder } from '@custom-types/sorting';
import styles from './ListingToolbar.module.css';

/**
 * ListingToolbar component that allows users to sort hotel listings
 * and displays the number of results.
 */
const ListingToolbar: React.FC = () => {
    const { sortOrder, setSortOrder, hotels } = useHotelListingContext();

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value as SortOrder);
    };

    return (
        <section className={styles.toolbar} aria-label="Hotel listing controls">
            <p className={styles.resultsInfo}>
                <b>{hotels?.length || 0}</b> hotels in <b>Sydney</b>
            </p>
            <div className={styles.sortingSection} role="group" aria-labelledby="sort-label">
                <label id="sort-label" htmlFor="sort-select" className={styles.sortLabel}>
                    Sort by:
                </label>
                <select
                    id="sort-select"
                    className={styles.selectInput}
                    value={sortOrder}
                    onChange={handleSortChange}
                    aria-label="Sort hotels by"
                >
                    {SORT_ORDERS.map((order) => (
                        <option key={order} value={order}>
                            {SORT_ORDER_LABELS[order as keyof typeof SORT_ORDER_LABELS]}
                        </option>
                    ))}
                </select>
            </div>
        </section>
    );
};

export default ListingToolbar;
