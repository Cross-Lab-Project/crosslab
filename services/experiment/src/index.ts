#!/usr/bin/env node
import { config } from './config'
import { AppDataSource } from './database/data_source'
import { app } from './generated/index'
import { apiClient } from './util/api'
import { callbackHandling } from './util/callbacks'
import { logger } from './util/logger'
import { JWTVerify } from '@crosslab/service-common'
import expressWinston from 'express-winston'

AppDataSource.initialize()
    .then(() => {
        apiClient.accessToken = config.API_TOKEN

        app.use(
            expressWinston.logger({
                winstonInstance: logger,
                // optional: control whether you want to log the meta data about the request (default to true)
                meta: true,
                // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
                msg: 'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}',
                // Use the default Express/morgan request formatting. Enabling this will override any msg if true.
                // Will only output colors with colorize set to true
                expressFormat: true,
                // Color the text and status code, using the Express/morgan color palette
                // (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
                colorize: false,
                // optional: allows to skip some log messages based on request and/or response
                ignoreRoute: function (_req, _res) {
                    return false
                },
                requestFilter: (req, propName) => {
                    if (propName === 'headers' && req.headers.authorization)
                        return {
                            ...req.headers,
                            authorization: 'HIDDEN',
                        }
                    return req[propName]
                },
            })
        )

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
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err)
    })
