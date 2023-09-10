#!/usr/bin/env node
import { logging } from '@crosslab/service-common';

import { init_app } from './app.js';
import { config } from './config.js';
import { init_database } from './database/datasource.js';
import { init_users } from './user/index.js';

async function initialize() {
  logging.init();
  try {
    await init_database();
    await init_users();
    const app = init_app();
    app.listen(config.PORT);
    logging.logger.log('info', 'Authentication Service started successfully');
  } catch (e) {
    logging.logger.log('error', 'Authentication Service failed to start', e);
  }
}

initialize();
