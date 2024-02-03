import { HttpError } from '@crosslab/service-common';
import express from 'express';

import { ApplicationDataSource } from '../database/datasource.js';
import { UserModel } from '../database/model.js';
import { postTokenSignature } from '../generated/signatures.js';
import { createNewToken } from '../token/helper.js';
import { userIdFromUrl } from '../user/helper.js';

export const router = express.Router();

export const postToken: postTokenSignature = async req => {
  const { user: user_url, username, claims } = req.body;

  let userId: string | undefined;
  if (username) {
    const user = await ApplicationDataSource.manager.findOneBy(UserModel, {
      username: username as string,
    });
    if (user === null) throw new HttpError(400, 'User not found');
    userId = user.uuid;
  } else {
    if (!user_url) throw new HttpError(400, 'Missing user url');
    userId = (user_url as string).startsWith('http')
      ? userIdFromUrl(user_url as string)
      : (user_url as string);
  }

  const user = await ApplicationDataSource.manager.findOneBy(UserModel, {
    uuid: userId,
  });
  if (user === null) throw new HttpError(400, 'User not found');

  const token = await createNewToken(user, claims);

  return {
    status: 201,
    body: token,
  };
};
