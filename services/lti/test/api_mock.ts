import express from 'express';
import http from 'http';

export class APIMock {
    app: http.Server | undefined;

    async init() {
        const app = express();
        app.post('/token', (_req, res) => {
            res.status(201);
            res.send('token');
        });
        app.use('/', (_req, res) => {
            res.status(500);
            res.send('Url not mocked');
        });

        app.listen(4000);
    }

    close() {
        if (this.app) {
            this.app.closeAllConnections();
            this.app.close();
        }
    }
}
