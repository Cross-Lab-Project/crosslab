import { config } from '../config.js';
import { Client as AuthenticationClient } from './authentication/client.js';
import { Client as DeviceClient } from './device/client.js';
import { Client as FederationClient } from './federation/client.js';

export const authentication = new AuthenticationClient(config.BASE_URL, {
  serviceUrl: config.AUTH_SERVICE_URL,
  fixedHeaders: [['x-request-authentication', 'device-service']],
});

export const device = new DeviceClient(config.BASE_URL, {
  fixedHeaders: [['x-request-authentication', 'device-service']],
});

export const federation = new FederationClient(config.BASE_URL, {
  serviceUrl: config.FEDERATION_SERVICE_URL,
  fixedHeaders: [['x-request-authentication', 'device-service']],
});
