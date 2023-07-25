import * as express from 'express';
import expressWinston from 'express-winston';

import {logger} from '../logger';

export function logHandling(app: express.Application) {
  app.use(
    expressWinston.logger({
      winstonInstance: logger,
      meta: true,
      expressFormat: true,
      colorize: false,
      ignoreRoute: function (_req, _res) {
        return false;
      },
      requestFilter: (req, propName) => {
        if (propName === 'headers' && req.headers.authorization) {
          if ('authorization' in req.headers) req.headers.authorization = 'HIDDEN';
          if ('x-request-authentication' in req.headers) req.headers['x-request-authentication'] = 'HIDDEN';
        }
        return req[propName];
      },
    }),
  );
}
