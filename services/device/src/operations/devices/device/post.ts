import { ForbiddenOperationError, InvalidValueError, MissingPropertyError } from "@crosslab/service-common"
import { deviceRepository } from "../../../database/repositories/device"
import { postDevicesByDeviceIdSignature } from "../../../generated/signatures"
import { ConcreteDevice } from "../../../generated/types"
import { apiClient } from "../../../globals"
import { changedCallbacks } from "../../../methods/callbacks"
import { deviceUrlFromId } from "../../../methods/utils"

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
    const instantiableDevice = await deviceRepository.findOneOrFail({
        where: { uuid: parameters.device_id },
    })

    if (
        instantiableDevice.type !== 'cloud instantiable' &&
        instantiableDevice.type !== 'edge instantiable'
    )
        throw new ForbiddenOperationError(
            `Cannot create new instance of device ${deviceUrlFromId(
                instantiableDevice.uuid
            )} since it has type "${instantiableDevice.type}"`,
            400
        )

    const concreteDevice: ConcreteDevice = {
        services: [],
        ...(await deviceRepository.format(instantiableDevice)),
        type: 'device',
        announcedAvailability: [{ available: true }],
    }
    const concreteDeviceModel = await deviceRepository.create(concreteDevice)

    if (concreteDeviceModel.type !== 'device') {
        throw new InvalidValueError(
            `Created instance does not have type 'device', but has type ${concreteDeviceModel.type}`
        )
    }

    concreteDeviceModel.owner = user.JWT?.url
    await deviceRepository.save(concreteDeviceModel)

    if (parameters.changedUrl) {
        console.log(
            `registering changed-callback for device ${concreteDevice.uuid} to ${parameters.changedUrl}`
        )
        const changedCallbackURLs = changedCallbacks.get(concreteDeviceModel.uuid) ?? []
        changedCallbackURLs.push(parameters.changedUrl)
        changedCallbacks.set(concreteDeviceModel.uuid, changedCallbackURLs)
    }

    const instance = await deviceRepository.format(concreteDeviceModel)
    if (!instance.url)
        throw new MissingPropertyError(
            'Created instance of device does not have an url',
            500
        )
    if (instance.type !== 'device') {
        throw new InvalidValueError(
            `Created instance does not have type 'device', but has type ${concreteDeviceModel.type}`
        )
    }

    const deviceToken = await apiClient.createDeviceAuthenticationToken(instance.url) // TODO: error handling
    instantiableDevice.instances ??= []
    instantiableDevice.instances.push(concreteDeviceModel)

    await deviceRepository.save(instantiableDevice)

    console.log(`postDevicesByDeviceId succeeded`)

    return {
        status: 201,
        body: {
            deviceToken,
            instance: instance,
        },
    }
}