import { HttpError, utils } from '@crosslab/service-common';
import bcrypt from 'bcrypt';

import { config } from '../config.js';
import { ApplicationDataSource } from '../database/datasource.js';
import { UserModel } from '../database/model.js';

/**
 * This function builds the url of a user using its id.
 * @param id The id of the user.
 * @returns The url of the user.
 */
export function userUrlFromId(id: string): string {
  return config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + 'users/' + id;
}

/**
 * Extracts the user ID from a given URL.
 * @param url - The URL containing the user ID.
 * @returns The extracted user ID.
 * @throws {HttpError} If the URL is invalid and does not contain a user ID.
 */
export function userIdFromUrl(url: string): string {
  const match = url.match(/\/users\/([^/]+)/);
  if (match === null) throw new HttpError(400, 'Invalid user url');
  return match[1];
}

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

export async function createUser(
  username: string,
  password: string,
  type: string,
  isAdmin: boolean = false,
) {
  const user = ApplicationDataSource.manager.create(UserModel, {
    type,
    isAdmin: isAdmin,
    username: username,
    password: await bcrypt.hash(password, 10),
  });
  await ApplicationDataSource.manager.save(user);
  return user;
}
