import { NextHandleFunction } from 'connect';
import { NextFunction, Request, Response } from 'express';
import { v1 as uuidv1 } from 'uuid';

import { logger } from './logging.js';
import { requestIdContext } from './requestId.js';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      id: string;
      startTime: number;
    }
  }
}

/**
 * This middleware injects the request id into the request object and logs the request.
 */
export function middleware(): NextHandleFunction {
  return function (req: Request, res: Response, next: NextFunction) {
    req.id = req.get('X-Request-ID') ?? uuidv1();
    req.startTime = Date.now();
    res.on('finish', () => {
      logger.info({
        message: `${req.method} ${req.url} ${res.statusCode} ${
          Date.now() - req.startTime
        }ms`,
        method: req.method,
        url: req.url,
        status: res.statusCode,
        responseTime: Date.now() - req.startTime,
      });
    });
    requestIdContext.run(req.id, () => {
      next();
    });
  } as unknown as NextHandleFunction;
}