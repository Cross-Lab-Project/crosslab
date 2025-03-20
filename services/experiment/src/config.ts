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
  BOOKING_FRONTEND_URL: process.env.BOOKING_FRONTEND_URL ?? 'http://localhost:3004',
  BOOKING_BACKEND_URL: process.env.BOOKING_BACKEND_URL ?? 'http://localhost:3005',
  SCHEDULE_SERVICE_URL: process.env.SCHEDULE_SERVICE_URL ?? 'http://localhost:3006',
  JWT_SECRET: 'secret',
  orm: {
    ...basicOrmConfig,
    entities: Entities,
    migrations: Migrations(basicOrmConfig.type),
    migrationsRun: true,
  },
};
