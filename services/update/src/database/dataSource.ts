import { DataSource } from 'typeorm';

import { config } from '../config';

export const AppDataSource = new DataSource(config.orm);
