import { deviceRepository } from '../../../database/repositories/device'
import { getDevicesByDeviceIdSignature } from '../../../generated/signatures'

/**
 * This function implements the functionality for handling GET requests on /devices/{device_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const getDevicesByDeviceId: getDevicesByDeviceIdSignature = async (
    parameters,
    _user
) => {
    console.log(`getDevicesByDeviceId called`)
    const device = await deviceRepository.findOneOrFail({
        where: { uuid: parameters.device_id },
    })

    console.log(`getDevicesByDeviceId succeeded`)
    return {
        status: 200,
        body: await deviceRepository.format(device, {
            flatGroup: parameters.flat_group,
        }),
    }
}
