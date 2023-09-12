import { HttpError } from '@crosslab/service-common';
import assert from 'assert';
import express from 'express';

import { ApplicationDataSource } from '../database/datasource.js';
import { UserModel } from '../database/model.js';
import { postTokenPath } from '../generated/operations.js';
import { validatePostToken } from '../generated/validation.js';
import { createNewToken } from '../token/helper.js';

export const router = express.Router();

router.post(
  postTokenPath,
  validatePostToken(async (req, res) => {
    const { username, claims } = req.body;

    console.log('username', username);
    if (!username) throw new HttpError(400, 'User not found');
    assert(username !== undefined, 'username is undefined');
    let user = await ApplicationDataSource.manager.findOneBy(UserModel, {
      username: username,
    });
    if (user === null){
      user = await ApplicationDataSource.manager.findOneBy(UserModel, {
        uuid: username,
      });
    }
    if (user === null) throw new HttpError(400, 'User not found');

    const token = await createNewToken(user, claims);

    res.status(201);
    res.json(token);
  }),
);
