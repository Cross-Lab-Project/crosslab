import { handleEventCallback } from './event'
import { MalformedBodyError, InvalidValueError } from '@crosslab/service-common'
import express from 'express'

export * from '../../methods/callbacks'

/**
 * This function adds the endpoint for incoming callbacks registered by the device service.
 * @param app The express application the callback endpoint should be added to.
 */
export function callbackHandling(app: express.Application) {
    app.post('/callbacks/device', async (req, res, next) => {
        try {
            const callback: unknown = req.body

            if (typeof callback !== 'object')
                throw new MalformedBodyError('Body of callback is not an object', 400)

            if (callback === null)
                throw new MalformedBodyError('Body of callback is null', 400)

            if (!('callbackType' in callback)) {
                throw new MalformedBodyError(
                    "Callbacks require property 'callbackType'",
                    400
                )
            }

            if (typeof callback.callbackType !== 'string') {
                throw new MalformedBodyError(
                    "Property 'callbackType' needs to be of type string",
                    400
                )
            }

            switch (callback.callbackType) {
                case 'event':
                    return res.status(await handleEventCallback(callback)).send()
                default:
                    throw new InvalidValueError(
                        `Callbacks of type '${req.body.callbackType}' are not supported`,
                        400
                    )
            }
        } catch (error) {
            return next(error)
        }
    })
}
