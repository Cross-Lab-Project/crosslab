import {JWTPayload, createRemoteJWKSet, jwtVerify} from 'jose';
import {URL} from 'url';

import {JWTVerificationError} from './errors';

export * from './errors';
export * from './logger';
export * from './handlers';
export * from './types';
export * from './database/abstractRepository';
export * from './database/abstractDataSource';
import express from 'express';

export function parseJwtFromRequestAuthenticationHeader(req: express.Request): string {
  const jwt = req.header('X-Request-Authentication');
  if (jwt === undefined) {
    throw new JWTVerificationError('Authorization header is not set', 401);
  }
  if (!jwt) throw new JWTVerificationError('No JWT provided', 401);
  return jwt;
}

export function JWTVerify<T, R extends {scopes: string[]}>(
  options: {JWKS_URL: string; SECURITY_ISSUER: string; SECURITY_AUDIENCE: string},
  validatePayload: (output: JWTPayload) => output is R,
  parseJwt: (input: T) => string,
): (input: T, scopes: string[]) => Promise<R> {
  const jwksUrl = new URL(options.JWKS_URL);
  const JWKS = createRemoteJWKSet(jwksUrl);
  return async (req: T, scopes: string[]) => {
    const jwt = parseJwt(req);

    if (!jwt) throw new JWTVerificationError('No JWT provided', 401);

    const jwtVerifyResult = await jwtVerify(jwt, JWKS, {
      issuer: options.SECURITY_ISSUER,
      audience: options.SECURITY_AUDIENCE,
    });
    const user = jwtVerifyResult.payload;
    user.jwt = jwt;
    if (!validatePayload(user)) throw new JWTVerificationError('Payload is malformed', 401);

    let scopeFound = false;
    for (const scope of scopes) {
      if ((user.scopes as Array<any>).includes(scope)) {
        scopeFound = true;
        break;
      }
    }

    if (!scopeFound) throw new JWTVerificationError('Missing Scope: one of ' + scopes, 403);

    return user;
  };
}
