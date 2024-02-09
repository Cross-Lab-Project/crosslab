import { HttpError, UnauthorizedError } from '@crosslab/service-common';
import bcrypt from 'bcrypt';
import express from 'express';

import { ApplicationDataSource } from '../database/datasource.js';
import { UserModel } from '../database/model.js';
import { postLoginSignature, postLogoutSignature } from '../generated/signatures.js';
import { loginTui } from '../login_logout/tui_ldap.js';
import { createNewToken } from '../token/helper.js';
import { createUser } from '../user/helper.js';

async function checkCredentials(user: UserModel, username: string, password: string) {
  if (user === null) return false;
  switch (user.type) {
    case 'tui':
      return loginTui(username, password);
    case 'local':
      return user.password && (await bcrypt.compare(password, user.password));
    default:
      return false;
  }
}

async function prepareTuiUser(username: string, password: string, req: express.Request) {
  if (!loginTui(username, password)) {
    return null;
  }

  const user = await createUser(username, password, 'tui');

  await req.authorization.relate(`user:${user.uuid}`, 'viewer', 'user');
  return user;
}

export const postLogin: postLoginSignature = async req => {
  const { username, password } = req.body;
  let user = await ApplicationDataSource.manager.findOneBy(UserModel, {
    username: username,
  });
  if (user === null) user = await prepareTuiUser(username, password, req);
  if (user === null) throw new UnauthorizedError('Invalid login credentials');

  if (!(await checkCredentials(user, username, password))) {
    throw new UnauthorizedError('Invalid login credentials');
  }

  user.lastLogin = new Date().toISOString();
  ApplicationDataSource.manager.save(user);

  const token = await createNewToken(user);

  return { status: 201, body: token };
};

export const postLogout: postLogoutSignature = async () => {
  throw new HttpError(501, 'Not implemented');
};
