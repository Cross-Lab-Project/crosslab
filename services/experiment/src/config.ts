import { config as CommonConfig } from '@crosslab/service-common';
import dotenv from 'dotenv';

import { Migrations } from './database/migrations/index.js';
import { Entities } from './database/model.js';

dotenv.config();

const basicOrmConfig = CommonConfig.readOrmConfig();

export const config = {
  PORT: parseInt(process.env.PORT ?? '3002'),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  BASE_URL: process.env.BASE_URL ?? 'http://localhost',
  DEVICE_SERVICE_URL: process.env.DEVICE_SERVICE_URL ?? 'http://localhost:3001',
  FORWARDING_SERVICE_URL: process.env.FORWARDING_SERVICE_URL ?? 'http://localhost:3020',
  JWT_SECRET: 'secret',
  STUN_SERVER_URL: process.env.STUN_SERVER_URL,
  TURN_SERVER_URL: process.env.TURN_SERVER_URL,
  TURN_SERVER_USERNAME: process.env.TURN_SERVER_USERNAME,
  TURN_SERVER_CREDENTIAL: process.env.TURN_SERVER_CREDENTIAL,
  orm: {
    ...basicOrmConfig,
    entities: Entities,
    migrations: Migrations(basicOrmConfig.type),
    migrationsRun: true,
  },
};
