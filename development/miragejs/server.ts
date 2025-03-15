import { createServer } from "miragejs"
import * as data from "../data/hotels.json";
import { Hotel } from "@custom-types/hotel";

export const startMirage = () => createServer({
    logging: true,
    environment: "development",
    routes() {
        this.namespace = "api"

        this.get("/hotels", (_, request) => {
            const sortOrder = request.queryParams.sortOrder;

            const responseData = JSON.parse(JSON.stringify(data));

            if (sortOrder === "price-high-to-low") {
                responseData.results.sort((a: Hotel, b: Hotel) =>
                    b.offer.displayPrice.amount - a.offer.displayPrice.amount
                );
            } else if (sortOrder === "price-low-to-high") {
                responseData.results.sort((a: Hotel, b: Hotel) =>
                    a.offer.displayPrice.amount - b.offer.displayPrice.amount
                );
            }

            return responseData;
        })
    },
})