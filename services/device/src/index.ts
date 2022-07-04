import { IncomingMessage } from 'http';
import { Socket } from 'net';
import WebSocket from 'ws';
import { config } from './config'
import { AppDataSource } from './data_source'
import { app } from './generated/index'

declare global {
    namespace Express {
        interface Application {
            run(): void;
            ws(path: string, listener: (socket: WebSocket)=>void): void;
            wsListeners: Map<string, (socket: WebSocket)=>void>;
        }
    }
}

AppDataSource.initialize()
    .then(() => {
        app.initService({JWTVerify: (_jwt, _scopes) => {return {username: "testuser"}}})
        const wsServer = new WebSocket.Server({ noServer: true });
        app.wsListeners = new Map()
        app.ws = (path, listener) => app.wsListeners.set(path, listener)
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