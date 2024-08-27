#!/usr/bin/env node
import { authorization, error, logger, logging } from '@crosslab/service-common';
import express, { Application } from 'express';

import { middleware as clientMiddleware } from './clients/index.js';
import { config } from './config.js';
import { app } from './generated/index.js';

export function init_app() {
  app.initService({
    preHandlers: [
      (application: Application) => {
        application.use((req, _res, next) => {
          logger.info(req.headers);
          next();
        });
        application.use(express.json());
        application.use(express.urlencoded({ extended: false }));
        application.use(logging.middleware());
        application.use(authorization.middleware(config));
        application.use(clientMiddleware);
      },
    ],
    postHandlers: [
      (application: Application) => {
        application.get('/device/status', (_req, res) => {
          res.send({ status: 'ok' });
        });
      },
    ],
    errorHandler: error.middleware,
  });

  app.listen(config.PORT);
}
