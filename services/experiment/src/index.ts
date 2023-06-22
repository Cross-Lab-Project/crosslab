#!/usr/bin/env node
import { config } from './config'
import { AppDataSource } from './database/dataSource'
import { app } from './generated/index'
import { apiClient } from './methods/api'
import { callbackHandling } from './operations/callbacks'
import {
    JWTVerify,
    errorHandler,
    logHandling,
    logger,
    missingRouteHandling,
    requestIdHandling,
} from '@crosslab/service-common'
import '@crosslab/service-common'

async function startExperimentService() {
    await AppDataSource.initialize()

    apiClient.accessToken = config.API_TOKEN

    app.get('/experiment/status', (_req, res) => {
        res.send({ status: 'ok' })
    })

    app.initService({
        security: {
            JWT: JWTVerify(config) as any,
        },
        preHandlers: [requestIdHandling, logHandling],
        postHandlers: [callbackHandling, missingRouteHandling],
        errorHandler: errorHandler,
    })

    app.listen(config.PORT)

    logger.log('info', 'Experiment Service started successfully')
}

/** istanbul ignore if */
if (require.main === module) {
    startExperimentService()
}
