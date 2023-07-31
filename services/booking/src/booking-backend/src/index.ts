import { app } from "./generated";

import {
  handleDeviceReservationRequest,
  handleFreeDeviceRequest,
} from "./amqpHandle";
import {
  JWTVerify,
  parseJwtFromRequestAuthenticationHeader,
} from "@cross-lab-project/service-common";
import { isUserTypeJWT } from "./generated/types";
import { config } from "./config";

export * from "./messageDefinition";

if (require.main === module) {
  app.initService({
    security: {
      JWT: JWTVerify(
        { JWKS_URL: "", SECURITY_AUDIENCE: "", SECURITY_ISSUER: "" },
        isUserTypeJWT,
        parseJwtFromRequestAuthenticationHeader
      ),
    },
  });

  console.log("Starting booking-backend");
  app.listen(config.PORT);
  handleDeviceReservationRequest();
  handleFreeDeviceRequest();
}
