#!/usr/bin/env node
import { logger } from '@crosslab/service-common';

import app from './app.js';
import { checkConfig, config } from './config.js';
import { ApplicationDataSource } from './database/datasource.js';
import { opa_init, opa_set_jwt_secret } from './opa.js';
import { openfga_init } from './openfga.js';

async function initialize() {
  checkConfig();
  await ApplicationDataSource.initialize();
  await opa_init();
  await openfga_init();
  await opa_set_jwt_secret(config.JWT_SECRET);

  app.listen(config.PORT);
  logger.log('info', 'Authorization Service started successfully');
}
initialize();
