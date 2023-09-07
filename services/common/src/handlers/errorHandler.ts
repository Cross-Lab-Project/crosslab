import {ErrorRequestHandler} from 'express';

import {logger} from '../logger.js';

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const status = err.status || 500;
  const message = err.error || err.message;
  const error = err.name || 'Error';
  const stack = err.stack
  if(!(error in ['UnauthorizedError','ForbiddenError'])){
    logger.log('error', 'An error occurred during the handling of a request', {
      data: {error, status, message, method: req.method, url: req.url, stack},
    });
  }
  res.status(status).send({error, message});
};
