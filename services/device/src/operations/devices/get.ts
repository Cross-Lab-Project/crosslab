import { repositories } from '../../database/dataSource'
import { getDevicesSignature } from '../../generated/signatures'
import { logger } from '@crosslab/service-common'

/**
 * This function implements the functionality for handling GET requests on /devices endpoint.
 * @param _user The user submitting the request.
 */
export const getDevices: getDevicesSignature = async (_user) => {
    logger.log('info', 'getDevices called')

    const deviceModels = await repositories.device.find()

    logger.log('info', 'getDevices succeeded')

    return {
        status: 200,
        body: await Promise.all(
            deviceModels.map((device) => repositories.deviceOverview.format(device))
        ),
    }
}
