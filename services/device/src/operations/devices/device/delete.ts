import { repositories } from '../../../database/dataSource'
import { deleteDevicesByDeviceIdSignature } from '../../../generated/signatures'
import { DeviceOwnershipError, logger } from '@crosslab/service-common'
import { checkPermission } from '../../../methods/permission'

/**
 * This function implements the functionality for handling DELETE requests on /devices/{device_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const deleteDevicesByDeviceId: deleteDevicesByDeviceIdSignature = async (
    parameters,
    user
) => {
    logger.log('info', 'deleteDevicesByDeviceId called')

    const deviceModel = await repositories.device.findOneOrFail({
        where: { uuid: parameters.device_id },
    })

    if (!checkPermission('delete', deviceModel, user.JWT))
        throw new DeviceOwnershipError()

    await repositories.device.remove(deviceModel)

    logger.log('info', 'deleteDevicesByDeviceId succeeded')

    return {
        status: 204,
    }
}
