import { logger } from '@crosslab/service-common';

import { checkConfig, config } from '../../src/config.js';
import { ApplicationDataSource } from '../../src/database/datasource.js';
import { opa_deinit, opa_init, opa_set_jwt_secret } from '../../src/opa.js';
import { openfga_deinit, openfga_init } from '../../src/openfga.js';


export async function mochaGlobalSetup() {
  logger.transports.forEach(t => (t.level = 'error'));
  await ApplicationDataSource.initialize();
  await opa_init();
  await openfga_init();
  await opa_set_jwt_secret('secret');
}

export async function mochaGlobalTeardown() {
  opa_deinit();
  openfga_deinit();
}

config.PSK = 'TestPSK';
config.JWT_SECRET = 'secret';
checkConfig();