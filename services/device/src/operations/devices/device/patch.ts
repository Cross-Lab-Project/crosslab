import { MissingPropertyError } from "@crosslab/service-common"
import { deviceRepository } from "../../../database/repositories/device"
import { patchDevicesByDeviceIdSignature } from "../../../generated/signatures"
import { changedCallbacks, sendChangedCallback } from "../../../methods/callbacks"

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

    if (parameters.changedUrl) {
        console.log(
            `registering changed-callback for device ${device.uuid} to ${parameters.changedUrl}`
        )
        const changedCallbackURLs = changedCallbacks.get(device.uuid) ?? []
        changedCallbackURLs.push(parameters.changedUrl)
        changedCallbacks.set(device.uuid, changedCallbackURLs)
    }

    if (!body || Object.keys(body).length === 0) {
        console.log(
            `patchDevicesByDeviceId succeeded: no changes applied due to empty body`
        )
        return {
            status: 200,
            body: await deviceRepository.format(device),
        }
    }

    if (!device.type) {
        throw new MissingPropertyError(`Device model is missing a type`)
    }

    await deviceRepository.write(device, body)
    await deviceRepository.save(device)

    await sendChangedCallback(device)

    console.log(`patchDevicesByDeviceId succeeded`)

    return {
        status: 200,
        body: await deviceRepository.format(device),
    }
}