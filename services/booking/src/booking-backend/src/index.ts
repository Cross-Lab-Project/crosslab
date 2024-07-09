import { authorization, error, logging } from '@cross-lab-project/service-common';
import express from 'express';


import { handleDeviceReservationRequest, handleFreeDeviceRequest } from './amqpHandle';
import { config } from './config';
import { app } from './generated';

export * from './messageDefinition';

if (require.main === module) {
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
        application.get('/federation/status', (_req, res) => {
          res.send({ status: 'ok' });
        });
      },
    ],
    errorHandler: error.middleware,
  });

  console.log('Starting booking-backend');
  app.listen(config.PORT);
  handleDeviceReservationRequest();
  handleFreeDeviceRequest();
}
