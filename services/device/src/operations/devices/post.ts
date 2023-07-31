import { repositories } from '../../database/dataSource'
import { postDevicesSignature } from '../../generated/signatures'
import { changedCallbacks } from '../../methods/callbacks'
import { deviceUrlFromId } from '../../methods/urlFromId'
import { MalformedBodyError, logger } from '@crosslab/service-common'

/**
 * This function implements the functionality for handling POST requests on /devices endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param user The user submitting the request.
 */
export const postDevices: postDevicesSignature = async (parameters, body, user) => {
    logger.log('info', 'postDevices called')

    if (!body.name)
        throw new MalformedBodyError(
            "Property 'name' is required and must not be empty",
            400
        )

    const deviceModel = await repositories.device.create(body)
    deviceModel.owner = user.JWT.url
    await repositories.device.save(deviceModel)

    if (parameters.changedUrl) {
        logger.log(
            'info',
            `registering changed-callback for device '${deviceUrlFromId(
                deviceModel.uuid
            )}' to '${parameters.changedUrl}'`
        )
        changedCallbacks.set(deviceModel.uuid, [parameters.changedUrl])
    }

    logger.log('info', 'postDevices succeeded')

    return {
        status: 201,
        body: await repositories.device.format(deviceModel),
    }
}
