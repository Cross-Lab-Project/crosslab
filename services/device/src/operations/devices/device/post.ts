import { deviceRepository } from '../../../database/repositories/device'
import { concreteDeviceRepository } from '../../../database/repositories/device/concreteDevice'
import { postDevicesByDeviceIdSignature } from '../../../generated/signatures'
import { apiClient } from '../../../globals'
import { changedCallbacks } from '../../../methods/callbacks'
import { deviceUrlFromId } from '../../../methods/urlFromId'
import { ForbiddenOperationError } from '@crosslab/service-common'

/**
 * This function implements the functionality for handling POST requests on /devices/{device_id} endpoint.
 * @param parameters The parameters of the request.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 * @throws {ForbiddenOperationError} Thrown if device is not instantiable.
 */
export const postDevicesByDeviceId: postDevicesByDeviceIdSignature = async (
    parameters,
    user
) => {
    console.log(`postDevicesByDeviceId called`)

    const instantiableDeviceModel = await deviceRepository.findOneOrFail({
        where: { uuid: parameters.device_id },
    })

    if (
        instantiableDeviceModel.type !== 'cloud instantiable' &&
        instantiableDeviceModel.type !== 'edge instantiable'
    )
        throw new ForbiddenOperationError(
            `Cannot create new instance of device '${deviceUrlFromId(
                instantiableDeviceModel.uuid
            )}' since it has type '${instantiableDeviceModel.type}'`,
            400
        )

    const concreteDeviceModel = await concreteDeviceRepository.create({
        ...(await deviceRepository.format(instantiableDeviceModel)),
        type: 'device',
    })
    concreteDeviceModel.owner = user.JWT?.url

    if (parameters.changedUrl) {
        console.log(
            `registering changed-callback for device '${deviceUrlFromId(
                concreteDeviceModel.uuid
            )}' to '${parameters.changedUrl}'`
        )
        const changedCallbackURLs = changedCallbacks.get(concreteDeviceModel.uuid) ?? []
        changedCallbackURLs.push(parameters.changedUrl)
        changedCallbacks.set(concreteDeviceModel.uuid, changedCallbackURLs)
    }

    const instance = await concreteDeviceRepository.format(concreteDeviceModel)

    const deviceToken = await apiClient.createDeviceAuthenticationToken(instance.url) // TODO: error handling
    instantiableDeviceModel.instances ??= []
    instantiableDeviceModel.instances.push(concreteDeviceModel)

    await deviceRepository.save(concreteDeviceModel)
    await deviceRepository.save(instantiableDeviceModel)

    console.log(`postDevicesByDeviceId succeeded`)

    return {
        status: 201,
        body: {
            deviceToken,
            instance: instance,
        },
    }
}
