#!/usr/bin/env node
import { logging } from '@crosslab/service-common';

import { init_app } from './app';
import { config } from './config';
import { init_database } from './database/datasource';

async function initialize() {
  logging.init();
  try {
    await init_database();
    const app = init_app();
    app.listen(config.PORT);
    logging.logger.log('info', 'Authentication Service started successfully');
  } catch (e) {
    logging.logger.log('error', 'Authentication Service failed to start', e);
  }
}

initialize();
