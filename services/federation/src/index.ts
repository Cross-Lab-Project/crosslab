#!/usr/bin/env node
import { config } from './config'
import { AppDataSource } from './data_source'
import { app } from './generated/index'
import { isUserTypeJWT } from './generated/types'
import {
    JWTVerify,
    errorHandler,
    logHandling,
    logger,
    missingRouteHandling,
    requestIdHandling,
    parseJwtFromAuthorizationHeader,
} from '@crosslab/service-common'

async function startFederationService() {
    await AppDataSource.initialize()

    app.get('/federation/status', (_req, res) => {
        res.send({ status: 'ok' })
    })

    app.initService({
        security: {
            JWT: JWTVerify(config, isUserTypeJWT, parseJwtFromAuthorizationHeader),
        },
        preHandlers: [requestIdHandling, logHandling],
        postHandlers: [missingRouteHandling],
        errorHandler: errorHandler,
    })

    app.listen(config.PORT)

    logger.log('info', 'Federation Service started successfully')
}

/* istanbul ignore if */
if (require.main === module) {
    startFederationService()
}
