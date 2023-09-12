import { config } from '../config.js';
import { Client as AuthenticationClient } from './authentication/client.js';

export const authentication = new AuthenticationClient(
  config.BASE_URL,
  config.AUTH_SERVICE_URL,
);
