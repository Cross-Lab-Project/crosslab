import { config } from '../config.js';
import { Client as AuthenticationClient } from './authentication/client.js';
import { Client as ExperimentClient } from './experiment/client.js';

export const authentication = new AuthenticationClient(config.API_BASE_URL, {
  serviceUrl: config.AUTH_SERVICE_URL,
  fixedHeaders: [['x-request-authentication', 'user:root']],
});

export const experiment = new ExperimentClient(config.API_BASE_URL, {
  serviceUrl: config.EXPERIMENT_SERVICE_URL,
  fixedHeaders: [['x-request-authentication', 'user:root']],
});
