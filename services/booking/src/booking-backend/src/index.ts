import { app } from "./generated";
import { config } from "../../common/config";

import * as mysql from 'mysql2/promise';

import { handleDeviceReservationRequest, handleFreeDeviceRequest } from "./amqpHandle";

app.initService({
    security: {
        JWT: async (_jwt, _scopes) => {
            return { username: "testuser", url: "localhost/user/testuser", scopes: [] }
        }
    }
})

console.log("Starting booking-backend");
app.listen(config.Port);
handleDeviceReservationRequest();
handleFreeDeviceRequest();