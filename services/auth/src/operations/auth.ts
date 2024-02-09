import { logger } from '@crosslab/service-common';
import { SignJWT } from 'jose';

import { parseBearerToken, parseQueryToken } from '../auth/index.js';
import { config } from '../config.js';
import { ApplicationDataSource } from '../database/datasource.js';
import { TokenModel } from '../database/model.js';
import { getAuthSignature } from '../generated/signatures.js';
import { userUrlFromId } from '../user/helper.js';

export const getAuth: getAuthSignature = async req => {
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
      sub: userUrlFromId(token.user.uuid),
      edgeToken: token.token,
      ipa: req.header('X-Original-Query'),
      admin: token.user.isAdmin,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .sign(new TextEncoder().encode(config.JWT_SECRET));
    logger.info('auth send jwt', { jwt });
    return {
      status: 200,
      headers: { 'X-Request-Authentication': jwt },
    };
  } catch (e) {
    logger.info('auth error', e);
    // ignore
  }
  return { status: 200, headers: {} };
};
