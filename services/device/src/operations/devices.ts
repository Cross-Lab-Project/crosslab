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
    DeviceGroupModel,
    AvailabilityRuleModel,
    isConcreteDeviceModel,
    isDeviceGroupModel,
    VirtualDeviceModel,
    isVirtualDeviceModel,
} from '../model'
import { randomUUID } from 'crypto'
import { apiClient, YEAR } from '../globals'
import {
    ForbiddenOperationError,
    InvalidChangeError,
    MissingEntityError,
    MissingPropertyError,
    UnrelatedPeerconnectionError,
} from '../types/errors'
import {
    deviceUrlFromId,
    getDeviceModelByUUID,
    isConcreteDevice,
    isDeviceGroup,
} from '../methods/utils'
import { config } from '../config'
import {
    isMessage,
    isAuthenticationMessage,
    AuthenticationMessage,
} from '../generated/types'
import { applyAvailabilityRules } from '../methods/availability'
import { handleChangedCallback, changedCallbacks } from '../methods/callbacks'
import {
    formatDeviceOverview,
    formatConcreteDevice,
    formatDeviceGroup,
    formatTimeSlot,
    formatVirtualDevice,
} from '../methods/format'
import { handleDeviceMessage } from '../methods/messageHandling'
import {
    writeConcreteDevice,
    writeDeviceGroup,
    writeAvailabilityRule,
    writeVirtualDevice,
} from '../methods/write'
import WebSocket from 'ws'

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
    let device
    if (isConcreteDevice(body)) {
        const concreteDeviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
        device = concreteDeviceRepository.create()
        writeConcreteDevice(device, body)
        device.owner = user.url
        await concreteDeviceRepository.save(device)
    } else if (isDeviceGroup(body)) {
        const deviceGroupRepository = AppDataSource.getRepository(DeviceGroupModel)
        device = deviceGroupRepository.create()
        writeDeviceGroup(device, body)
        device.owner = user.url
        await deviceGroupRepository.save(device)
    } else {
        const virtualDeviceRepository = AppDataSource.getRepository(VirtualDeviceModel)
        device = virtualDeviceRepository.create()
        writeVirtualDevice(device, body)
        device.owner = user.url
        await virtualDeviceRepository.save(device)
    }

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
        body: isConcreteDeviceModel(device)
            ? formatConcreteDevice(device)
            : isDeviceGroupModel(device)
            ? await formatDeviceGroup(device)
            : formatVirtualDevice(device),
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
    const device = await getDeviceModelByUUID(parameters.device_id)

    if (!device)
        throw new MissingEntityError(`Could not find device ${parameters.device_id}`, 404)

    console.log(`getDevicesByDeviceId succeeded`)
    return {
        status: 200,
        body: isConcreteDeviceModel(device)
            ? formatConcreteDevice(device)
            : isDeviceGroupModel(device)
            ? await formatDeviceGroup(device)
            : formatVirtualDevice(device),
    }
}

/**
 * This function implements the functionality for handling POST requests on /devices/{device_id} endpoint.
 * @param parameters The parameters of the request.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 * @throws {ForbiddenOperationError} Thrown if device is not of type "virtual".
 */
export const postDevicesByDeviceId: postDevicesByDeviceIdSignature = async (
    parameters,
    user
) => {
    console.log(`postDevicesByDeviceId called`)
    const concreteDeviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
    const virtualDevice = await getDeviceModelByUUID(parameters.device_id)

    if (!virtualDevice)
        throw new MissingEntityError(`Could not find device ${parameters.device_id}`, 404)

    if (!isVirtualDeviceModel)
        throw new ForbiddenOperationError(
            `Cannot create new instance of device ${parameters.device_id} since it has type "${virtualDevice.type}"`,
            400
        )

    const device = concreteDeviceRepository.create()
    writeConcreteDevice(device, {
        ...virtualDevice,
        type: 'device',
        announcedAvailability: [{ available: true }],
    })
    device.owner = user.url
    await concreteDeviceRepository.save(device)

    if (parameters.changedUrl) {
        console.log(
            `registering changed-callback for device ${device.uuid} to ${parameters.changedUrl}`
        )
        const changedCallbackURLs = changedCallbacks.get(device.uuid) ?? []
        changedCallbackURLs.push(parameters.changedUrl)
        changedCallbacks.set(device.uuid, changedCallbackURLs)
    }

    console.log(`postDevicesByDeviceId succeeded`)

    return {
        status: 201,
        body: formatConcreteDevice(device),
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
    const concreteDeviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
    const deviceGroupRepository = AppDataSource.getRepository(DeviceGroupModel)
    const virtualDeviceRepository = AppDataSource.getRepository(VirtualDeviceModel)
    const device = await getDeviceModelByUUID(parameters.device_id)

    if (!device)
        throw new MissingEntityError(`Could not find device ${parameters.device_id}`, 404)

    if (isConcreteDeviceModel(device))
        await concreteDeviceRepository.softDelete(device.uuid)
    else if (isDeviceGroupModel(device))
        await deviceGroupRepository.softDelete(device.uuid)
    else await virtualDeviceRepository.softDelete(device.uuid)

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
    const deviceOverviewRepository = AppDataSource.getRepository(DeviceOverviewModel)
    const concreteDeviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
    const deviceGroupRepository = AppDataSource.getRepository(DeviceGroupModel)

    const deviceOverview = await deviceOverviewRepository.findOneBy({
        uuid: parameters.device_id,
    })

    if (!deviceOverview)
        throw new MissingEntityError(
            `Could not find device overview for ${parameters.device_id}`,
            404
        )

    const device =
        deviceOverview.type === 'device'
            ? await concreteDeviceRepository.findOneBy({ uuid: parameters.device_id })
            : await deviceGroupRepository.findOneBy({ uuid: parameters.device_id })

    if (!device)
        throw new MissingEntityError(`Could not find device ${parameters.device_id}`, 404)

    if (!body) {
        console.log(
            `patchDevicesByDeviceId succeeded: no changes applied due to empty body`
        )
        return {
            status: 200,
            body: isConcreteDeviceModel(device)
                ? formatConcreteDevice(device)
                : await formatDeviceGroup(device),
        }
    }

    if (isConcreteDeviceModel(device) && isConcreteDevice(body)) {
        writeConcreteDevice(device, body)
        concreteDeviceRepository.save(device)
    } else if (isDeviceGroupModel(device) && isDeviceGroup(body)) {
        writeDeviceGroup(device, body)
        deviceGroupRepository.save(device)
    } else {
        throw new InvalidChangeError(
            `Trying to update device type from ${device.type} to ${body.type}`,
            400
        )
    }

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
        body: isConcreteDeviceModel(device)
            ? formatConcreteDevice(device)
            : await formatDeviceGroup(device),
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
        const device = await getDeviceModelByUUID(parameters.device_id)
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
