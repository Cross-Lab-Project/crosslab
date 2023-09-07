import { config } from '../config.js';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource(config.orm);
