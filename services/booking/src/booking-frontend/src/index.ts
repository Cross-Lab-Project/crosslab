import { authorization, error, logging } from '@crosslab/service-common';
import express from 'express';

import { config } from './config.js';
import { app } from './generated/index.js';

logging.init();
app.initService({
  preHandlers: [
    application => {
      application.use(express.json());
      application.use(express.urlencoded({ extended: false }));
      application.use(logging.middleware() as express.RequestHandler);
      application.use(authorization.middleware() as express.RequestHandler);
    },
  ],
  postHandlers: [
    application => {
      application.get('/federation/status', (_req, res) => {
        res.send({ status: 'ok' });
      });
    },
  ],
  errorHandler: error.middleware,
});

console.log('Starting booking-frontend');
app.listen(config.PORT);
