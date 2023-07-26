import { app } from "./generated";
import {
  JWTVerify,
  parseJwtFromRequestAuthenticationHeader,
} from "@cross-lab-project/service-common";
import { isUserTypeJWT } from "./generated/types";
import { config } from "./config";

if (require.main === module) {
  app.initService({
    security: {
      JWT: JWTVerify(
        {
          JWKS_URL: config.JWKS_URL,
          SECURITY_AUDIENCE: config.SECURITY_AUDIENCE,
          SECURITY_ISSUER: config.SECURITY_ISSUER,
        },
        isUserTypeJWT,
        parseJwtFromRequestAuthenticationHeader
      ),
    },
  });

  console.log("Starting booking-frontend");
  app.listen(config.PORT);
}
