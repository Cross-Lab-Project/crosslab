import { HttpError } from '@crosslab/service-common';
import { utils } from '@crosslab/service-common';
import bcrypt from 'bcrypt';
import express from 'express';
import { QueryFailedError } from 'typeorm';

import { config } from '../config';
import { ApplicationDataSource } from '../database/datasource';
import { UserModel } from '../database/model';
import {
  deleteUsersByUserIdPath,
  getIdentityPath,
  getUsersByUserIdPath,
  getUsersPath,
  getUsersResponseBodyType,
  patchUsersByUserIdPath,
  postUsersPath,
} from '../generated/operations';
import {
  validateDeleteUsersByUserId,
  validateGetIdentity,
  validateGetUsers,
  validateGetUsersByUserId,
  validatePatchUsersByUserId,
  validatePostUsers,
} from '../generated/validation';
import { createUser } from './helper';

/**
 * This function builds the url of a user using its id.
 * @param id The id of the user.
 * @returns The url of the user.
 */
export function userUrlFromId(id: string): string {
  return config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + 'users/' + id;
}

export const router = express.Router();

export async function init_users() {
  if (
    config.ADMIN_USERNAME &&
    (await ApplicationDataSource.manager.find(UserModel)).length === 0
  ) {
    const user = ApplicationDataSource.manager.create(UserModel, {
      type: 'local',
      isAdmin: true,
      username: config.ADMIN_USERNAME,
      password: await bcrypt.hash(
        config.ADMIN_PASSWORD ?? utils.die('ADMIN_PASSWORD must be supplied'),
        10,
      ),
    });
    await ApplicationDataSource.manager.save(user);
  }
}

router.get(
  getIdentityPath,
  validateGetIdentity(async (req, res) => {
    const user = await ApplicationDataSource.manager.findOneByOrFail(UserModel, {
      uuid: req.authorization.user,
    });
    res.send({
      username: user.username,
      id: user.uuid,
      url: userUrlFromId(user.uuid),
    });
  }),
);

router.get(
  getUsersPath,
  validateGetUsers(async (req, res) => {
    await req.authorization.check_authorization_or_fail('view', 'user');

    let users = await ApplicationDataSource.manager.find(UserModel);
    users = await req.authorization.filter(users, 'view', u => `user:${u.uuid}`);

    type user = getUsersResponseBodyType[number];
    res.send(
      users.map(
        u =>
          <user>{
            username: u.username,
            id: u.uuid,
            url: userUrlFromId(u.uuid),
          },
      ),
    );
  }),
);

router.post(
  postUsersPath,
  validatePostUsers(async (req, res) => {
    await req.authorization.check_authorization_or_fail('create', 'user');
    try {
      const user = await createUser(req.body.username, req.body.password);
      res.status(201).json({
        username: user.username,
        id: user.uuid,
        url: userUrlFromId(user.uuid),
      });
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new HttpError(409, 'Username already exists', err);
      }
    }
  }),
);

router.get(
  getUsersByUserIdPath,
  validateGetUsersByUserId(async (req, res) => {
    await req.authorization.check_authorization_or_fail(
      'view',
      `user:${req.params.user_id}`,
    );
    const user = await ApplicationDataSource.manager.findOneByOrFail(UserModel, {
      uuid: req.params.user_id,
    });
    res.send({
      username: user.username,
      id: user.uuid,
      url: userUrlFromId(user.uuid),
    });
  }),
);

router.delete(
  deleteUsersByUserIdPath,
  validateDeleteUsersByUserId(async (req, res) => {
    await req.authorization.check_authorization_or_fail(
      'delete',
      `user:${req.params.user_id}`,
    );
    const user = await ApplicationDataSource.manager.findOneByOrFail(UserModel, {
      uuid: req.params.user_id,
    });
    await ApplicationDataSource.manager.remove(user);
    res.status(204);
    res.send();
  }),
);

router.patch(
  patchUsersByUserIdPath,
  validatePatchUsersByUserId(async (req, res) => {
    await req.authorization.check_authorization_or_fail(
      'write',
      `user:${req.params.user_id}`,
    );
    const user = await ApplicationDataSource.manager.findOneByOrFail(UserModel, {
      uuid: req.params.user_id,
    });
    user.password = await bcrypt.hash(req.body.password, 10);

    await ApplicationDataSource.manager.save(user);
    res.send();
  }),
);
