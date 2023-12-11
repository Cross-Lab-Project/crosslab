import { logging } from '@crosslab/service-common';
import { logger } from '@crosslab/service-common/logging';

import { initApp } from './app.js';
import { AppDataSource } from './database/dataSource.js';

async function main() {
  logging.init();
  try {
    await AppDataSource.initialize();
    initApp();
    logger.info('Experiment Service started successfully');
  } catch (e) {
    logger.error(e);
  }
}

main();
