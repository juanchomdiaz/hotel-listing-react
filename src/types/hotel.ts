import { SortOrder } from "./sorting";

export interface PreviewImage {
    url: string;
    caption: string;
    imageType: string;
}

export interface Rating {
    ratingValue: number;
    ratingType: string;
}

export interface Property {
    propertyId: string;
    title: string;
    address: string[];
    previewImage: PreviewImage;
    rating: Rating;
}

export interface Promotion {
    title: string;
    type: string;
}

export interface DisplayPrice {
    amount: number;
    currency: string;
}

export interface CancellationOption {
    cancellationType: string;
}

export interface Offer {
    promotion: Promotion;
    name: string;
    displayPrice: DisplayPrice;
    savings: DisplayPrice | null;
    cancellationOption: CancellationOption;
}

export interface Hotel {
    id: string;
    property: Property;
    offer: Offer;
}

export interface HotelResponse {
    results: Hotel[];
    totalCount: number;
    sortOrder: SortOrder;
}