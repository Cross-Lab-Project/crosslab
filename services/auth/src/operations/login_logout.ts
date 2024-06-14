import { HttpError, UnauthorizedError } from '@crosslab/service-common';
import express from 'express';

import { authenticationSourceFromConfig } from '../authenticationSources/index.js';
import { AuthenticationSource } from '../authenticationSources/interface.js';
import { config } from '../config.js';
import { ApplicationDataSource } from '../database/datasource.js';
import { UserModel } from '../database/model.js';
import { postLoginSignature, postLogoutSignature } from '../generated/signatures.js';
import { createNewToken } from '../token/helper.js';

const authenticationProviders = config.AUTHENTICATION_SOURCES.map(
  authenticationSourceFromConfig,
);

async function provision(user: UserModel, req: express.Request) {
  await req.authorization.relate(`user:${user.uuid}`, 'viewer', 'user');
  return user;
}

export const postLogin: postLoginSignature = async req => {
  const { username, password } = req.body;

  let checkCredentialsResult: Awaited<
    ReturnType<AuthenticationSource['checkCredentials']>
  > = { success: false };
  for (const provider of authenticationProviders) {
    checkCredentialsResult = await provider.checkCredentials(username, password);
    if (checkCredentialsResult.success) {
      break;
    }
  }

  if (!checkCredentialsResult.success) {
    throw new UnauthorizedError();
  }
  const { user, needsProvisioning } = checkCredentialsResult;

  user.lastLogin = new Date().toISOString();
  ApplicationDataSource.manager.save(user);

  if (needsProvisioning) {
    provision(user, req);
  }

  const token = await createNewToken(user);

  return { status: 201, body: token };
};

export const postLogout: postLogoutSignature = async () => {
  throw new HttpError(501, 'Not implemented');
};
