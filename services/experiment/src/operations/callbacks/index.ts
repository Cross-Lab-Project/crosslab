import { config } from '../../config.js';
import { handleEventCallback } from './event/index.js';
import { DeviceServiceTypes } from '@cross-lab-project/api-client';
import { MalformedBodyError, InvalidValueError } from '@crosslab/service-common';
import { logger } from '@crosslab/service-common';
import * as express from 'express';

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

            if (!DeviceServiceTypes.isCallback(callback))
                throw new MalformedBodyError(
                    'Body of request is not a valid callback',
                    400,
                );

            switch (callback.callbackType) {
                case 'event':
                    if (!DeviceServiceTypes.isEventCallback(callback))
                        throw new MalformedBodyError(
                            'Body of request is not a valid event callback',
                            400,
                        );
                    return res.status(await handleEventCallback(callback)).send();
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
