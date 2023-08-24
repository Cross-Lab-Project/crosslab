import { initApp } from './app';
import { AppDataSource } from './database/dataSource';
import { logger } from '@crosslab/service-common';

async function startExperimentService() {
    await AppDataSource.initialize();
    initApp();

    logger.log('info', 'Experiment Service started successfully');
}

/** istanbul ignore if */
if (require.main === module) {
    startExperimentService();
}
