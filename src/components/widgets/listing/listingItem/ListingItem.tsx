import React from "react";
import { Hotel } from "@custom-types/hotel";
import ListingItemRating from "@components/widgets/listing/listingItemRating/ListingItemRating";
import styles from "./ListingItem.module.css";
import { formatCurrencyValue } from "@utils/currencyUtils";

interface ListingItemProps {
    hotel: Hotel;
}

/**
 * A component that renders a single hotel listing item.
 * 
 * @param hotel the Hotel object to be rendered
 * @returns 
 */
const ListingItem = ({ hotel }: ListingItemProps): React.JSX.Element => {
    return (
        <article className={styles.listingItem} aria-labelledby={`hotel-name-${hotel.property.propertyId}`}>
            <figure className={styles.imageContainer}>
                <img
                    src={hotel.property.previewImage.url}
                    alt={`${hotel.property.title} property view`}
                    className={styles.hotelImage}
                />
                {hotel.offer.promotion && (
                    <div className={styles.promotion}>{hotel.offer.promotion.title}</div>
                )}
            </figure>

            <div className={styles.content}>
                <div className={styles.propertyDetails}>
                    <header className={styles.header}>
                        <div className={styles.addressSection}>
                            <h3 id={`hotel-name-${hotel.property.propertyId}`} className={styles.hotelName}>{hotel.property.title}</h3>
                            <address className={styles.location}>{hotel.property.address.join(', ')}</address>
                        </div>
                        <div className={styles.ratingSection}>
                            <ListingItemRating rating={hotel.property.rating.ratingValue} variant={hotel.property.rating.ratingType === 'self' ? 'circle' : 'star'} />
                        </div>
                    </header>

                    <div className={styles.description}>{hotel.offer.name}</div>

                    <div className={styles.cancellationOption}>
                        {hotel.offer.cancellationOption.cancellationType === "FREE_CANCELLATION" && (
                            <p className={styles.freeCancellation}>Free cancellation</p>
                        )}
                    </div>
                </div>
                <div className={styles.offerDetails}>
                    <div className={styles.priceContainer} aria-label={`Price: ${hotel.offer.displayPrice.currency} ${hotel.offer.displayPrice.amount} per night`}>
                        <p className={styles.priceLabel}><b>1</b>{` night total (${hotel.offer.displayPrice.currency})`}</p>
                        <p className={styles.price}>{formatCurrencyValue(hotel.offer.displayPrice.amount, hotel.offer.displayPrice.currency)}</p>
                        <p className={styles.priceSaving}>{hotel.offer.savings && `Save ${formatCurrencyValue(hotel.offer.savings.amount, hotel.offer.savings.currency)}~`}</p>
                    </div>
                </div>
            </div>
        </article >
    );
};

export default ListingItem;