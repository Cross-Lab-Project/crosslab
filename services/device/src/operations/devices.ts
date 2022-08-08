import {
    DeviceOverview,
    ConcreteDevice,
    DeviceGroup,
    TimeSlot
} from "../generated/types"
import {
    getDevicesSignature,
    postDevicesSignature,
    getDevicesByDeviceIdSignature,
    deleteDevicesByDeviceIdSignature,
    patchDevicesByDeviceIdSignature,
    postDevicesByDeviceIdAvailabilitySignature,
    getDevicesByDeviceIdTokenSignature
} from "../generated/signatures/devices"
import { AppDataSource } from "../data_source"
import { 
    DeviceOverviewModel, 
    ConcreteDeviceModel, 
    DeviceGroupModel, 
    TimeSlotModel, 
    DeviceReferenceModel,
    PeerconnectionModel,
    isConcreteDeviceModel
} from "../model";
import { config } from "../config"
import WebSocket from "ws";
import { 
    AuthenticationMessage,
    isAuthenticationMessage, 
    isMessage, 
    isSignalingMessage, 
    Message,
    SignalingMessage
} from "./deviceMessages";
import { randomUUID } from "crypto";
import { EntityTarget } from "typeorm";
import fetch from "node-fetch";
import { APIClient } from "@cross-lab-project/api-client"

export const connectedDevices = new Map<string, WebSocket>();
export const DeviceBaseURL = config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + 'devices/'
const changedCallbacks = new Map<string,Array<string>>();
const apiClient = new APIClient({
    booking: config.BASE_URL_BOOKING,
    device: config.BASE_URL,
    experiment: config.BASE_URL_EXPERIMENT,
    federation: config.BASE_URL_FEDERATION
});

async function handleSignalingMessage(device: ConcreteDeviceModel, message: SignalingMessage) {
    const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)
    const peerconnection = await peerconnectionRepository.findOneOrFail({ 
        where: { uuid: message.connectionid }, 
        relations: { deviceA: true, deviceB: true } 
    })

    if (!peerconnection.deviceA.url || !peerconnection.deviceB.url) {
        throw("Peerconnection is missing an url for one of the devices")
    }

    let peerDeviceId
    if (peerconnection.deviceA.url === DeviceBaseURL + device.uuid) {
        peerDeviceId = peerconnection.deviceB.url.split("/").at(-1)
    } else if (peerconnection.deviceB.url === DeviceBaseURL + device.uuid) {
        peerDeviceId = peerconnection.deviceA.url.split("/").at(-1)
    } else {
        console.error("Device not part of Peerconnection")
        return
    }

    if (peerDeviceId) {
        const peerDeviceWs = connectedDevices.get(peerDeviceId)
        peerDeviceWs?.send(message)
    }
}

function handleDeviceMessage(device: ConcreteDeviceModel, message: Message) {
    if (isSignalingMessage(message)) {
        handleSignalingMessage(device, message)
    }
}

// TODO: generate callback signatures?
async function handleChangedCallback(device: ConcreteDeviceModel | DeviceGroupModel) {
    const urls = changedCallbacks.get(device.uuid) ?? []
    for (const url in urls) {
        fetch(url, {
            method: "post",
            body: JSON.stringify({
                callbackType: "event", 
                eventType: "device-changed",
                ...(isConcreteDeviceModel(device) ? formatConcreteDevice(device) : await formatDeviceGroup(device))
            })
        }).then((res) => {
            if (res.status == 410) {
                const changedCallbackURLs = changedCallbacks.get(device.uuid) ?? []
                changedCallbacks.set(device.uuid, changedCallbackURLs.filter(cb_url => cb_url != url))
            }
        })
    }
}

