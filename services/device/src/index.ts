#!/usr/bin/env node

import { IncomingMessage } from 'http'
import { createRemoteJWKSet, jwtVerify } from 'jose'
import { Socket } from 'net'
import WebSocket from 'ws'
import { config } from './config'
import { AppDataSource } from './data_source'
import { app } from './generated/index'
import { isUserType } from './generated/types'
import { peerconnectionsCallbackHandling } from './methods/callbacks'
import { deviceHandling } from './operations'
import { JWTVerificationError } from './types/errors'

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
        app.initService({
            security: {
                JWT: async (req, scopes) => {
                    const authorization_header = req.header("Authorization")
                    if (authorization_header === undefined) {
                        throw new JWTVerificationError("Authorization header is not set", 401)
                    }
                    const bearerTokenResult = /^Bearer (.*)$/.exec(authorization_header);
                    if (bearerTokenResult === null || bearerTokenResult.length != 2) {
                        throw new JWTVerificationError("Authorization header is malformed", 401)
                    }
                    const jwt = bearerTokenResult[1]
                    if (!jwt) throw new JWTVerificationError('No JWT provided', 401)
                    if (!config.SECURITY_ISSUER)
                        throw new JWTVerificationError('No security issuer specified', 500)
                    const jwksUri = new URL(
                        config.BASE_URL.endsWith('/')
                            ? config.BASE_URL + '.well-known/jwks.json'
                            : config.BASE_URL + '/.well-known/jwks.json'
                    )
                    const JWKS = createRemoteJWKSet(jwksUri)
                    const jwtVerifyResult = await jwtVerify(jwt, JWKS, {
                        issuer: config.SECURITY_ISSUER,
                        audience: config.SECURITY_AUDIENCE,
                    })
                    if (!isUserType(jwtVerifyResult.payload))
                        throw new JWTVerificationError('Payload is malformed', 401)
                    const user = jwtVerifyResult.payload
                    for (const scope of scopes) {
                        if (user.scopes.includes(scope)) {
                            return user
                        }
                    }
                    throw new JWTVerificationError('Missing Scope: one of ' + scopes, 403)
                }
            }
        })
        peerconnectionsCallbackHandling(app)
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
