import { RequestHandler } from 'express';

import { config } from '../config.js';
import { Client as DeviceClient } from './device/client.js';

export const device = new DeviceClient(config.BASE_URL, {
  serviceUrl: config.DEVICE_SERVICE_URL,
  fixedHeaders: [['x-request-authentication', 'experiment-service']],
});
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
  req.clients = { device: bound_device };

  next();
};
