import { authorization, error } from '@crosslab/service-common';
import express, { ErrorRequestHandler, RequestHandler } from 'express';

import { config } from './config.js';
import { app } from './generated/index.js';

app.initService({
  preHandlers: [
    application => {
      application.use(express.json());
      application.use(express.urlencoded({ extended: false }));
      application.use(authorization.middleware() as RequestHandler);
    },
  ],
  postHandlers: [
    application => {
      application.get('/federation/status', (_req, res) => {
        res.send({ status: 'ok' });
      });
    },
  ],
  errorHandler: error.middleware as ErrorRequestHandler,
});
console.log('Starting schedule-service');
app.listen(config.PORT);
