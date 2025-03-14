import { createServer } from "miragejs"
import * as data from "../data/hotels.json";

export const startMirage = () => createServer({
    logging: true,
    environment: "development",
    routes() {
        this.namespace = "api"

        this.get("/hotels", () => {
            return data;
        })
    },
})