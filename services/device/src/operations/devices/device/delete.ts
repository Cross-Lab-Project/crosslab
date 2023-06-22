import { repositories } from '../../../database/dataSource'
import { deleteDevicesByDeviceIdSignature } from '../../../generated/signatures'
import { logger } from '@crosslab/service-common'

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
    logger.log('info', 'deleteDevicesByDeviceId called')

    const deviceModel = await repositories.device.findOneOrFail({
        where: { uuid: parameters.device_id },
    })

    await repositories.device.remove(deviceModel)

    logger.log('info', 'deleteDevicesByDeviceId succeeded')

    return {
        status: 204,
    }
}
