#!/usr/bin/env node
import { initApp } from './app';
import { AppDataSource } from './database/dataSource';
import { logger } from '@crosslab/service-common';

async function startUpdateService() {
    await AppDataSource.initialize();
    initApp();

    logger.log('info', 'Update Service started successfully');
}

/* istanbul ignore if */
if (require.main === module) {
    startUpdateService();
}
