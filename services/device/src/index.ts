import { initApp } from './app';
import { AppDataSource } from './database/dataSource';
import { logging } from '@crosslab/service-common';
import { logger } from '@crosslab/service-common/logging';

async function startDeviceService() {
    logging.init();
    try {
        await AppDataSource.initialize();
        initApp();
        logger.info('Device Service started successfully');
    } catch (e) {
        logger.error(e);
    }
}

/* istanbul ignore if */
if (require.main === module) {
    startDeviceService();
}
