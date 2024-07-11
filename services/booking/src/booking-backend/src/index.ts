import { authorization, error, logging } from '@crosslab/service-common';
import express, { Application, ErrorRequestHandler, RequestHandler } from 'express';

import { handleDeviceReservationRequest, handleFreeDeviceRequest } from './amqpHandle.js';
import { config } from './config.js';
import { app } from './generated/index.js';

logging.init();
app.initService({
  preHandlers: [
    (application: Application) => {
      application.use(express.json());
      application.use(express.urlencoded({ extended: false }));
      application.use(logging.middleware() as RequestHandler);
      application.use(authorization.middleware() as RequestHandler);
    },
  ],
  postHandlers: [
    (application: Application) => {
      application.get('/federation/status', (_req, res) => {
        res.send({ status: 'ok' });
      });
    },
  ],
  errorHandler: error.middleware as ErrorRequestHandler,
});

console.log('Starting booking-backend');
app.listen(config.PORT);
handleDeviceReservationRequest();
handleFreeDeviceRequest();
