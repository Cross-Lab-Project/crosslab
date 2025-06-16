import { RequestHandler } from 'express';

import { config } from '../config.js';
import { Client as AuthenticationClient } from './authentication/client.js';
import { Client as DeviceClient } from './device/client.js';
import { Client as ExperimentClient } from './experiment/client.js';

export const experiment = new ExperimentClient(config.BASE_URL, {
  serviceUrl: config.EXPERIMENT_SERVICE_URL,
  fixedHeaders: [['x-request-authentication', 'root']],
});
export const authentication = new AuthenticationClient(config.BASE_URL, {
    serviceUrl: config.AUTH_SERVICE_URL,
    fixedHeaders: [['x-request-authentication', 'root']],
    });
export const device = new DeviceClient(config.BASE_URL, {
  serviceUrl: config.DEVICE_SERVICE_URL,
  fixedHeaders: [['x-request-authentication', 'root']],
  });
export const clients = { experiment,authentication, device };
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

  const bound_experiment = new ExperimentClient(config.BASE_URL, {
    serviceUrl: config.EXPERIMENT_SERVICE_URL,
    fixedHeaders: fixed_headers,
  });
  const bound_authentication = new AuthenticationClient(config.BASE_URL, {
    serviceUrl: config.AUTH_SERVICE_URL,
    fixedHeaders: fixed_headers,
  });
  const bound_device = new DeviceClient(config.BASE_URL, {
    serviceUrl: config.AUTH_SERVICE_URL,
    fixedHeaders: fixed_headers,
  });
  req.clients = { experiment: bound_experiment, authentication: bound_authentication, device: bound_device };

  next();
};
