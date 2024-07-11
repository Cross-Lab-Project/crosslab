export function die(reason: string): never {
  console.error(reason);
  process.exit(1);
}

export const baseConfig = {
  BookingDSN:
    'mysql://test:test@localhost/test?supportBigNumbers=true&bigNumberStrings=true',
  ReservationDSN: 'mysql://test:test@localhost/test',
  CallbackDSN: 'mysql://test:test@localhost/test',
  OwnURL: 'http://localhost',
  InstitutePrefix: ['http://localhost'],
  AmqpUrl: 'amqp://localhost:5672/',
  BASE_URL: process.env.BASE_URL ?? 'http://localhost',
  DEVICE_SERVICE_URL: process.env.DEVICE_SERVICE_URL ?? 'http://localhost:3001',
  BOOKING_FRONTEND_URL: process.env.BOOKING_FRONTEND_URL ?? 'http://localhost:3004',
  BOOKING_BACKEND_URL: process.env.BOOKING_BACKEND_URL ?? 'http://localhost:3005',
  SCHEDULE_SERVICE_URL: process.env.SCHEDULE_SERVICE_URL ?? 'http://localhost:3006',
};
