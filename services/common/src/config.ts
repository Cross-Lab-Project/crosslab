/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataSourceOptions } from 'typeorm';

export function readOrmConfig(): DataSourceOptions {
  return {
    type: (process.env.DB_TYPE as any) ?? 'sqlite',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '3306'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE ?? 'database.db',
  };
}

export function readAuthorizationConfig() {
  return {
    AUTHORIZATION_SERVER: 'http://localhost:3010',
    AUTHORIZATION_PSK: 'secret',
  };
}
