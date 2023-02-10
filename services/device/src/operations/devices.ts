import { MissingEntityError, ForbiddenOperationError, MissingPropertyError, UnrelatedPeerconnectionError } from "@crosslab/service-common"
import { randomUUID } from "crypto"
import { AppDataSource } from "../data_source"
import { getDevicesSignature, postDevicesSignature, getDevicesByDeviceIdSignature, postDevicesByDeviceIdSignature, deleteDevicesByDeviceIdSignature, patchDevicesByDeviceIdSignature, postDevicesByDeviceIdAvailabilitySignature, postDevicesByDeviceIdWebsocketSignature, postDevicesByDeviceIdSignalingSignature } from "../generated/signatures"
import { ConcreteDevice } from "../generated/types"
import { apiClient, YEAR } from "../globals"
import { applyAvailabilityRules } from "../methods/availability"
import { changedCallbacks, sendChangedCallback } from "../methods/callbacks"
import { createDeviceModelFromDevice } from "../methods/database/create"
import { deleteDeviceModel } from "../methods/database/delete"
import { findDeviceModelByUUID } from "../methods/database/find"
import { formatDeviceOverview, formatDevice, formatTimeSlot } from "../methods/database/format"
import { saveDeviceModel } from "../methods/database/save"
import { writeDevice, writeAvailabilityRule } from "../methods/database/write"
import { deviceUrlFromId } from "../methods/utils"
import { DeviceOverviewModel, isInstantiableDeviceModel, ConcreteDeviceModel, AvailabilityRuleModel } from "../model"
import { connectedDevices } from "./websocket"

/**
 * This function implements the functionality for handling GET requests on /devices endpoint.
 * @param _user The user submitting the request.
 */
 export const getDevices: getDevicesSignature = async (_user) => {
    console.log(`getDevices called`)
    const deviceRepository = AppDataSource.getRepository(DeviceOverviewModel)
    const devices = await deviceRepository.find()

    console.log(`getDevices succeeded`)

    return {
        status: 200,
        body: devices.map(formatDeviceOverview),
    }
}

/**
 * This function implements the functionality for handling POST requests on /devices endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param user The user submitting the request.
 */
export const postDevices: postDevicesSignature = async (parameters, body, user) => {
    console.log(`postDevices called`)

    const device = createDeviceModelFromDevice(body)
    device.owner = user.JWT?.url
    await saveDeviceModel(device)

    if (parameters.changedUrl) {
        console.log(
            `registering changed-callback for device ${device.uuid} to ${parameters.changedUrl}`
        )
        const changedCallbackURLs = changedCallbacks.get(device.uuid) ?? []
        changedCallbackURLs.push(parameters.changedUrl)
        changedCallbacks.set(device.uuid, changedCallbackURLs)
    }

    console.log(`postDevices succeeded`)

    return {
        status: 201,
        body: await formatDevice(device),
    }
}

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
    console.log(`getDevicesByDeviceId called`)
    const device = await findDeviceModelByUUID(parameters.device_id)

    if (!device)
        throw new MissingEntityError(`Could not find device ${parameters.device_id}`, 404)

    console.log(`getDevicesByDeviceId succeeded`)
    return {
        status: 200,
        body: await formatDevice(device),
    }
}

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
    const instantiableDevice = await findDeviceModelByUUID(parameters.device_id)

    if (!instantiableDevice)
        throw new MissingEntityError(`Could not find device ${parameters.device_id}`, 404)

    if (!isInstantiableDeviceModel(instantiableDevice))
        throw new ForbiddenOperationError(
            `Cannot create new instance of device ${deviceUrlFromId(
                instantiableDevice.uuid
            )} since it has type "${instantiableDevice.type}"`,
            400
        )

    const concreteDevice: ConcreteDevice = {
        ...instantiableDevice,
        type: 'device',
        announcedAvailability: [{ available: true }],
        services: [],
    }
    const concreteDeviceModel = createDeviceModelFromDevice<ConcreteDeviceModel>(concreteDevice)

    concreteDeviceModel.owner = user.JWT?.url
    await saveDeviceModel(concreteDeviceModel)

    if (parameters.changedUrl) {
        console.log(
            `registering changed-callback for device ${concreteDevice.uuid} to ${parameters.changedUrl}`
        )
        const changedCallbackURLs = changedCallbacks.get(concreteDeviceModel.uuid) ?? []
        changedCallbackURLs.push(parameters.changedUrl)
        changedCallbacks.set(concreteDeviceModel.uuid, changedCallbackURLs)
    }

    const instance = await formatDevice(concreteDeviceModel)
    if (!instance.url)
        throw new MissingPropertyError(
            'Created instance of device does not have an url',
            500
        )
    const deviceToken = await apiClient.createDeviceAuthenticationToken(instance.url) // TODO: error handling
    if (!instantiableDevice.instances) instantiableDevice.instances = []
    instantiableDevice.instances.push(concreteDeviceModel)

    await saveDeviceModel(instantiableDevice)

    console.log(`postDevicesByDeviceId succeeded`)

    return {
        status: 201,
        body: {
            instance,
            deviceToken,
        },
    }
}

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
    console.log(`deleteDevicesByDeviceId called`)
    const device = await findDeviceModelByUUID(parameters.device_id)

    if (!device)
        throw new MissingEntityError(`Could not find device ${parameters.device_id}`, 404)

    await deleteDeviceModel(device)

    console.log(`deleteDevicesByDeviceId succeeded`)

    return {
        status: 204,
    }
}

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
    _user
) => {
    console.log(`patchDevicesByDeviceId called`)

    const device = await findDeviceModelByUUID(parameters.device_id)

    if (!device)
        throw new MissingEntityError(`Could not find device ${parameters.device_id}`, 404)

    if (parameters.changedUrl) {
        console.log(
            `registering changed-callback for device ${device.uuid} to ${parameters.changedUrl}`
        )
        const changedCallbackURLs = changedCallbacks.get(device.uuid) ?? []
        changedCallbackURLs.push(parameters.changedUrl)
        changedCallbacks.set(device.uuid, changedCallbackURLs)
    }

    if (!body || Object.keys(body).length === 0) {
        console.log(
            `patchDevicesByDeviceId succeeded: no changes applied due to empty body`
        )
        return {
            status: 200,
            body: await formatDevice(device),
        }
    }

    if (!device.type) {
        throw new MissingPropertyError(`Device model is missing a type`)
    }

    writeDevice(device, body)

    await sendChangedCallback(device)

    console.log(`patchDevicesByDeviceId succeeded`)

    return {
        status: 200,
        body: await formatDevice(device),
    }
}

