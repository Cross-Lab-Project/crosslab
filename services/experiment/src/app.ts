import { authorization, error, logging } from '@crosslab/service-common';
import express from 'express';

import { middleware as clientMiddleware } from './clients/index.js';
import { config } from './config.js';
import { app } from './generated/index.js';

export function initApp() {
  app.initService({
    preHandlers: [
      a => a.use(clientMiddleware),
      application => {
        application.use(express.json());
        application.use(express.urlencoded({ extended: false }));
        application.use(logging.middleware());
        application.use(authorization.middleware());
      },
    ],
    postHandlers: [
      application => {
        application.get('/experiment/status', (_req, res) => {
          res.send({ status: 'ok' });
        });
      },
    ],
    errorHandler: error.middleware,
  });
  app.listen(config.PORT);
}
