import crypto from 'crypto';

import { ApplicationDataSource } from '../database/datasource';
import { TokenModel, UserModel } from '../database/model';

export async function createNewToken(
  user: string | UserModel,
  claims?: object,
  validityMinutes?: number,
): Promise<string> {
  if (typeof user === 'string') {
    user = await ApplicationDataSource.manager.findOneByOrFail(UserModel, {
      uuid: user,
    });
  }

  const token = await ApplicationDataSource.manager.create(TokenModel, {
    user: user,
    token: crypto.randomBytes(64).toString('base64url'),
    expiresOn: validityMinutes
      ? new Date(Date.now() + 1000 * 60 * validityMinutes).toISOString()
      : undefined,
    claims: claims,
  });

  await ApplicationDataSource.manager.save(token);
  return token.token;
}
