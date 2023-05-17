#!/usr/bin/env node
import { config, dataSourceConfig } from './config'
import { AppDataSource } from './database/dataSource'
import { app } from './generated/index'
import { apiClient } from './globals'
import { callbackHandling } from './operations/callbacks'
import { websocketHandling } from './operations/devices'
import {
    JWTVerify,
    errorHandler,
    logHandling,
    logger, // missingRouteHandling,
    requestIdHandling,
} from '@crosslab/service-common'
import { IncomingMessage } from 'http'
import { Socket } from 'net'
import WebSocket from 'ws'

declare global {
    // eslint-disable-next-line
    namespace Express {
        interface Application {
            run(): void
            ws(path: string, listener: (socket: WebSocket) => void): void
            wsListeners: Map<string, (socket: WebSocket) => void>
        }
    }
}

async function startDeviceService() {
    await AppDataSource.initialize(dataSourceConfig)

    apiClient.accessToken = config.API_TOKEN

    app.use((req, _res, next) => {
        for (const param in req.query) {
            if (typeof req.query[param] === 'string') {
                if (req.query[param] === 'true') {
                    // eslint-disable-next-line
                    ;(req.query[param] as any) = true
                } else if (req.query[param] === 'false') {
                    // eslint-disable-next-line
                    ;(req.query[param] as any) = false
                } else if (req.query[param] === 'undefined') {
                    // eslint-disable-next-line
                    ;(req.query[param] as any) = undefined
                }
            }
        }
        next()
    })

    app.get('/device/status', (_req, res) => {
        res.send({ status: 'ok' })
    })

    app.initService({
        security: {
            JWT: JWTVerify(config) as any,
        },
        preHandlers: [requestIdHandling, logHandling],
        postHandlers: [callbackHandling],
        errorHandler: errorHandler,
    })

    const wsServer = new WebSocket.Server({ noServer: true })
    app.wsListeners = new Map()
    app.ws = (path, listener) => app.wsListeners.set(path, listener)
    websocketHandling(app)

    const server = app.listen(config.PORT)
    server.on(
        'upgrade',
        async (request: IncomingMessage, socket: Socket, head: Buffer) => {
            const listener = app.wsListeners.get(request.url ?? '')
            if (listener) {
                wsServer.handleUpgrade(request, socket, head, (webSocket) =>
                    listener(webSocket)
                )
            }
        }
    )

    logger.log('info', 'Device Service started successfully')
}

/* istanbul ignore if */
if (require.main === module) {
    startDeviceService()
}
