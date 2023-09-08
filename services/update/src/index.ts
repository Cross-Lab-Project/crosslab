#!/usr/bin/env node
import { logger } from '@crosslab/service-common';

import { initApp } from './app';
import { AppDataSource } from './database/dataSource';

async function startUpdateService() {
  await AppDataSource.initialize();
  initApp();

  logger.log('info', 'Update Service started successfully');
}

/* istanbul ignore if */
if (require.main === module) {
  startUpdateService();
}
