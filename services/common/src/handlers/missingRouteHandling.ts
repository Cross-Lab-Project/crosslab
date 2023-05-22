import * as express from 'express';

import {logger} from '../logger';

export function missingRouteHandling(app: express.Application) {
  app.use((req, res, next) => {
    logger.log('error', 'Missing route', {data: {url: req.url}});
    res.status(404).send({status: 404, error: 'Not found'});
    next();
  });
}
