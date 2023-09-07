import { config } from './config.js';
import { APIClient } from '@cross-lab-project/api-client';

export const apiClient = new APIClient(config.BASE_URL);
export const timeoutMap: Map<string, NodeJS.Timeout> = new Map();
export const WEEK = 1000 * 60 * 60 * 24 * 7;
