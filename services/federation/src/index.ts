import { initApp } from './app';
import { AppDataSource } from './database/dataSource';
import { logger } from '@crosslab/service-common';

async function startFederationService() {
    await AppDataSource.initialize();
    initApp();

    logger.log('info', 'Federation Service started successfully');
}

/* istanbul ignore if */
if (require.main === module) {
    startFederationService();
}
