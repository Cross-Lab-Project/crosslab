import { logger } from '@crosslab/service-common';

import repositorySuite from './repositories/index.spec.js';

const tests = [repositorySuite];

describe('Database', function () {
  this.beforeAll(function () {
    logger.transports.forEach(transport => (transport.silent = true));
  });

  for (const test of tests) {
    test();
  }
});
