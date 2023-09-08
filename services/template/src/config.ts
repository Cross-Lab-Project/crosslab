import { logger } from '@crosslab/service-common';

export function die(reason: string): string {
  logger.log('error', reason);
  process.exit(1);
}

export const config = {
  PORT: parseInt(process.env.PORT ?? '3000'),
};
