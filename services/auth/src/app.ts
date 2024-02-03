import { authorization, error, logging } from '@crosslab/service-common';
import cookieParser from 'cookie-parser';
import express from 'express';

import router from './generated/routes.js';

export let app: express.Express;

export function init_app() {
  app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(logging.middleware());
  app.use(authorization.middleware());

  app.use(router());

  app.get('/auth/status', (_req, res) => {
    res.send({ status: 'ok' });
  });

  app.use(error.middleware);

  return app;
}
