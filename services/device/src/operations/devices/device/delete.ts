import { deviceRepository } from '../../../database/repositories/device'
import { deleteDevicesByDeviceIdSignature } from '../../../generated/signatures'

/**
 * This function implements the functionality for handling DELETE requests on /devices/{device_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const deleteDevicesByDeviceId: deleteDevicesByDeviceIdSignature = async (
    parameters,
    _user
) => {
    console.log(`deleteDevicesByDeviceId called`)

    const deviceModel = await deviceRepository.findOneOrFail({
        where: { uuid: parameters.device_id },
    })

    await deviceRepository.remove(deviceModel)

    console.log(`deleteDevicesByDeviceId succeeded`)

    return {
        status: 204,
    }
}
