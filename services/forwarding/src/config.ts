import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: parseInt(process.env.PORT ?? '3020'),
  BASE_URL: process.env.BASE_URL ?? 'http://localhost',
};
