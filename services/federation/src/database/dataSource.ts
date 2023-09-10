import { DataSource } from 'typeorm';

import { config } from '../config.js';

export const AppDataSource = new DataSource(config.orm);
