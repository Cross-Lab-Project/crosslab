import { logger } from '@crosslab/service-common';

import { initApp } from './app.js';
import { AppDataSource } from './database/dataSource.js';

async function main() {
  await AppDataSource.initialize();
  initApp();

  logger.log('info', 'Experiment Service started successfully');
}

main();
