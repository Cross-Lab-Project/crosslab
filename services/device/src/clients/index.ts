import { config } from '../config.js';
import { Client as AuthenticationClient } from './authentication/client.js';

export const authentication = new AuthenticationClient(
  config.BASE_URL,
  {
    serviceUrl: config.AUTH_SERVICE_URL,
  }
);
