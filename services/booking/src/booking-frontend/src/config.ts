import { baseConfig, die } from '@crosslab/booking-service-common';

const PORT = parseInt(process.env.PORT ?? '3000');
const DEFAULT_BASE_URL = 'http://localhost:' + PORT;

export const config = {
  ...baseConfig,
  PORT,
  BASE_URL: process.env.BASE_URL ?? DEFAULT_BASE_URL,
  JWKS_URL: process.env.JWKS_URL ?? 'http://localhost/.well-known/jwks.json',
  SECURITY_ISSUER:
    process.env.SECURITY_ISSUER ??
    die('the environment variable SECURITY_ISSUER is not defined!'),
  SECURITY_AUDIENCE:
    process.env.SECURITY_AUDIENCE ??
    die('the environment variable SECURITY_AUDIENCE is not defined!'),
};
