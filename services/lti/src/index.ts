#!/usr/bin/env node
import { logging } from '@crosslab/service-common';

import { init_app } from './app.js';
import { init_database } from './database/datasource.js';
import { init_key_management } from './key_management.js';

async function main() {
  logging.init();
  try {
    await init_database();
    await init_key_management();
    await init_app();
    logging.logger.info('LTI Service started successfully');
  } catch (e) {
    logging.logger.error(e);
  }
}

main();
