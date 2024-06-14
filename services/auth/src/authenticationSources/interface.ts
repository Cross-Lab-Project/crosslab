import { UserModel } from '../database/model.js';

export interface AuthenticationSource {
  checkCredentials(
    username: string,
    password: string,
  ): Promise<
    { success: true; needsProvisioning: boolean; user: UserModel } | { success: false }
  >;
}
