import { logger } from '@crosslab/service-common';

import { ApplicationDataSource } from '../../src/database/datasource';
import { opa_deinit, opa_init, opa_set_jwt_secret } from '../../src/opa';
import { openfga_deinit, openfga_init } from '../../src/openfga';

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

process.env['AUTHORIZATION_PSK'] = 'TestPSK';
process.env['JWT_SECRET'] = 'secret';
