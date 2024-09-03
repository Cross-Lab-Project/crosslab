import { config as CommonConfig, utils } from '@crosslab/service-common';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: parseInt(process.env.PORT ?? '3009'),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  BASE_URL: process.env.BASE_URL ?? 'http://localhost:3009',
  API_BASE_URL:
    process.env.API_BASE_URL ?? process.env.BASE_URL ?? 'http://localhost:3009',
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL ?? 'http://localhost:3000',
  DEVICE_SERVICE_URL: process.env.AUTH_SERVICE_URL ?? 'http://localhost:3001',
  EXPERIMENT_SERVICE_URL: process.env.EXPERIMENT_SERVICE_URL ?? 'http://localhost:3002',
  AUTHORIZATION_SERVER:
    process.env.AUTHORIZATION_SERVER ||
    utils.die('Environment variable AUTHORIZATION_PSK must be set'),
  AUTHORIZATION_PSK:
    process.env.AUTHORIZATION_PSK ||
    utils.die('Environment variable AUTHORIZATION_PSK must be set'),
  orm: {
    ...CommonConfig.readOrmConfig(),
  },
};
