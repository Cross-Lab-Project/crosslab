import { InvalidValueError, MalformedBodyError } from '@crosslab/service-common';
import express from 'express';

import { isCallback, isEventCallback } from '../../clients/device/types.js';
import { handleEventCallback } from './event/index.js';

export function callbackHandling(app: express.Application) {
  app.post('/callbacks/booking', async (req, res, next) => {
    try {
      const callback = req.body;

      if (!isCallback(callback))
        throw new MalformedBodyError('Body of request is not a valid callback', 400);

      switch (callback.callbackType) {
        case 'event':
          if (!isEventCallback(callback))
            throw new MalformedBodyError(
              'Body of request is not a valid event callback',
              400,
            );
          return res.status(await handleEventCallback(callback)).send();
        default:
          throw new InvalidValueError(
            `Callbacks of type '${req.body.callbackType}' are not supported`,
            400,
          );
      }
    } catch (error) {
      return next(error);
    }
  });
}