export function deviceHandling(app: Express.Application) {
    // TODO: close Peerconnections that have device as participant when websocket connection is closed?
    app.ws("/devices/ws", (ws) => {
        // authenticate and start heartbeat
        ws.once("message", async (data) => {
            // device authentication and connection
            const deviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
            const message = JSON.parse(data.toString("utf8"))
            if (!(isMessage(message) && isAuthenticationMessage(message))) {
                ws.close(1002, "Not authenticated")
                return
            }
            const device = await deviceRepository.findOneOrFail({ where: { uuid: message.id } })
            if (device.token != message.token) {
                ws.close(1002, "Not authenticated")
                return
            }
            device.connected = true
            await deviceRepository.save(device)
            handleChangedCallback(device)
            connectedDevices.set(device.uuid, ws)

            ws.send(JSON.stringify(<AuthenticationMessage>{
                messageType: "authenticate",
                id: message.id,
                authenticated: true
            }))

            // heartbeat implementation
            let isAlive = true;
            ws.on('pong', () => { isAlive = true });
            const interval = setInterval(async function ping() {
                if (isAlive === false) {
                    device.connected = false
                    await deviceRepository.save(device)
                    handleChangedCallback(device)
                    connectedDevices.delete(device.uuid)
                    return ws.terminate()
                }
                isAlive = false;
                ws.ping();
            }, 30000);

            // close handler: stop heartbeat and disconnect device
            ws.on("close", async () => {
                clearInterval(interval);
                connectedDevices.delete(device.uuid)
            });

            // message handler: handle incoming messages from devices
            ws.on("message", async (data) => {
                const message = JSON.parse(data.toString("utf8"))
                if (!isMessage(message)) {
                    ws.close(1002, "Malformed Message")
                    return
                }
                handleDeviceMessage(device, message)
            })
        })
    })
}

function isConcreteDevice(device: DeviceOverview): device is ConcreteDevice {
    return device.type == "device"
}

function isDeviceGroup(device: DeviceOverview): device is DeviceGroup {
    return device.type == "group"
}

function formatTimeSlot(timeSlot: TimeSlotModel): TimeSlot {
    return {
        available: timeSlot.available ?? true,
        start: timeSlot.start ?? undefined,
        end: timeSlot.end ?? undefined,
        repeat: (timeSlot.frequency || timeSlot.until || timeSlot.count) ? {
            frequency: timeSlot.frequency ?? undefined,
            until: timeSlot.until ?? undefined,
            count: timeSlot.count ?? undefined
        } : undefined
    }
}

function formatDeviceOverview(device: DeviceOverviewModel): DeviceOverview {
    return {
        url: DeviceBaseURL + device.uuid,
        name: device.name,
        description: device.description,
        type: device.type,
        owner: device.owner
    }
}

function formatConcreteDevice(device: ConcreteDeviceModel): ConcreteDevice {
    return {
        url: DeviceBaseURL + device.uuid,
        name: device.name,
        description: device.description,
        type: device.type,
        owner: device.owner,
        announcedAvailability: device.announcedAvailability ? device.announcedAvailability.map(formatTimeSlot) : undefined,
        connected: device.connected !== undefined ? device.connected : undefined,
        experiment: device.experiment ? device.experiment : undefined
    }
}

async function resolveDeviceReference(reference: DeviceReferenceModel, flat_group: boolean = false): Promise<ConcreteDevice|DeviceGroup|undefined> {
    if (reference.url) {
        const deviceId = reference.url.split("/").at(-1)
        if (!deviceId) return undefined
        const device = await apiClient.getDevicesByDeviceId({ device_id: deviceId, flat_group: flat_group }, reference.url)
        if (device.status === 404) return undefined
        return device.body
    }

    return undefined
}

function flattenDeviceGroup(deviceGroup: DeviceGroup): ConcreteDevice[] {
    const devices: ConcreteDevice[] = []

    if (deviceGroup.devices) {
        for (const device of deviceGroup.devices) {
            if (!device.type) continue
            if (device.type == "device") devices.push(device)
            if (device.type == "group") devices.push(...flattenDeviceGroup(device))
        }
    }

    return devices
}

async function formatDeviceGroup(deviceGroup: DeviceGroupModel, flat_group: boolean = false): Promise<DeviceGroup> {
    const devices: (ConcreteDevice|DeviceGroup)[] = []
    if (deviceGroup.devices) {
        for (const d of deviceGroup.devices) {
            const resolvedDevice = await resolveDeviceReference(d, flat_group)
            if (resolvedDevice) {
                if (resolvedDevice.type == "device") devices.push(resolvedDevice)
                if (resolvedDevice.type == "group" && !flat_group) devices.push(resolvedDevice)
                if (resolvedDevice.type == "group" && flat_group) devices.push(...flattenDeviceGroup(resolvedDevice))
            }
        }
    }

    return {
        url: DeviceBaseURL + deviceGroup.uuid,
        name: deviceGroup.name,
        description: deviceGroup.description,
        type: deviceGroup.type,
        owner: deviceGroup.owner,
        devices: devices.filter((v,i,s) => s.findIndex(d => d.url == v.url) == i)
    }
}

