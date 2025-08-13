import { InternalServerError } from '@crosslab/service-common';
import * as ldapts from 'ldapts';

import { AuthenticationSourceConfig } from '../config.js';
import { ApplicationDataSource } from '../database/datasource.js';
import { UserModel } from '../database/model.js';
import { createUser } from '../user/helper.js';
import { AuthenticationSource } from './interface.js';

export class LdapAuthenticationSource implements AuthenticationSource {
  constructor(private config: AuthenticationSourceConfig & { type: 'ldap' }) {}

  async checkCredentials(
    username: string,
    password: string,
  ): Promise<
    { success: true; needsProvisioning: boolean; user: UserModel } | { success: false }
  > {
    const canBind = await this.ldap_bind(username, password);
    if (!canBind) {
      return { success: false };
    }

    // username, password are binding. Now check if the user exists in the database.
    let user = await ApplicationDataSource.manager.findOneBy(UserModel, {
      username: username,
      type: this.config.name,
    });

    if (user !== null) {
      return { success: true, needsProvisioning: false, user: user };
    }

    // If the user does not exist in the database, create a new user.
    user = await createUser(username, password, this.config.name);
    return { success: true, needsProvisioning: true, user: user };
  }

  /**
   * This function attempts to login LDAP system with the provided credentials.
   * @param username Username of the client.
   * @param password Password of the client.
   * @throws {LdapBindError} Thrown if ldap bind fails.
   * @returns true if the credentials are valid, false otherwise.
   */
  private async ldap_bind(username: string, password: string): Promise<boolean> {
    // Initialize Ldap Client
    if (!this.config.url || !password) {
      return false;
    }
    const client = new ldapts.Client({
      url: this.config.url,
      tlsOptions: {
        minVersion: 'TLSv1',
      },
      timeout: 10000,
    });

    // Bind Ldap Client
    const dn = `cn=${username},ou=user,o=uni`;
    try {
      await client.bind(dn, password);
    } catch (err) {
      if (err instanceof ldapts.InvalidCredentialsError) {
        return false;
      } else if (err instanceof Error) {
        throw new InternalServerError('Ldap bind failed', err);
      } else {
        throw new InternalServerError('Ldap bind failed');
      }
    }

    // Make Ldap Search Request
    const searchResult = await client.search(dn);
    if (searchResult.searchEntries.length === 0) {
      return false;
    }

    return true;
  }
}
