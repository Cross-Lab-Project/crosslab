#!/usr/bin/env node
import { logger } from '@crosslab/service-common';

import app from './app';
import { config } from './config';
import { ApplicationDataSource } from './database/datasource';
import { opa_init, opa_set_jwt_secret } from './opa';
import { openfga_init } from './openfga';

async function initialize() {
  await ApplicationDataSource.initialize();
  await opa_init();
  await openfga_init();
  await opa_set_jwt_secret(config.JWT_SECRET);

  app.listen(config.PORT);
  logger.log('info', 'Authorization Service started successfully');
}
initialize();
