import { logger } from '@crosslab/service-common';

import { initTestDatabase } from '../database/repositories/index.spec';
import availabilitySpec from './availability.spec.js';
import callbacksSpec from './callbacks.spec.js';
// import signalingSpec from './signaling.spec.js'
import urlFromIdSpec from './urlFromId.spec.js';

// const tests = [availabilitySpec, callbacksSpec, signalingSpec, urlFromIdSpec]
const tests = [availabilitySpec, callbacksSpec, urlFromIdSpec];

describe('Methods', function () {
  this.beforeAll(async function () {
    await initTestDatabase();
    logger.transports.forEach(transport => (transport.silent = true));
  });

  for (const test of tests) {
    test();
  }
});
