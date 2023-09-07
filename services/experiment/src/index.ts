import { initApp } from './app.js';
import { AppDataSource } from './database/dataSource.js';
import { logger } from '@crosslab/service-common';

async function main() {
    await AppDataSource.initialize();
    initApp();

    logger.log('info', 'Experiment Service started successfully');
}

main();
