import { Migrations } from './database/migrations/index.js';
import { Entities } from './database/model.js';
import { config as CommonConfig } from '@crosslab/service-common';
import dotenv from 'dotenv';

dotenv.config();

const basicOrmConfig = CommonConfig.readOrmConfig();

export const config = {
    PORT: parseInt(process.env.PORT ?? '3003'),
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
