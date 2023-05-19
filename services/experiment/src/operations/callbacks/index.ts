import { config } from '../../config'
import { handleEventCallback } from './event'
import {
    MalformedBodyError,
    MissingPropertyError,
    InvalidValueError,
} from '@crosslab/service-common'
import { logger } from '@crosslab/service-common'
import * as express from 'express'

export const callbackUrl: string =
    config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + `callbacks/experiment`
export const peerconnectionClosedCallbacks: string[] = []
export const peerconnectionStatusChangedCallbacks: string[] = []
export const deviceChangedCallbacks: string[] = []

/**
 * This function adds the endpoint for incoming callbacks registered by the experiment service.
 * @param app The express application the callback endpoint should be added to.
 */
export function callbackHandling(app: express.Application) {
    // TODO: adapt callback handling after codegen update
    app.post('/callbacks/experiment', async (req, res, next) => {
        try {
            const callback = req.body
            logger.log('info', 'received a callback', { data: { callback } })

            if (typeof callback !== 'object')
                throw new MalformedBodyError('Body of callback is not an object', 400)

            if (!callback.callbackType) {
                throw new MissingPropertyError(
                    'Callbacks require property "callbackType"',
                    400
                )
            }

            if (typeof callback.callbackType !== 'string') {
                throw new MalformedBodyError(
                    'Property "callbackType" needs to be of type string',
                    400
                )
            }

            const callbackType = callback.callbackType

            switch (callbackType) {
                case 'event':
                    return res.status(await handleEventCallback(callback)).send()
                default:
                    throw new InvalidValueError(
                        `Callbacks of type "${req.body.callbackType}" are not supported`,
                        400
                    )
            }
        } catch (error) {
            return next(error)
        }
    })
}
