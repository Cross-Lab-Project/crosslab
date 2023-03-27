import { UnauthorizedError } from '.'
import { deviceRepository } from '../../database/repositories/device'
import { postDevicesSignature } from '../../generated/signatures'
import { changedCallbacks } from '../../methods/callbacks'

/**
 * This function implements the functionality for handling POST requests on /devices endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param user The user submitting the request.
 */
export const postDevices: postDevicesSignature = async (parameters, body, user) => {
    console.log(`postDevices called`)

    // TODO: rethink how to handle this problem (required JWT user)
    if (!user.JWT) throw new UnauthorizedError('User is not authorized')

    const deviceModel = await deviceRepository.create(body)
    deviceModel.owner = user.JWT?.url
    await deviceRepository.save(deviceModel)

    if (parameters.changedUrl) {
        console.log(
            `registering changed-callback for device ${deviceModel.uuid} to '${parameters.changedUrl}'`
        )
        const changedCallbackURLs = changedCallbacks.get(deviceModel.uuid) ?? []
        changedCallbackURLs.push(parameters.changedUrl)
        changedCallbacks.set(deviceModel.uuid, changedCallbackURLs)
    }

    console.log(`postDevices succeeded`)

    return {
        status: 201,
        body: await deviceRepository.format(deviceModel),
    }
}
