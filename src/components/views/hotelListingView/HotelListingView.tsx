import React from "react";
import ListingToolbar from "@components/widgets/listing/listingToolbar/ListingToolbar";
import ListingResults from "../../widgets/listing/listingResults/ListingResults";

const HotelListingView = () => {
    return <>
        <ListingToolbar />
        <ListingResults />
    </>;
}

export default HotelListingView;