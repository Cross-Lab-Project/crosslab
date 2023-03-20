#!/usr/bin/env node

import { config } from './config'
import { AppDataSource } from './database/data_source'
import { app } from './generated/index'
import { callbackHandling } from './util/callbacks'
import expressWinston from 'express-winston'
import { logger } from './util/requestHandler'
import { JWTVerify } from '@crosslab/service-common'

AppDataSource.initialize()
    .then(() => {
        app.use(expressWinston.logger({
            winstonInstance: logger,
            meta: true, // optional: control whether you want to log the meta data about the request (default to true)
            msg: "HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
            expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
            colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
            ignoreRoute: function (_req, _res) { return false; }, // optional: allows to skip some log messages based on request and/or response
            requestFilter: (req, propName) => {
                if (propName === "headers" && req.headers.authorization)
                    return {
                        ...req.headers,
                        authorization: "HIDDEN"
                    }
                return req[propName]
            }
        }));

        app.get('/experiment/status', (_req, res) => {
            res.send({ status: 'ok' })
        });

        app.initService({
            security: { 
                "JWT": JWTVerify(config) as any
            },
            additionalHandlers: [
                callbackHandling
            ]
        })
        app.listen(config.PORT)
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err)
    })
