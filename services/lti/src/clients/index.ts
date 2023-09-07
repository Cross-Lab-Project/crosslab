import { config } from '../config.js';
import {Client as AuthenticationClient} from './authentication/client.js';
import {Client as ExperimentClient} from './experiment/client.js';

export const authentication = new AuthenticationClient(config.BASE_URL, config.AUTH_SERVICE_URL);
export const experiment = new ExperimentClient(config.BASE_URL, config.EXPERIMENT_SERVICE_URL);