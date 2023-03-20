#!/usr/bin/env node

import { JWTVerify } from '@crosslab/service-common'
import { IncomingMessage } from 'http'
import { Socket } from 'net'
import WebSocket from 'ws'
import { config } from './config'
import { AppDataSource } from './data_source'
import { app } from './generated/index'
import { callbackHandling } from './methods/callbacks'
import { deviceHandling } from './operations/websocket'

declare global {
    namespace Express {
        interface Application {
            run(): void
            ws(path: string, listener: (socket: WebSocket) => void): void
            wsListeners: Map<string, (socket: WebSocket) => void>
        }
    }
}

AppDataSource.initialize()
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
                JWT: JWTVerify(config) as any
            },
            additionalHandlers: [
                callbackHandling
            ]
        })
        const wsServer = new WebSocket.Server({ noServer: true })
        app.wsListeners = new Map()
        app.ws = (path, listener) => app.wsListeners.set(path, listener)
        deviceHandling(app)
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
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err)
    })
