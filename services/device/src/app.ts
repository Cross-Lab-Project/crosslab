import { config } from './config';
import { app } from './generated';
import { websocketHandling } from './operations/devices';
import { logging, authorization, error } from '@crosslab/service-common';
import express from 'express';
import { IncomingMessage } from 'http';
import { Socket } from 'net';
import WebSocket from 'ws';

declare global {
    // eslint-disable-next-line
    namespace Express {
        interface Application {
            ws(path: string, listener: (socket: WebSocket) => void): void;
            wsListeners: Map<string, (socket: WebSocket) => void>;
        }
    }
}

function setupWebsockets(localApp: express.Application) {
    const wsServer = new WebSocket.Server({ noServer: true });
    localApp.wsListeners = new Map();
    localApp.ws = (path, listener) => localApp.wsListeners.set(path, listener);
    websocketHandling(localApp);

    const originalListen = localApp.listen;
    localApp.listen = (port) => {
        localApp.listen = originalListen;
        const server = localApp.listen(port);
        server.on(
            'upgrade',
            async (request: IncomingMessage, socket: Socket, head: Buffer) => {
                const listener = app.wsListeners.get(request.url ?? '');
                if (listener) {
                    wsServer.handleUpgrade(request, socket, head, (webSocket) =>
                        listener(webSocket),
                    );
                }
            },
        );
        return server;
    };
    return localApp;
}

export function initApp() {
    app.initService({
        preHandlers: [
            setupWebsockets,
            (application) => {
                application.use(express.json());
                application.use(express.urlencoded({ extended: false }));
                application.use(logging.middleware());
                application.use(authorization.middleware());
            },
        ],
        postHandlers: [
            (application) => {
                application.get('/device/status', (_req, res) => {
                    res.send({ status: 'ok' });
                });
            },
        ],
        errorHandler: error.middleware,
    });
    app.listen(config.PORT);
}
