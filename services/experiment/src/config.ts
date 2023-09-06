import { Migrations } from './database/migrations';
import { Entities } from './database/model';
import { config as CommonConfig } from '@crosslab/service-common';
import dotenv from 'dotenv';

dotenv.config();

const basicOrmConfig = CommonConfig.readOrmConfig();

export const config = {
    PORT: parseInt(process.env.PORT ?? '3002'),
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
