import { deviceRepository } from '../../database/repositories/device'
import { deviceOverviewRepository } from '../../database/repositories/device/deviceOverview'
import { getDevicesSignature } from '../../generated/signatures'
import { logger } from '@crosslab/service-common'

/**
 * This function implements the functionality for handling GET requests on /devices endpoint.
 * @param _user The user submitting the request.
 */
export const getDevices: getDevicesSignature = async (_user) => {
    logger.log('info', 'getDevices called')

    const deviceModels = await deviceRepository.find()

    logger.log('info', 'getDevices succeeded')

    return {
        status: 200,
        body: await Promise.all(
            deviceModels.map((device) => deviceOverviewRepository.format(device))
        ),
    }
}
