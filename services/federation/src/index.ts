import { logger, logging } from '@crosslab/service-common';

import { initApp } from './app.js';
import { AppDataSource } from './database/dataSource.js';

async function main() {
  logging.init();
  await AppDataSource.initialize();
  initApp();

  logger.log('info', 'Federation Service started successfully');
}

main();
