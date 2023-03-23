import { deviceRepository } from '../../../database/repositories/device'
import { patchDevicesByDeviceIdSignature } from '../../../generated/signatures'
import { changedCallbacks, sendChangedCallback } from '../../../methods/callbacks'
import { deviceUrlFromId } from '../../../methods/urlFromId'

/**
 * This function implements the functionality for handling PATCH requests on /devices/{device_id} endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 * @throws {InvalidChangeError} Thrown if client tries to update the type of the device.
 */
export const patchDevicesByDeviceId: patchDevicesByDeviceIdSignature = async (
    parameters,
    body,
    _user
) => {
    console.log(`patchDevicesByDeviceId called`)

    const device = await deviceRepository.findOneOrFail({
        where: { uuid: parameters.device_id },
    })

    await deviceRepository.write(device, body ?? {})
    await deviceRepository.save(device)

    await sendChangedCallback(device)

    if (parameters.changedUrl) {
        console.log(
            `registering changed-callback for device '${deviceUrlFromId(
                device.uuid
            )}' to '${parameters.changedUrl}'`
        )
        const changedCallbackURLs = changedCallbacks.get(device.uuid) ?? []
        changedCallbackURLs.push(parameters.changedUrl)
        changedCallbacks.set(device.uuid, changedCallbackURLs)
    }

    console.log(`patchDevicesByDeviceId succeeded`)

    return {
        status: 200,
        body: await deviceRepository.format(device),
    }
}
