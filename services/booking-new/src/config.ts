import { config as CommonConfig, utils } from '@crosslab/service-common';
import dotenv from 'dotenv';

import { Migrations } from './database/migrations/index.js';
import { Entities } from './database/model.js';

dotenv.config();

const basicOrmConfig = CommonConfig.readOrmConfig();

export const config = {
  PORT: parseInt(process.env.PORT ?? '3007'),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  BASE_URL: process.env.BASE_URL ?? 'http://localhost',
  AUTHORIZATION_SERVER:
    process.env.AUTHORIZATION_SERVER ||
    utils.die('Environment variable AUTHORIZATION_PSK must be set'),
  AUTHORIZATION_PSK:
    process.env.AUTHORIZATION_PSK ||
    utils.die('Environment variable AUTHORIZATION_PSK must be set'),
  JWT_SECRET: 'secret',
  orm: {
    ...basicOrmConfig,
    entities: Entities,
    migrations: Migrations(basicOrmConfig.type),
    migrationsRun: true,
  },
};