function writeTimeSlot(timeSlot: TimeSlotModel, object: TimeSlot) {
    timeSlot.available = object.available ?? true
    timeSlot.start = object.start
    timeSlot.end = object.end
    if (object.repeat) {
        timeSlot.frequency = object.repeat.frequency
        timeSlot.until = object.repeat.until
        timeSlot.count = object.repeat.count
    }
}

async function writeDevice(device: DeviceOverviewModel, object: DeviceOverview) {
    device.name = object.name
    device.description = object.description
    device.type = object.type
    device.owner = object.owner

    if (isConcreteDevice(object)) {
        const concreteDevice = device as ConcreteDeviceModel
        concreteDevice.connected = false
        concreteDevice.token = undefined
        if (object.announcedAvailability) {
            concreteDevice.announcedAvailability = []
            const timeSlotRepository = AppDataSource.getRepository(TimeSlotModel)
            for (const ts of object.announcedAvailability) {
                const timeSlot = timeSlotRepository.create()
                writeTimeSlot(timeSlot, ts)
                // await timeSlotRepository.save(timeSlot)
                concreteDevice.announcedAvailability.push(timeSlot)
            }
        }
        if (object.experiment) concreteDevice.experiment = object.experiment
    } else if (isDeviceGroup(object)) {
        const deviceGroup = device as DeviceGroupModel
        if (object.devices) {
            deviceGroup.devices = []
            const deviceReferenceRepository = AppDataSource.getRepository(DeviceReferenceModel)
            for (const d of object.devices) {
                const deviceReference = deviceReferenceRepository.create()
                if (d.url) deviceReference.url = d.url
                // await deviceReferenceRepository.save(deviceReference)
                deviceGroup.devices.push(deviceReference)
            }
        }
    }
}

export const getDevices: getDevicesSignature = async (_user) => {
    const deviceRepository = AppDataSource.getRepository(DeviceOverviewModel)
    const devices = await deviceRepository.find()

    return {
        status: 200,
        body: devices.map(formatDeviceOverview)
    }
}

async function handlePostDevices<M extends DeviceOverviewModel>(device: ConcreteDevice | DeviceGroup, model: EntityTarget<M>): Promise<M> {
    const deviceRepository = AppDataSource.getRepository(model)
    const deviceModel = deviceRepository.create()
    await writeDevice(deviceModel, device)
    await deviceRepository.save(deviceModel)
    return deviceModel
}

export const postDevices: postDevicesSignature = async (parameters, body, _user) => {
    const device = isConcreteDevice(body) ? 
        await handlePostDevices(body, ConcreteDeviceModel) : 
        await handlePostDevices(body, DeviceGroupModel)

    if (parameters.changedUrl) {
        const changedCallbackURLs = changedCallbacks.get(device.uuid) ?? []
        changedCallbackURLs.push(parameters.changedUrl)
        changedCallbacks.set(device.uuid, changedCallbackURLs)
    }

    return {
        status: 201,
        body: isConcreteDeviceModel(device) ? formatConcreteDevice(device) : await formatDeviceGroup(device)
    }
}

async function getDeviceModelByUUID(uuid: string): Promise<ConcreteDeviceModel|DeviceGroupModel|undefined> {
    const concreteDeviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
    const deviceGroupRepository = AppDataSource.getRepository(DeviceGroupModel)
    const concreteDevice = await concreteDeviceRepository.findOne({ 
        where: { 
            uuid: uuid 
        },
        relations: {
            announcedAvailability: true
        }
    })
    const deviceGroup = await deviceGroupRepository.findOne({ 
        where: { 
            uuid: uuid
        },
        relations: {
            devices: true
        }
    })

    if (concreteDevice && deviceGroup) throw("Multiple devices found for same uuid!")
    if (concreteDevice) return concreteDevice
    if (deviceGroup) return deviceGroup
    return undefined
}

