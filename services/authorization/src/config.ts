import { config as CommonConfig, utils } from '@crosslab/service-common';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: parseInt(process.env.PORT ?? '3010'),
  PSK: process.env['AUTHORIZATION_PSK']!,
  JWT_SECRET: process.env['JWT_SECRET']!,
  orm: {
    ...CommonConfig.readOrmConfig(),
  },
};

export function checkConfig() {
  config.PSK ?? utils.die('AUTHORIZATION_PSK is not set');
  config.JWT_SECRET ?? utils.die('JWT_SECRET is not set');
}
