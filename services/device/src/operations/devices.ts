import {
    getDevicesSignature,
    postDevicesSignature,
    getDevicesByDeviceIdSignature,
    deleteDevicesByDeviceIdSignature,
    patchDevicesByDeviceIdSignature,
    postDevicesByDeviceIdAvailabilitySignature,
    postDevicesByDeviceIdTokenSignature,
    postDevicesByDeviceIdSignalingSignature,
    postDevicesByDeviceIdSignature,
} from '../generated/signatures/devices'
import { AppDataSource } from '../data_source'
import {
    DeviceOverviewModel,
    ConcreteDeviceModel,
    AvailabilityRuleModel,
    isInstantiableDeviceModel,
} from '../model'
import { randomUUID } from 'crypto'
import { apiClient, YEAR } from '../globals'
import {
    ForbiddenOperationError,
    MissingEntityError,
    MissingPropertyError,
    UnrelatedPeerconnectionError,
} from '../types/errors'
import { deviceUrlFromId } from '../methods/utils'
import { config } from '../config'
import {
    isMessage,
    isAuthenticationMessage,
    AuthenticationMessage,
} from '../generated/types'
import { applyAvailabilityRules } from '../methods/availability'
import { handleChangedCallback, changedCallbacks } from '../methods/callbacks'
import {
    formatDevice,
    formatDeviceOverview,
    formatTimeSlot,
} from '../methods/database/format'
import { handleDeviceMessage } from '../methods/messageHandling'
import { writeAvailabilityRule, writeDevice } from '../methods/database/write'
import WebSocket from 'ws'
import {
    createDeviceModelFromDevice,
    createDeviceModel,
} from '../methods/database/create'
import { deleteDeviceModel } from '../methods/database/delete'
import { saveDeviceModel } from '../methods/database/save'
import { findDeviceModelByUUID } from '../methods/database/find'

export const connectedDevices = new Map<string, WebSocket>()

/**
 * This function adds the /devices/ws endpoint, including its functionality, to an express application.
 * @param app The express application to add the /devices/ws endpoint to.
 */
export function deviceHandling(app: Express.Application) {
    // TODO: close Peerconnections that have device as participant when websocket connection is closed?
    app.ws('/devices/ws', (ws) => {
        // authenticate and start heartbeat
        ws.once('message', async (data) => {
            // device authentication and connection
            const deviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
            const message = JSON.parse(data.toString('utf8'))
            if (!(isMessage(message) && isAuthenticationMessage(message))) {
                ws.close(1002, 'Received message is not an authentication message')
                return
            }
            if (!message.deviceUrl.startsWith(config.BASE_URL)) {
                ws.close(1002, 'Device is registered at a different institution')
                return
            }
            const deviceId = message.deviceUrl.split('/').pop()
            if (!deviceId) {
                ws.close(
                    1002,
                    'Url in authentication message does not contain a device id'
                )
                return
            }
            const device = await deviceRepository.findOne({ where: { uuid: deviceId } })
            if (!device) {
                ws.close(1002, `Device ${deviceId} not found`)
                return
            }
            if (device.token != message.token) {
                ws.close(1002, 'Provided token does not match the token of the device')
                return
            }
            device.connected = true
            await deviceRepository.save(device)
            handleChangedCallback(device)
            connectedDevices.set(device.uuid, ws)

            ws.send(
                JSON.stringify(<AuthenticationMessage>{
                    messageType: 'authenticate',
                    deviceUrl: message.url,
                    authenticated: true,
                })
            )

            // heartbeat implementation
            let isAlive = true
            ws.on('pong', () => {
                isAlive = true
            })
            const interval = setInterval(async function ping() {
                if (isAlive === false) {
                    device.connected = false
                    await deviceRepository.save(device)
                    handleChangedCallback(device)
                    connectedDevices.delete(device.uuid)
                    clearInterval(interval)
                    return ws.terminate()
                }
                isAlive = false
                ws.ping()
            }, 30000)

            // close handler: stop heartbeat and disconnect device
            ws.on('close', async (code, reason) => {
                clearInterval(interval)
                connectedDevices.delete(device.uuid)

                if (code === 1002) {
                    console.error(`WebSocketConnctionError "${reason}"`)
                }
            })

            // message handler: handle incoming messages from devices
            ws.on('message', async (data) => {
                const message = JSON.parse(data.toString('utf8'))
                if (!isMessage(message)) {
                    ws.close(1002, 'Malformed Message')
                    return
                }
                handleDeviceMessage(device, message)
            })
        })
    })
}

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
    device.owner = user.url
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

    const concreteDevice = createDeviceModel('device')
    writeDevice(concreteDevice, {
        ...instantiableDevice,
        type: 'device',
        announcedAvailability: [{ available: true }],
        services: [],
    })
    concreteDevice.owner = user.url
    await saveDeviceModel(concreteDevice)

    if (parameters.changedUrl) {
        console.log(
            `registering changed-callback for device ${concreteDevice.uuid} to ${parameters.changedUrl}`
        )
        const changedCallbackURLs = changedCallbacks.get(concreteDevice.uuid) ?? []
        changedCallbackURLs.push(parameters.changedUrl)
        changedCallbacks.set(concreteDevice.uuid, changedCallbackURLs)
    }

    const instance = await formatDevice(concreteDevice)
    if (!instance.url)
        throw new MissingPropertyError(
            'Created instance of device does not have an url',
            500
        )
    const deviceToken = await apiClient.getDeviceToken(instance.url) // TODO: error handling
    if (!instantiableDevice.instances) instantiableDevice.instances = []
    instantiableDevice.instances.push(concreteDevice)

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

    if (!body) {
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

    handleChangedCallback(device)
    if (parameters.changedUrl) {
        console.log(
            `registering changed-callback for device ${device.uuid} to ${parameters.changedUrl}`
        )
        const changedCallbackURLs = changedCallbacks.get(device.uuid) ?? []
        changedCallbackURLs.push(parameters.changedUrl)
        changedCallbacks.set(device.uuid, changedCallbackURLs)
    }

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
        apiClient.addAvailabilityRules

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
        handleChangedCallback(device)

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
export const postDevicesByDeviceIdToken: postDevicesByDeviceIdTokenSignature = async (
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
