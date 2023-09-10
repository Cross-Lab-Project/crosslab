import { logger } from './logger.js';

export function die(reason: string): string {
  logger.log('error', reason);
  process.exit(1);
}
