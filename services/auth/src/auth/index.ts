import { logger } from '@crosslab/service-common/logging';
import express from 'express';
import { SignJWT } from 'jose';

import { config } from '../config';
import { ApplicationDataSource } from '../database/datasource';
import { TokenModel } from '../database/model';
import { getAuthPath } from '../generated/operations';
import { validateGetAuth } from '../generated/validation';

const bearerTokenRegex = /^Bearer (\S*)$/;
function parseBearerToken(authorizationHeader: string | undefined): string | undefined {
  if (!authorizationHeader) {
    return undefined;
  }
  const match = authorizationHeader.match(bearerTokenRegex);

  if (!match || match.length !== 2) {
    return undefined;
  }

  return match[1];
}

function parseQueryToken(query: string | undefined): string | undefined {
  if (!query) {
    return undefined;
  }
  const params = new URLSearchParams(query);
  return params.get('authToken') ?? undefined;
}

export const router = express.Router();

router.get(
  getAuthPath,
  validateGetAuth(async (req, res) => {
    const tokenId =
      parseQueryToken(req.header('X-Original-Query')) ??
      req.cookies['authToken'] ??
      parseBearerToken(req.header('Authorization'));
    try {
      if (tokenId === undefined) throw new Error('No token found');
      const token = await ApplicationDataSource.manager.findOneOrFail(TokenModel, {
        where: { token: tokenId },
        relations: { user: true },
      });
      const jwt = await new SignJWT({
        sub: token.user.uuid,
        ipa: req.header('X-Original-Query'),
        admin: true,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .sign(new TextEncoder().encode(config.JWT_SECRET));
      logger.info('auth send jwt', { jwt });
      res.setHeader('X-Request-Authentication', jwt);
    } catch (e) {
      logger.info('auth error', e);
      // ignore
    }
    res.send();
  }),
);
