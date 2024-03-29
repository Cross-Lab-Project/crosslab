import { config as CommonConfig } from '@crosslab/service-common';
import dotenv from 'dotenv';

import { Migrations } from './database/migrations';
import { Entities } from './database/model';

dotenv.config();

const basicOrmConfig = CommonConfig.readOrmConfig();

export const config = {
  PORT: parseInt(process.env.PORT ?? '3004'),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  BASE_URL: process.env.BASE_URL ?? 'http://localhost',
  JWT_SECRET: 'secret',
  orm: {
    ...basicOrmConfig,
    entities: Entities,
    migrations: Migrations(basicOrmConfig.type),
    migrationsRun: true,
  },
};
