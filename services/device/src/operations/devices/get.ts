import { deviceRepository } from '../../database/repositories/device'
import { getDevicesSignature } from '../../generated/signatures'

/**
 * This function implements the functionality for handling GET requests on /devices endpoint.
 * @param _user The user submitting the request.
 */
export const getDevices: getDevicesSignature = async (_user) => {
    console.log(`getDevices called`)
    const devices = await deviceRepository.find()

    console.log(`getDevices succeeded`)

    return {
        status: 200,
        body: await Promise.all(devices.map(deviceRepository.formatOverview)),
    }
}
