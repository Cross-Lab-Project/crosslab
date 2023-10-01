import { logging } from '@crosslab/service-common';
import { logger } from '@crosslab/service-common/logging';

import { initApp } from './app.js';
import { AppDataSource, repositories } from './database/dataSource.js';

async function main() {
  logging.init();
  try {
    await AppDataSource.initialize();

    // TODO: handle peerconnections according to their status
    const peerconnections = await repositories.peerconnection.find();
    peerconnections.forEach(peerconnection =>
      repositories.peerconnection.remove(peerconnection),
    );

    initApp();
    logger.info('Device Service started successfully');
  } catch (e) {
    logger.error(e);
  }
}

main();
