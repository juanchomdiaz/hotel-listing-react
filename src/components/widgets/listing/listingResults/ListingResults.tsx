import React from "react";
import { useHotelListingContext } from "@hooks/context/useHotelListingContext";
import ListingItem from "@components/widgets/listing/listingItem/ListingItem";
import styles from "./ListingResults.module.css";

const ListingResults = () => {
    const { hotels, isLoading, error } = useHotelListingContext();

    if (isLoading) return <div className={styles.loading}>Loading hotels...</div>;
    if (error) return <div className={styles.error}>Error loading hotels: {(error as Error).message || String(error)}</div>;
    if (!hotels || hotels.length === 0) return <div className={styles.empty}>No hotels found</div>;

    return (
        <div className={styles.listingResults}>
            {hotels.map(hotel => (
                <ListingItem key={hotel.id} hotel={hotel} />
            ))}
        </div>
    );
};

export default ListingResults;