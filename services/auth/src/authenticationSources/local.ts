import bcrypt from 'bcrypt';

import { AuthenticationSourceConfig } from '../config.js';
import { ApplicationDataSource } from '../database/datasource.js';
import { UserModel } from '../database/model.js';
import { AuthenticationSource } from './interface.js';

export class LocalAuthenticationSource implements AuthenticationSource {
  constructor(private config: AuthenticationSourceConfig & { type: 'local' }) {}

  async checkCredentials(
    username: string,
    password: string,
  ): Promise<
    { success: true; needsProvisioning: boolean; user: UserModel } | { success: false }
  > {
    const user = await ApplicationDataSource.manager.findOneBy(UserModel, {
      username: username,
      type: this.config.name,
    });
    if (user === null) {
      return { success: false };
    }

    const passwordCorrect =
      user.password && (await bcrypt.compare(password, user.password));
    if (!passwordCorrect) {
      return { success: false };
    }

    return { success: true, needsProvisioning: false, user: user };
  }
}
