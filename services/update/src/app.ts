import { authorization, error, logging } from '@crosslab/service-common';
import express from 'express';

import { config } from './config';
import { app } from './generated';

export function initApp() {
  app.initService({
    preHandlers: [
      application => {
        application.use(express.json());
        application.use(express.urlencoded({ extended: false }));
        application.use(logging.middleware());
        application.use(authorization.middleware());
      },
    ],
    postHandlers: [
      application => {
        application.get('/update/status', (_req, res) => {
          res.send({ status: 'ok' });
        });
      },
    ],
    errorHandler: error.middleware,
  });
  app.listen(config.PORT);
}
