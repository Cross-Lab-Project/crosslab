import { APIClient } from '@cross-lab-project/api-client';

import { config } from './config.js';

export const apiClient = new APIClient(config.BASE_URL);
export const timeoutMap: Map<string, NodeJS.Timeout> = new Map();
export const WEEK = 1000 * 60 * 60 * 24 * 7;