/**
 * This function implements the functionality for handling POST requests on /devices/{device_id}/availability endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const postDevicesByDeviceIdAvailability: postDevicesByDeviceIdAvailabilitySignature =
    async (parameters, body, _user) => {
        console.log(`postDevicesByDeviceIdAvailability called`)
        const deviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
        const device = await deviceRepository.findOneBy({ uuid: parameters.device_id })

        if (!device)
            throw new MissingEntityError(
                `Could not find device ${parameters.device_id}`,
                404
            )

        const availabilityRuleRepository =
            AppDataSource.getRepository(AvailabilityRuleModel)

        if (!device.availabilityRules) device.availabilityRules = []
        if (body) {
            // insert new availability rules
            for (const availabilityRule of body) {
                const availabilityRuleModel = availabilityRuleRepository.create()
                writeAvailabilityRule(availabilityRuleModel, availabilityRule)
                device.availabilityRules.push(availabilityRuleModel)
            }
        }

        device.announcedAvailability = []
        const start = Date.now()
        const end = start + YEAR
        device.announcedAvailability = applyAvailabilityRules(
            device.announcedAvailability,
            device.availabilityRules,
            start,
            end
        )

        await deviceRepository.save(device)
        await sendChangedCallback(device)

        console.log(`postDevicesByDeviceIdAvailability succeeded`)

        return {
            status: 200,
            body: device.announcedAvailability.map(formatTimeSlot),
        }
    }

/**
 * This function implements the functionality for handling POST requests on /devices/{device_id}/token endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const postDevicesByDeviceIdWebsocket: postDevicesByDeviceIdWebsocketSignature = async (
    parameters,
    _user
) => {
    console.log(`postDevicesByDeviceIdToken called`)
    const deviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
    const device = await deviceRepository.findOneBy({ uuid: parameters.device_id })

    if (!device)
        throw new MissingEntityError(`Could not find device ${parameters.device_id}`, 404)

    device.token = randomUUID()
    await deviceRepository.save(device)

    setTimeout(async () => {
        device.token = undefined
        await deviceRepository.save(device)
    }, 300000)

    console.log(`postDevicesByDeviceIdToken succeeded`)

    return {
        status: 200,
        body: device.token,
    }
}

/**
 * This function implements the functionality for handling POST requests on /devices/{device_id}/signaling endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database or if websocket for device is not found.
 * @throws {InvalidValueError} Thrown if type of device is not "device" or if device is not part of the peerconnection.
 */
export const postDevicesByDeviceIdSignaling: postDevicesByDeviceIdSignalingSignature =
    async (parameters, body, _user) => {
        console.log(`postDevicesByDeviceIdSignaling called`)

        // Get device
        const device = await findDeviceModelByUUID(parameters.device_id)
        if (!device)
            throw new MissingEntityError(
                `Could not find device ${parameters.device_id}`,
                404
            )

        // Make sure device is a concrete device
        if (device.type !== 'device')
            throw new ForbiddenOperationError(
                `Cannot send signaling message to device with type ${device.type}`,
                400
            )

        // Retrieve peerconnection and make sure the device is taking part in it
        const peerconnection = await apiClient.getPeerconnection(
            parameters.peerconnection_url
        )
        if (!peerconnection.devices)
            throw new MissingPropertyError(
                `Peerconnection does not have any devices`,
                404
            )
        const deviceA = peerconnection.devices[0]
        const deviceB = peerconnection.devices[1]

        if (
            !(deviceA.url === deviceUrlFromId(device.uuid)) &&
            !(deviceB.url === deviceUrlFromId(device.uuid))
        ) {
            throw new UnrelatedPeerconnectionError(
                `Device is not part of the peerconnection`,
                400
            )
        }

        const ws = connectedDevices.get(parameters.device_id)

        if (!ws)
            throw new MissingEntityError(
                `Could not find websocket connection for device ${parameters.device_id}`,
                404
            )

        ws.send(JSON.stringify(body))

        console.log(`postDevicesByDeviceIdSignaling succeeded`)

        return {
            status: 200,
        }
    }