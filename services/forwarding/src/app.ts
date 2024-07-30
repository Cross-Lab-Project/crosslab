import { authorization, logging } from '@crosslab/service-common';
import express, { Application, ErrorRequestHandler, RequestHandler } from 'express';
import expressWs from 'express-ws';

import { config } from './config.js';
import { app } from './generated/index.js';
import { webSocketHandling } from './operations/rooms/room/ws.js';

export const errormiddleware: ErrorRequestHandler = (err, req, res, _next) => {
  const status = err.status || 500;
  const message = err.error || err.message;
  const errorName = err.name || 'Error';
  const stack = err.stack;
  if (['ValidationError'].includes(errorName)) {
    logging.logger.log('warn', 'ValidationError: ', { errors: err.errors });
  } else if (!(errorName in ['UnauthorizedError', 'ForbiddenError'])) {
    logging.logger.log('error', 'An error occurred during the handling of a request', {
      data: {
        error: errorName,
        status,
        message,
        method: req.method,
        url: req.url,
        stack,
      },
    });
  }
  res.status(status).send({ error: errorName, message });
};

export function initApp() {
  app.initService({
    preHandlers: [
      (application: Application) => {
        const wsInstance = expressWs(application);
        application.use(express.json());
        application.use(express.urlencoded({ extended: false }));
        application.use(logging.middleware() as RequestHandler);
        application.use(authorization.middleware(config) as RequestHandler);
        webSocketHandling(wsInstance.app);
      },
    ],
    postHandlers: [
      (application: Application) => {
        application.get('/forwarding/status', (_req, res) => {
          res.send({ status: 'ok' });
        });
      },
    ],
    errorHandler: errormiddleware,
  });
  app.listen(config.PORT);
}
