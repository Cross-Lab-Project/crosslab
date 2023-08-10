import { repositories } from '../../../database/dataSource'
import { postDevicesByDeviceIdSignature } from '../../../generated/signatures'
import { changedCallbacks } from '../../../methods/callbacks'
import { checkPermission } from '../../../methods/permission'
import { deviceUrlFromId } from '../../../methods/urlFromId'
import {
    DeviceOwnershipError,
    ImpossibleOperationError,
    logger,
} from '@crosslab/service-common'

/**
 * This function implements the functionality for handling POST requests on /devices/{device_id} endpoint.
 * @param parameters The parameters of the request.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 * @throws {ImpossibleOperationError} Thrown if device is not instantiable.
 */
export const postDevicesByDeviceId: postDevicesByDeviceIdSignature = async (
    parameters,
    user
) => {
    logger.log('info', 'postDevicesByDeviceId called')

    const instantiableDeviceModel = await repositories.device.findOneOrFail({
        where: { uuid: parameters.device_id },
    })

    if (!checkPermission('instantiate', instantiableDeviceModel, user.JWT))
        throw new DeviceOwnershipError()

    if (
        instantiableDeviceModel.type !== 'cloud instantiable' &&
        instantiableDeviceModel.type !== 'edge instantiable'
    )
        throw new ImpossibleOperationError(
            `Cannot create new instance of device '${deviceUrlFromId(
                instantiableDeviceModel.uuid
            )}' since it has type '${instantiableDeviceModel.type}'`,
            400
        )

    const concreteDeviceModel = await repositories.concreteDevice.create({
        ...(await repositories.device.format(instantiableDeviceModel)),
        type: 'device',
    })
    concreteDeviceModel.owner = user.JWT?.url

    await repositories.device.save(concreteDeviceModel)

    if (parameters.changedUrl) {
        logger.log(
            'info',
            `registering changed-callback for device '${deviceUrlFromId(
                concreteDeviceModel.uuid
            )}' to '${parameters.changedUrl}'`
        )
        const changedCallbackURLs = changedCallbacks.get(concreteDeviceModel.uuid) ?? []
        changedCallbackURLs.push(parameters.changedUrl)
        changedCallbacks.set(concreteDeviceModel.uuid, changedCallbackURLs)
    }
    const instance = await repositories.concreteDevice.format(concreteDeviceModel)

    await repositories.device.save(instantiableDeviceModel)

    logger.log('info', 'postDevicesByDeviceId succeeded')

    return {
        status: 201,
        body: {
            deviceToken: "deprecated",
            instance: instance,
        },
    }
}
