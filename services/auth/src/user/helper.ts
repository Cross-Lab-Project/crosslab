import bcrypt from 'bcrypt';

import { ApplicationDataSource } from '../database/datasource.js';
import { UserModel } from '../database/model.js';

export async function createUser(
  username: string,
  password: string,
  type: 'local' | 'tui' = 'local',
  isAdmin: boolean = true
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
