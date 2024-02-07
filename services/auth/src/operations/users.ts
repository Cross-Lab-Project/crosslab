import { HttpError } from '@crosslab/service-common';
import bcrypt from 'bcrypt';
import { FindManyOptions, QueryFailedError } from 'typeorm';

import { ApplicationDataSource } from '../database/datasource.js';
import { UserModel } from '../database/model.js';
import {
  deleteUsersByUserIdSignature,
  getIdentitySignature,
  getUsersByUserIdSignature,
  getUsersSignature,
  patchIdentitySignature,
  patchUsersByUserIdSignature,
  postUsersSignature,
} from '../generated/signatures.js';
import { createUser, userIdFromUrl, userUrlFromId } from '../user/helper.js';

export const getIdentity: getIdentitySignature = async req => {
  const user = await ApplicationDataSource.manager.findOneByOrFail(UserModel, {
    uuid: userIdFromUrl(req.authorization.user),
  });
  return {
    status: 200,
    body: {
      username: user.username,
      id: user.uuid,
      url: userUrlFromId(user.uuid),
      admin: user.isAdmin,
    },
  };
};

export const patchIdentity: patchIdentitySignature = async req => {
  await req.authorization.check_authorization_or_fail(
    'edit',
    `user:${req.authorization.user}`,
  );
  const user = await ApplicationDataSource.manager.findOneByOrFail(UserModel, {
    uuid: userIdFromUrl(req.authorization.user),
  });
  if (req.body.password !== undefined) {
    user.password = await bcrypt.hash(req.body.password!, 10);
  }
  if (req.body.admin !== undefined) {
    await req.authorization.check_authorization_or_fail(
      'change_admin_status',
      `user:${req.authorization.user}`,
    );
    user.isAdmin = req.body.admin!;
  }

  await ApplicationDataSource.manager.save(user);
  return { status: 200, body: {} };
};

export const getUsers: getUsersSignature = async req => {
  await req.authorization.check_authorization_or_fail('view', 'user');

  let findOptions: FindManyOptions<UserModel> = {};
  if (req.query.username) {
    findOptions = {
      where: {
        username: req.query.username as string,
      },
    };
  }

  let users = await ApplicationDataSource.manager.find(UserModel, findOptions);
  users = await req.authorization.filter(users, 'view', u => `user:${u.uuid}`);

  return {
    status: 200,
    body: users.map(u => ({
      username: u.username,
      id: u.uuid,
      url: userUrlFromId(u.uuid),
      admin: u.isAdmin,
    })),
  };
};

export const postUsers: postUsersSignature = async req => {
  await req.authorization.check_authorization_or_fail('create', 'user');
  try {
    const user = await createUser(req.body.username, req.body.password);
    return {
      status: 201,
      body: {
        username: user.username,
        id: user.uuid,
        url: userUrlFromId(user.uuid),
      },
    };
  } catch (err) {
    if (err instanceof QueryFailedError) {
      throw new HttpError(409, 'Username already exists', err);
    }
  }
  return <never>null;
};

export const getUsersByUserId: getUsersByUserIdSignature = async req => {
  await req.authorization.check_authorization_or_fail(
    'view',
    `user:${req.params.user_id}`,
  );
  const user = await ApplicationDataSource.manager.findOneByOrFail(UserModel, {
    uuid: req.params.user_id,
  });
  return {
    status: 200,
    body: {
      username: user.username,
      id: user.uuid,
      url: userUrlFromId(user.uuid),
      admin: user.isAdmin,
    },
  };
};

export const deleteUsersByUserId: deleteUsersByUserIdSignature = async req => {
  await req.authorization.check_authorization_or_fail(
    'delete',
    `user:${req.params.user_id}`,
  );
  const user = await ApplicationDataSource.manager.findOneByOrFail(UserModel, {
    uuid: req.params.user_id,
  });
  await ApplicationDataSource.manager.remove(user);
  return { status: 204 };
};

export const patchUsersByUserId: patchUsersByUserIdSignature = async req => {
  await req.authorization.check_authorization_or_fail(
    'edit',
    `user:${req.params.user_id}`,
  );
  const user = await ApplicationDataSource.manager.findOneByOrFail(UserModel, {
    uuid: req.params.user_id,
  });
  if (req.body.password !== undefined) {
    user.password = await bcrypt.hash(req.body.password!, 10);
  }
  if (req.body.admin !== undefined) {
    await req.authorization.check_authorization_or_fail(
      'change_admin_status',
      `user:${req.params.user_id}`,
    );
    user.isAdmin = req.body.admin!;
  }

  await ApplicationDataSource.manager.save(user);
  return {
    status: 200,
    body: {
      username: user.username,
      id: user.uuid,
      url: userUrlFromId(user.uuid),
      admin: user.isAdmin,
    },
  };
};
