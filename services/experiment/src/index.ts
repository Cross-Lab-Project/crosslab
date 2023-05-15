#!/usr/bin/env node
import { config, dataSourceConfig } from './config'
import { AppDataSource } from './database/dataSource'
import { app } from './generated/index'
import { apiClient } from './util/api'
import { callbackHandling } from './util/callbacks'
import { installLogger, logger } from './util/logger'
import { JWTVerify } from '@crosslab/service-common'

async function startExperimentService() {
    await AppDataSource.initialize(dataSourceConfig)

    apiClient.accessToken = config.API_TOKEN

    installLogger(app)

    app.get('/experiment/status', (_req, res) => {
        res.send({ status: 'ok' })
    })

    app.initService({
        security: {
            JWT: JWTVerify(config) as any,
        },
        additionalHandlers: [callbackHandling],
    })

    app.listen(config.PORT)

    logger.log('info', 'Experiment Service started successfully')
}

/* istanbul ignore if */
if (require.main === module) {
    startExperimentService()
}
