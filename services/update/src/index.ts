#!/usr/bin/env node
import { config } from './config'
import { AppDataSource } from './database/dataSource'
import { app } from './generated/index'
import { isUserTypeJWT } from './generated/types'
import {
    JWTVerify,
    errorHandler,
    logHandling,
    logger,
    missingRouteHandling,
    parseJwtFromRequestAuthenticationHeader,
    requestIdHandling,
} from '@crosslab/service-common'

async function startUpdateService() {
    await AppDataSource.initialize()

    app.get('/update/status', (_req, res) => {
        res.send({ status: 'ok' })
    })

    app.initService({
        security: {
            JWT: JWTVerify(
                config,
                isUserTypeJWT,
                parseJwtFromRequestAuthenticationHeader
            ),
        },
        preHandlers: [requestIdHandling, logHandling],
        postHandlers: [missingRouteHandling],
        errorHandler: errorHandler,
    })

    app.listen(config.PORT)

    logger.log('info', 'Update Service started successfully')
}

/* istanbul ignore if */
if (require.main === module) {
    startUpdateService()
}
