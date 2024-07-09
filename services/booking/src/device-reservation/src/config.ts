import { baseConfig, die } from '@crosslab/booking-service-common';

const PORT = parseInt(process.env.PORT ?? '3004');
const DEFAULT_BASE_URL = 'http://localhost:' + PORT;

export const config = {
  ...baseConfig,
  BookingDSN: process.env.BOOKING_DSN ?? baseConfig.BookingDSN,
  ReservationDSN: process.env.BOOKING_DSN ?? baseConfig.BookingDSN,
  CallbackDSN: process.env.BOOKING_DSN ?? baseConfig.BookingDSN,
  OwnURL: process.env.BASE_URL ?? DEFAULT_BASE_URL,
  InstitutePrefix:[process.env.BASE_URL ?? DEFAULT_BASE_URL],
  AmqpUrl:  process.env.AMQP_URL ?? baseConfig.AmqpUrl,
};
