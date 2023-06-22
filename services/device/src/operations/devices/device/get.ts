import { repositories } from '../../../database/dataSource'
import { getDevicesByDeviceIdSignature } from '../../../generated/signatures'
import { logger } from '@crosslab/service-common'

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
    logger.log('info', 'getDevicesByDeviceId called')

    const deviceModel = await repositories.device.findOneOrFail({
        where: { uuid: parameters.device_id },
    })

    logger.log('info', 'getDevicesByDeviceId succeeded')

    return {
        status: 200,
        body: await repositories.device.format(deviceModel, {
            flatGroup: parameters.flat_group,
        }),
    }
}
