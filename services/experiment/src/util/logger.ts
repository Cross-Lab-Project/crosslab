import { AsyncLocalStorage } from 'async_hooks'
import { randomUUID } from 'crypto'
import * as express from 'express'
import expressWinston from 'express-winston'
import winston, { Logger, format, transports, createLogger } from 'winston'

export const asyncLocalStorage = new AsyncLocalStorage<{ requestID: string }>()

const requestIdMiddleware: express.RequestHandler = (_req, _res, next) => {
    asyncLocalStorage.run({ requestID: randomUUID() }, () => {
        next()
    })
}

/**
 * The possible log level names
 */
export type LogLevelName = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'

/**
 * The mapping of the possible log level names to their corresponding level
 */
const logLevels: Record<LogLevelName, number> = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
}

const addRequestID = winston.format((info) => {
    const requestID = asyncLocalStorage.getStore()?.requestID
    if (requestID) info.requestID = requestID
    return info
})

export const logger: Logger = createLogger({
    format: winston.format.combine(addRequestID(), format.json()),
    exitOnError: false,
    levels: logLevels,
    transports: [new transports.Console({ level: 'debug' })],
})

export function installLogger(app: express.Application) {
    app.use(requestIdMiddleware)

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
}
