import { IncomingMessage } from 'http'
import { createRemoteJWKSet, jwtVerify } from 'jose'
import { Socket } from 'net'
import WebSocket from 'ws'
import { config } from './config'
import { AppDataSource } from './data_source'
import { app } from './generated/index'
import { UserType } from './generated/types'
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

function extract_jwt_from_request(req: IncomingMessage, jwtExtractionRegEx: RegExp = /^Bearer (.*)$/): string {
    const authorization_header = req.headers.authorization
    if (authorization_header === undefined) {
        throw new Error("Authorization Header is not set")
    }
    const bearer_token_result = jwtExtractionRegEx.exec(authorization_header);
    if (bearer_token_result === null || bearer_token_result.length != 2) {
        throw new Error("the access token in the Authorization Header is malformed")
    }
    return bearer_token_result[1]
}

async function JWTVerify(jwt: string | undefined, scopes: string[]) {
    if (!jwt) throw new Error("No jwt found")
    if (!config.SECURITY_ISSUER) throw new Error("No security issuer specified")
    const jwksUri = new URL(config.BASE_URL.endsWith("/") ? config.BASE_URL + ".well-known/jwks.json" : config.BASE_URL + "/.well-known/jwks.json")
    const JWKS = createRemoteJWKSet(jwksUri)
    const jwtVerifyResult = await jwtVerify(jwt, JWKS, { issuer: config.SECURITY_ISSUER, audience: config.SECURITY_AUDIENCE })
    const user = jwtVerifyResult.payload as UserType
    for (const scope of scopes) {
        if (!user.scopes.includes(scope)) throw new Error("Missing Scope: " + scope)
    }
    return user
}

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
            JWTVerify: JWTVerify
        })
        const wsServer = new WebSocket.Server({ noServer: true });
        app.wsListeners = new Map()
        app.ws = (path, listener) => app.wsListeners.set(path, listener)
        deviceHandling(app)
        const server = app.listen(config.PORT)
        server.on("upgrade", async (request: IncomingMessage, socket: Socket, head: Buffer) => {
            try {
                const jwt = extract_jwt_from_request(request)
                await JWTVerify(jwt, ["device","device:connect"])
            } catch(err) {
                console.error("JWT Verification failed: Websocket connection can not be established")
                return
            }
            const listener = app.wsListeners.get(request.url ?? "")
            if (listener) {
                wsServer.handleUpgrade(request, socket, head, (socket) => listener(socket))
            }
        })
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })