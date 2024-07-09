import { baseConfig, die } from '@crosslab/booking-service-common';

const PORT = parseInt(process.env.PORT ?? '3006');
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
  API_TOKEN:
    process.env.API_TOKEN ?? die('the environment variable API_TOKEN is not defined!'),
  BookingDSN: process.env.BOOKING_DSN ?? baseConfig.BookingDSN,
  ReservationDSN: process.env.BOOKING_DSN ?? baseConfig.BookingDSN,
  CallbackDSN: process.env.BOOKING_DSN ?? baseConfig.BookingDSN,
  OwnURL: process.env.BASE_URL ?? DEFAULT_BASE_URL,
  InstitutePrefix:[process.env.BASE_URL ?? DEFAULT_BASE_URL],
  AmqpUrl:  process.env.AMQP_URL ?? baseConfig.AmqpUrl,
};
