#!/usr/bin/env node
import { logging } from '@crosslab/service-common';

import { init_app } from './app.js';
import { ApplicationDataSource } from './database/datasource.js';
import { init_key_management } from './key_management.js';

async function main() {
  logging.init();
  try {
    await ApplicationDataSource.initialize();
    await init_key_management();
    await init_app();
    logging.logger.info('Device Service started successfully');
  } catch (e) {
    logging.logger.error(e);
  }
}

main();
