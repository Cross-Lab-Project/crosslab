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
  JWT_SECRET: 'secret',
  orm: {
    ...basicOrmConfig,
    entities: Entities,
    migrations: Migrations(basicOrmConfig.type),
    migrationsRun: true,
  },
};
