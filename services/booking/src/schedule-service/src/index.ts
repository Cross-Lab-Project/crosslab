import {
  JWTVerify,
  parseJwtFromRequestAuthenticationHeader,
} from '@cross-lab-project/service-common';

import { config } from './config';
import { app } from './generated';
import { isUserTypeJWT } from './generated/types';

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
        parseJwtFromRequestAuthenticationHeader,
      ),
    },
  });

  console.log('Starting schedule-service');
  app.listen(config.PORT);
}
