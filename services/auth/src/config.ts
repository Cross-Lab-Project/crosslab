import { config as CommonConfig, utils } from '@crosslab/service-common';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: parseInt(process.env.PORT ?? '3000'),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  BASE_URL: process.env.BASE_URL ?? 'http://localhost:3000',
  JWT_SECRET: process.env['JWT_SECRET'] ?? utils.die('JWT_SECRET is not set'),
  ADMIN_USERNAME: process.env['ADMIN_USERNAME'],
  ADMIN_PASSWORD: process.env['ADMIN_PASSWORD'],
  orm: {
    ...CommonConfig.readOrmConfig(),
  },
};
