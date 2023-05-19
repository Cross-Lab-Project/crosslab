import {createRemoteJWKSet, jwtVerify} from 'jose';
import {URL} from 'url';

import {JWTVerificationError} from './errors';

export * from './errors';
export * from './logger';
export * from './handlers';
export * from './types';
export * from './database/abstractRepository';
export * from './database/abstractDataSource';

export function JWTVerify(options: {
  BASE_URL: string;
  SECURITY_ISSUER: string;
  SECURITY_AUDIENCE: string;
}) {
  const jwksUri = new URL(
    options.BASE_URL.endsWith('/')
      ? options.BASE_URL + '.well-known/jwks.json'
      : options.BASE_URL + '/.well-known/jwks.json',
  );
  const JWKS = createRemoteJWKSet(jwksUri);
  return async (req: any, scopes: string[]) => {
    const authorization_header = req.header('Authorization');
    if (authorization_header === undefined) {
      throw new JWTVerificationError('Authorization header is not set', 401);
    }
    const bearerTokenResult = /^Bearer (.*)$/.exec(authorization_header);
    if (bearerTokenResult === null || bearerTokenResult.length != 2) {
      throw new JWTVerificationError('Authorization header is malformed', 401);
    }
    const jwt = bearerTokenResult[1];
    if (!jwt) throw new JWTVerificationError('No JWT provided', 401);
    if (!options.SECURITY_ISSUER)
      throw new JWTVerificationError('No security issuer specified', 500);
    const jwtVerifyResult = await jwtVerify(jwt, JWKS, {
      issuer: options.SECURITY_ISSUER,
      audience: options.SECURITY_AUDIENCE,
    });
    const user = jwtVerifyResult.payload;
    if (!user.scopes || !Array.isArray(user.scopes))
      throw new JWTVerificationError('Payload is malformed', 401);
    for (const scope of scopes) {
      if ((user.scopes as Array<any>).includes(scope)) {
        return user;
      }
    }
    throw new JWTVerificationError('Missing Scope: one of ' + scopes, 403);
  };
}
