import { utils } from '@crosslab/service-common';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: parseInt(process.env.PORT ?? '3000'),
  BASE_URL: process.env.BASE_URL ?? 'http://localhost',
  AUTHORIZATION_SERVER:
    process.env.AUTHORIZATION_SERVER ||
    utils.die('Environment variable AUTHORIZATION_PSK must be set'),
  AUTHORIZATION_PSK:
    process.env.AUTHORIZATION_PSK ||
    utils.die('Environment variable AUTHORIZATION_PSK must be set'),
};
