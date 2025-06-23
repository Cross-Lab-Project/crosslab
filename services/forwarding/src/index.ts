import { logger, logging } from '@crosslab/service-common';

import { initApp } from './app.js';

function main() {
  logging.init();
  try {
    initApp();
    logger.info('Forwarding Service started successfully');
  } catch (e) {
    logger.error(e);
  }
}

main();
