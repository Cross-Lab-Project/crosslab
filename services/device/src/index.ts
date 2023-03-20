#!/usr/bin/env node
import { config, dataSourceConfig } from './config'
import { AppDataSource } from './database/dataSource'
import { app } from './generated/index'
import { callbackHandling } from './operations/callbacks'
import { websocketHandling } from './operations/devices'
import { JWTVerify } from '@crosslab/service-common'
import { IncomingMessage } from 'http'
import { Socket } from 'net'
import WebSocket from 'ws'

declare global {
    namespace Express {
        interface Application {
            run(): void
            ws(path: string, listener: (socket: WebSocket) => void): void
            wsListeners: Map<string, (socket: WebSocket) => void>
        }
    }
}

AppDataSource.initialize(dataSourceConfig)
    .then(() => {
        app.use((req, _res, next) => {
            for (const param in req.query) {
                if (typeof req.query[param] == 'string') {
                    if (req.query[param] == 'true') {
                        ;(req.query[param] as any) = true
                    } else if (req.query[param] == 'false') {
                        ;(req.query[param] as any) = false
                    } else if (req.query[param] == 'undefined') {
                        ;(req.query[param] as any) = undefined
                    }
                }
            }
            next()
        })

        app.get('/device/status', (_req, res) => {
            res.send({ status: 'ok' })
        });

        app.initService({
            security: {
                JWT: JWTVerify(config) as any,
            },
            additionalHandlers: [callbackHandling],
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
                    wsServer.handleUpgrade(request, socket, head, (socket) =>
                        listener(socket)
                    )
                }
            }
        )
        console.log('Device Service started successfully')
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err)
    })
