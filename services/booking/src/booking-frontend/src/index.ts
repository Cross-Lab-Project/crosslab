import { authorization, error } from '@crosslab/service-common';
import express from 'express';

import { config } from './config.js';
import { app } from './generated/index.js';

app.initService({
  preHandlers: [
    application => {
      application.use(express.json());
      application.use(express.urlencoded({ extended: false }));
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
