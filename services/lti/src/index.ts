#!/usr/bin/env node
import { logging } from '@crosslab/service-common';

import { init_app } from './app.js';
import { init_key_management } from './business/key_management.js';
import { config } from './config.js';
import { init_database } from './database/datasource.js';

async function main() {
  logging.init();
  try {
    await init_database();
    await init_key_management();
    const app = await init_app();
    app.listen(config.PORT);
    //setInterval(deletePendingPlatforms, 1000*5);
    logging.logger.info('LTI Service started successfully');
  } catch (e) {
    logging.logger.error(e);
  }
}

main();
