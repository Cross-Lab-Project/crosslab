import {randomUUID} from 'crypto';
import * as express from 'express';

import {asyncLocalStorage} from '../logger';

export function requestIdHandling(app: express.Application) {
  app.use(requestIdMiddleware);
}

const requestIdMiddleware: express.RequestHandler = (_req, _res, next) => {
  asyncLocalStorage.run({requestID: randomUUID()}, () => {
    next();
  });
};
