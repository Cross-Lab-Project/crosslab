import { RequestHandler } from 'express';

import { config } from '../config.js';
import { Client as BookingBackendClient } from './booking-backend/client.js';
import { Client as BookingFrontendClient } from './booking-frontend/client.js';
import { Client as DeviceClient } from './device/client.js';
import { Client as ScheduleServiceClient } from './schedule-service/client.js';

export const device = new DeviceClient(config.BASE_URL, {
  serviceUrl: config.DEVICE_SERVICE_URL,
  fixedHeaders: [['x-request-authentication', 'experiment-service']],
});
export const booking = {
  backend: new BookingBackendClient(config.BASE_URL, {
    serviceUrl: config.BOOKING_BACKEND_URL,
    fixedHeaders: [['x-request-authentication', 'experiment-service']],
  }),
  frontend: new BookingFrontendClient(config.BASE_URL, {
    serviceUrl: config.BOOKING_FRONTEND_URL,
    fixedHeaders: [['x-request-authentication', 'experiment-service']],
  }),
  schedule: new ScheduleServiceClient(config.BASE_URL, {
    serviceUrl: config.SCHEDULE_SERVICE_URL,
    fixedHeaders: [['x-request-authentication', 'experiment-service']],
  }),
};
export const clients = { device, booking };
export type Clients = typeof clients;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      clients: typeof clients;
    }
  }
}

export const middleware: RequestHandler = (req, _res, next) => {
  const forward_headers = ['x-request-authentication'];
  const fixed_headers = forward_headers
    .map(forward_header => {
      const value = req.header(forward_header);
      if (value) return [forward_header, value] as [string, string];
      else return undefined;
    })
    .filter(fixed_header => !!fixed_header) as [string, string][];

  const bound_device = new DeviceClient(config.BASE_URL, {
    serviceUrl: config.DEVICE_SERVICE_URL,
    fixedHeaders: fixed_headers,
  });

  const bound_booking = {
    backend: new BookingBackendClient(config.BASE_URL, {
      serviceUrl: config.BOOKING_BACKEND_URL,
      fixedHeaders: fixed_headers,
    }),
    frontend: new BookingFrontendClient(config.BASE_URL, {
      serviceUrl: config.BOOKING_FRONTEND_URL,
      fixedHeaders: fixed_headers,
    }),
    schedule: new ScheduleServiceClient(config.BASE_URL, {
      serviceUrl: config.SCHEDULE_SERVICE_URL,
      fixedHeaders: fixed_headers,
    }),
  };

  req.clients = { device: bound_device, booking: bound_booking };

  next();
};
