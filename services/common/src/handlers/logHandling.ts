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
        if (propName === 'headers' && req.headers.authorization)
          return {
            ...req.headers,
            authorization: 'HIDDEN',
          };
        return req[propName];
      },
    }),
  );
}
