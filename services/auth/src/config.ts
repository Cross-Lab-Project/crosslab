import { config as CommonConfig, utils } from '@crosslab/service-common';
import dotenv from 'dotenv';

dotenv.config();

export type AuthenticationSourceConfig =
  | {
      name: string;
      type: 'ldap';
      url: string;
    }
  | {
      name: string;
      type: 'local';
    };

function parseAuthenticationSourceLdap(name: string): AuthenticationSourceConfig {
  return {
    name,
    type: 'ldap',
    url: process.env[`AUTH_${name}_URL`] ?? utils.die(`AUTH_${name}_URL is not set`),
  };
}

function parseAuthenticationSourceLocal(name: string): AuthenticationSourceConfig {
  return {
    name,
    type: 'local',
  };
}

/**
 * This function parses all environment variables in the form `AUTH_{name}_{option}`.
 * And returns a list of named authentication sources.
 */
function parseAuthenticationSources() {
  const sources: AuthenticationSourceConfig[] = [];
  for (const key in process.env) {
    const match = key.match(/^AUTH_(\w+)_TYPE$/);
    if (match === null) continue;

    const name = match[1];
    const type = process.env[`AUTH_${name}_TYPE`];
    switch (type) {
      case 'ldap':
        sources.push(parseAuthenticationSourceLdap(name));
        break;
      case 'local':
        sources.push(parseAuthenticationSourceLocal(name));
        break;
      default:
        utils.die(`Unknown authentication source type: ${type}`);
    }
  }
  if (sources.length === 0) return [parseAuthenticationSourceLocal('local')];
  return sources;
}

export const config = {
  PORT: parseInt(process.env.PORT ?? '3000'),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  BASE_URL: process.env.BASE_URL ?? 'http://localhost:3000',
  JWT_SECRET: process.env['JWT_SECRET'] ?? utils.die('JWT_SECRET is not set'),
  ADMIN_USERNAME: process.env['ADMIN_USERNAME'],
  ADMIN_PASSWORD: process.env['ADMIN_PASSWORD'],
  AUTHENTICATION_SOURCES: parseAuthenticationSources(),
  orm: {
    ...CommonConfig.readOrmConfig(),
  },
};
