import { AuthenticationSourceConfig } from '../config.js';
import { LdapAuthenticationSource } from './ldap.js';
import { LocalAuthenticationSource } from './local.js';

export function authenticationSourceFromConfig(config: AuthenticationSourceConfig) {
  switch (config.type) {
    case 'ldap':
      return new LdapAuthenticationSource(config);
    case 'local':
      return new LocalAuthenticationSource(config);
    default:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error(`Unsupported authentication source type: ${(config as any).type}`);
  }
}
