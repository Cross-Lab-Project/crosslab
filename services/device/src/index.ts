import { IncomingMessage } from 'http'
// import { createRemoteJWKSet, jwtVerify } from 'jose'
import { Socket } from 'net'
import WebSocket from 'ws'
import { config } from './config'
import { AppDataSource } from './data_source'
import { app } from './generated/index'
// import { UserType } from './generated/types'
import { deviceHandling } from './operations/devices'

declare global {
    namespace Express {
        interface Application {
            run(): void;
            ws(path: string, listener: (socket: WebSocket)=>void): void;
            wsListeners: Map<string, (socket: WebSocket)=>void>;
        }
    }
}

// const getKey: JWTVerifyGetKey = async (_protectedHeader, _token) => {
//     const response = await fetch(config.BASE_URL + "/.well-known/openid-configuration")
//     const endpoint = (await response.json()).jwks_uri
//     const key = await fetch(config.BASE_URL + endpoint)
//     return await key.json()
// }

AppDataSource.initialize()
    .then(() => {
        app.use((req, _res, next) => {
            for (const param in req.query) {
                if (typeof req.query[param] == "string") {
                    if (req.query[param] == "true") {
                        (req.query[param] as any) = true
                    } else if (req.query[param] == "false") {
                        (req.query[param] as any) = false
                    } else if (req.query[param] == "undefined") {
                        (req.query[param] as any) = undefined
                    }
                }
            }
            next()
        })
        app.initService({
            // JWTVerify: async (jwt, scopes) => {
            //     if (!jwt) throw new Error("No jwt found")
            //     if (!config.SECURITY_ISSUER) throw new Error("No security issuer specified")
            //     const jwksUri = new URL(config.BASE_URL.endsWith("/") ? config.BASE_URL + ".well-known/jwks.json" : config.BASE_URL + "/.well-known/jwks.json")
            //     const JWKS = createRemoteJWKSet(jwksUri)
            //     const jwtVerifyResult = await jwtVerify(jwt, JWKS, { issuer: config.SECURITY_ISSUER, audience: config.SECURITY_AUDIENCE })
            //     const user = jwtVerifyResult.payload as UserType
            //     for (const scope of scopes) {
            //         if (!user.scopes.includes(scope)) throw new Error("Missing Scope: " + scope)
            //     }
            //     return user
            // }
            JWTVerify(_jwt, _scopes) {
                return { username: "testuser", role: "superadmin", scopes: [] }
            },
        })
        const wsServer = new WebSocket.Server({ noServer: true });
        app.wsListeners = new Map()
        app.ws = (path, listener) => app.wsListeners.set(path, listener)
        deviceHandling(app)
        const server = app.listen(config.PORT)
        server.on("upgrade", (request: IncomingMessage, socket: Socket, head: Buffer) => {
            const listener = app.wsListeners.get(request.url ?? "")
            if (listener) {
                wsServer.handleUpgrade(request, socket, head, (socket) => listener(socket))
            }
        })
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })