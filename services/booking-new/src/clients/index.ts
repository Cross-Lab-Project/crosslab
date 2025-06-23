import { config } from '../config.js';
import { Client as DeviceClient } from './device/client.js';

export const device = new DeviceClient(config.BASE_URL, {
  serviceUrl: config.DEVICE_SERVICE_URL,
  fixedHeaders: [['x-request-authentication', 'device-service']],
});
