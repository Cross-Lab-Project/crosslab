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

    const device = await deviceRepository.create(body)
    device.owner = user.JWT?.url
    await deviceRepository.save(device)

    if (parameters.changedUrl) {
        console.log(
            `registering changed-callback for device ${device.uuid} to ${parameters.changedUrl}`
        )
        const changedCallbackURLs = changedCallbacks.get(device.uuid) ?? []
        changedCallbackURLs.push(parameters.changedUrl)
        changedCallbacks.set(device.uuid, changedCallbackURLs)
    }

    console.log(`postDevices succeeded`)

    return {
        status: 201,
        body: await deviceRepository.format(device),
    }
}
