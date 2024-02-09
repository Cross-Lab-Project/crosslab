import { ErrorRequestHandler } from 'express';

import { logger } from './logging/index.js';

export const middleware: ErrorRequestHandler = (err, req, res, _next) => {
  const status = err.status || 500;
  const message = err.error || err.message;
  const error = err.name || 'Error';
  const stack = err.stack;
  const errors = err.errors;
  if (!(error in ['UnauthorizedError', 'ForbiddenError'])) {
    logger.log('error', 'An error occurred during the handling of a request', {
      data: { error, status, message, method: req.method, url: req.url, stack, errors },
    });
  }
  res.status(status).send({ error, message, errors });
};
