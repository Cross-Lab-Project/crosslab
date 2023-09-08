import { config as CommonConfig } from '@crosslab/service-common';
import { utils } from '@crosslab/service-common';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: parseInt(process.env.PORT ?? '3009'),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  BASE_URL: process.env.BASE_URL ?? 'http://localhost:3009',
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL ?? 'http://localhost:3000',
  EXPERIMENT_SERVICE_URL: process.env.EXPERIMENT_SERVICE_URL ?? 'http://localhost:3002',
  COOKIE_SECRET: process.env.COOKIE_SECRET ?? utils.die('COOKIE_SECRET not set'),
  orm: {
    ...CommonConfig.readOrmConfig(),
  },
};
