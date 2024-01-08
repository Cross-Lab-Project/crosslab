import { InvalidValueError } from '@crosslab/service-common';
import { logger } from '@crosslab/service-common';
import * as express from 'express';

import { config } from '../../config.js';
import { callbackHandler } from './callbackHandler.js';

export const callbackUrl: string =
  config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + `callbacks/experiment`;
export const peerconnectionClosedCallbacks: string[] = [];
export const peerconnectionStatusChangedCallbacks: string[] = [];
export const deviceChangedCallbacks: Map<string, Set<string>> = new Map();

/**
 * This function adds the endpoint for incoming callbacks registered by the experiment service.
 * @param app The express application the callback endpoint should be added to.
 */
export function callbackHandling(app: express.Application) {
  app.post('/callbacks/experiment', async (req, res, next) => {
    try {
      const callback = req.body;
      logger.log('info', 'received a callback', { data: { callback } });

      switch (callback.callbackType) {
        case 'event':
          return res.status(await callbackHandler.handleCallback(callback)).send();
        default:
          throw new InvalidValueError(
            `Callbacks of type "${callback.callbackType}" are not supported`,
            400,
          );
      }
    } catch (error) {
      return next(error);
    }
  });
}
