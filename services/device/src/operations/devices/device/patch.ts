import { repositories } from '../../../database/dataSource'
import { patchDevicesByDeviceIdSignature } from '../../../generated/signatures'
import { changedCallbacks, sendChangedCallback } from '../../../methods/callbacks'
import { checkPermission } from '../../../methods/permission'
import { deviceUrlFromId } from '../../../methods/urlFromId'
import { DeviceOwnershipError, logger } from '@crosslab/service-common'

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
    user
) => {
    logger.log('info', 'patchDevicesByDeviceId called')

    const deviceModel = await repositories.device.findOneOrFail({
        where: { uuid: parameters.device_id },
    })

    if (!checkPermission('write', deviceModel, user.JWT)) throw new DeviceOwnershipError()

    await repositories.device.write(deviceModel, body ?? { type: deviceModel.type })
    await repositories.device.save(deviceModel)

    await sendChangedCallback(deviceModel)

    if (parameters.changedUrl) {
        logger.log(
            'info',
            `registering changed-callback for device '${deviceUrlFromId(
                deviceModel.uuid
            )}' to '${parameters.changedUrl}'`
        )
        const changedCallbackURLs = changedCallbacks.get(deviceModel.uuid) ?? []
        changedCallbackURLs.push(parameters.changedUrl)
        changedCallbacks.set(deviceModel.uuid, changedCallbackURLs)
    }

    logger.log('info', 'patchDevicesByDeviceId succeeded')

    return {
        status: 200,
        body: await repositories.device.format(deviceModel),
    }
}
