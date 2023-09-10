import { RequestHandler } from 'express';

import { config } from '../config.js';
import { Client as DeviceClient } from './device/client.js';

export const device = new DeviceClient(config.BASE_URL, config.DEVICE_SERVICE_URL);
export const clients = { device };
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
  const fixed_headers = Object.entries(req.headers)
    .filter(([key]) => forward_headers.includes(key))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  const bound_device = new DeviceClient(
    config.BASE_URL,
    config.DEVICE_SERVICE_URL,
    fixed_headers,
  );
  req.clients = { device: bound_device };

  next();
};
