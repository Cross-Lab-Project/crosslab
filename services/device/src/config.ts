import { Entities } from './database/model';
import { config as CommonConfig } from '@crosslab/service-common';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: parseInt(process.env.PORT ?? '3001'),
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    BASE_URL: process.env.BASE_URL ?? 'http://localhost',
    JWT_SECRET: 'secret',
    orm: {
        ...CommonConfig.readOrmConfig(),
        entities: Entities,
    },
};
