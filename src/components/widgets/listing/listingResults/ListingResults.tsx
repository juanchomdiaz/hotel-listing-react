import React from "react";
import { useHotelListingContext } from "@hooks/context/useHotelListingContext";
import ListingItem from "@components/widgets/listing/listingItem/ListingItem";
import styles from "./ListingResults.module.css";
import { formatCurrencyValue } from "@utils/currencyUtils";

/**
 * A component that displays the results of a hotel listing in the selected order.
 */
const ListingResults = (): React.JSX.Element => {
    const { hotels, isLoading, error } = useHotelListingContext();

    if (isLoading) return <div className={styles.loading}>Loading hotels...</div>;
    if (error) return <div className={styles.error}>Error loading hotels: {(error as Error).message || String(error)}</div>;
    if (!hotels || hotels.length === 0) return <div className={styles.empty}>No hotels found</div>;

    return (
        <div className={styles.listingResults} role="list">
            {hotels.map(hotel => (
                <div
                    key={hotel.id}
                    tabIndex={0}
                    role="listitem"
                    aria-label={`Hotel: ${hotel.property.title}, Price: ${formatCurrencyValue(hotel.offer.displayPrice.amount, hotel.offer.displayPrice.currency)}`}>
                    <ListingItem hotel={hotel} />
                </div>
            ))}
        </div>
    );
};

export default ListingResults;