export const getDevicesByDeviceId: getDevicesByDeviceIdSignature = async (parameters, _user) => {
    const device = await getDeviceModelByUUID(parameters.device_id)

    if (!device) {
        return {
            status: 404
        }
    } else if (isConcreteDeviceModel(device)) {
        return {
            status: 200,
            body: formatConcreteDevice(device)
        }
    } else {
        return {
            status: 200,
            body: await formatDeviceGroup(device, parameters.flat_group)
        }
    }
}

export const deleteDevicesByDeviceId: deleteDevicesByDeviceIdSignature = async (parameters, _user) => {
    const concreteDeviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
    const deviceGroupRepository = AppDataSource.getRepository(DeviceGroupModel)
    const device = await getDeviceModelByUUID(parameters.device_id)

    if (!device) {
        return {
            status: 404
        }
    }

    
    if (isConcreteDeviceModel(device)) await concreteDeviceRepository.softRemove(device)
    else await deviceGroupRepository.softRemove(device)

    return {
        status: 204
    }
}

export const patchDevicesByDeviceId: patchDevicesByDeviceIdSignature = async (parameters, body, _user) => {
    const deviceOverviewRepository = AppDataSource.getRepository(DeviceOverviewModel)
    const concreteDeviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
    const deviceGroupRepository = AppDataSource.getRepository(DeviceGroupModel)

    const deviceOverview = await deviceOverviewRepository.findOneBy({ uuid: parameters.device_id })

    if (!deviceOverview) {
        return {
            status: 404
        }
    }

    const device = deviceOverview.type === "device" ? 
        await concreteDeviceRepository.findOneBy({ uuid: parameters.device_id }) :
        await deviceGroupRepository.findOneBy({ uuid: parameters.device_id })

    if (!device) {
        return {
            status: 404
        }
    }

    if (!body) {
        return {
            status: 200,
            body: isConcreteDeviceModel(device) ? formatConcreteDevice(device) : await formatDeviceGroup(device)
        }
    }

    await writeDevice(device, body)
    // TODO: check if this works as intended
    await deviceOverviewRepository.save(device) 

    if (parameters.changedUrl) {
        const changedCallbackURLs = changedCallbacks.get(device.uuid) ?? []
        changedCallbackURLs.push(parameters.changedUrl)
        changedCallbacks.set(device.uuid, changedCallbackURLs)
    }
    handleChangedCallback(device)

    return {
        status: 200,
        body: isConcreteDeviceModel(device) ? formatConcreteDevice(device) : await formatDeviceGroup(device)
    }
}

export const postDevicesByDeviceIdAvailability: postDevicesByDeviceIdAvailabilitySignature = async (parameters, body, _user) => {
    const deviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
    const device = await deviceRepository.findOneBy({ uuid: parameters.device_id })

    if (!device) {
        return {
            status: 404
        }
    }

    const timeSlotRepository = AppDataSource.getRepository(TimeSlotModel)

    // remove old timeslots
    if (!device.announcedAvailability) {
        device.announcedAvailability = []
    } else {
        let timeSlot = undefined
        while (timeSlot = device.announcedAvailability.pop()) {
            await timeSlotRepository.softDelete({ id: timeSlot.id })
        }
    }

    // TODO: check if this suffices or if more steps need to be taken
    if (body) {
        // insert new timeslots
        for (const ts of body) {
            const timeSlot = timeSlotRepository.create()
            writeTimeSlot(timeSlot, ts)
            // await timeSlotRepository.save(timeSlot)
            device.announcedAvailability.push(timeSlot)
        }
    }

    await deviceRepository.save(device)
    handleChangedCallback(device)

    return {
        status: 200,
        body: device.announcedAvailability.map(formatTimeSlot)
    }
}

export const getDevicesByDeviceIdToken: getDevicesByDeviceIdTokenSignature = async (parameters, _user) => {
    const deviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
    const device = await deviceRepository.findOneBy({ uuid: parameters.device_id })

    if (!device) {
        return {
            status: 404
        }
    }

    device.token = randomUUID()
    await deviceRepository.save(device)

    setTimeout(async () => {
        device.token = undefined
        await deviceRepository.save(device)
    }, 30000)

    return {
        status: 200,
        body: device.token
    }
}