import {
    DeviceOverview,
    ConcreteDevice,
    DeviceGroup,
    TimeSlot,
    AvailabilityRule
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
    AvailabilityRuleModel, 
    DeviceReferenceModel,
    PeerconnectionModel,
    isConcreteDeviceModel,
    TimeSlotModel,
    isDeviceGroupModel
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
import fetch from "node-fetch";
import { APIClient } from "@cross-lab-project/api-client"

const YEAR = 365*24*60*60*1000

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
        start: new Date(timeSlot.start).toISOString(),
        end: new Date(timeSlot.end).toISOString()
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

function writeAvailabilityRule(availabilityRule: AvailabilityRuleModel, object: AvailabilityRule) {
    availabilityRule.available = object.available ?? true
    availabilityRule.start = object.start ? new Date(object.start).getTime() : undefined
    availabilityRule.end = object.end ? new Date(object.end).getTime() : undefined
    if (object.repeat) {
        availabilityRule.frequency = object.repeat.frequency
        availabilityRule.until = object.repeat.until ? new Date(object.repeat.until).getTime() : undefined
        availabilityRule.count = object.repeat.count
    }
}

function writeDeviceOverview(device: DeviceOverviewModel, object: DeviceOverview) {
    device.name = object.name
    device.description = object.description
    device.type = object.type
    device.owner = object.owner
}

function sortTimeSlots(availability: TimeSlotModel[]) {
    availability.sort((a, b) => {
        if (a.start < b.start) return -1
        if (a.start > b.start) return 1
        return 0
    })
}

function mergeTimeSlots(availability: TimeSlotModel[]) {
    for (let i = 0; i < availability.length; i++) {
        if (i < availability.length - 1) {
            if (availability[i+1].start <= availability[i].end) {
                availability = availability.splice(i+1, 1)
                i--
            }
        }
    }
}

function invertTimeSlots(availability: TimeSlotModel[], start: number, end: number) {
    if (availability.length === 0) return

    const timeSlotRepository = AppDataSource.getRepository(TimeSlotModel)

    // sort by starttime
    sortTimeSlots(availability)

    // merge timeslots
    mergeTimeSlots(availability)

    const newAvailability: TimeSlotModel[] = []

    // create first timeslot
    const firstTimeSlot = timeSlotRepository.create()
    firstTimeSlot.start = start
    firstTimeSlot.end = availability[0].start

    if (firstTimeSlot.start !== firstTimeSlot.end) 
        newAvailability.push(firstTimeSlot)

    // create intermediate timeslots
    for (let i = 0; i < availability.length; i++) {
        if (i < availability.length - 1) {
            const timeSlot = timeSlotRepository.create()
            timeSlot.start = availability[i].end
            timeSlot.end = availability[i+1].start
            newAvailability.push(timeSlot)
        }
    }
    
    // create last timeslot
    const lastTimeSlot = timeSlotRepository.create()
    lastTimeSlot.start = availability[availability.length - 1].end
    lastTimeSlot.end = end

    if (lastTimeSlot.start !== lastTimeSlot.end) 
        newAvailability.push(lastTimeSlot)

    availability = newAvailability
}

function addTimeSlotsFromRule(availability: TimeSlotModel[], availabilityRule: AvailabilityRuleModel, start: number, end: number) {
    const timeSlotRepository = AppDataSource.getRepository(TimeSlotModel)
    const timeSlot = timeSlotRepository.create()
    timeSlot.start = availabilityRule.start && availabilityRule.start >= start ? availabilityRule.start : start,
    timeSlot.end = availabilityRule.end && availabilityRule.end <= end ? availabilityRule.end : end
    
    if (availabilityRule.frequency && availabilityRule.end) {
        let frequency = 0
        switch (availabilityRule.frequency) {
            case "HOURLY":
                frequency = 60 * 60 * 1000
                break
            case "DAILY":
                frequency = 24 * 60 * 60 * 1000
                break
            case "WEEKLY":
                frequency = 7 * 24 * 60 * 60 * 1000
                break
            case "MONTHLY":
                frequency = 28 * 7 * 24 * 60 * 60 * 1000 // not very precise since months vary in length
                break
            case "YEARLY":
                frequency = 365 * 7 * 24 * 60 * 60 * 1000 // not taking leap years into account
                break
        }
        if (frequency < (timeSlot.end - timeSlot.start)) {
            timeSlot.start = start
            timeSlot.end = end
        }
        const until = availabilityRule.until ?? end
        let count = availabilityRule.count
        
        let currentTimeSlot = timeSlotRepository.create()
        currentTimeSlot.start = availabilityRule.start !== undefined ? availabilityRule.start + frequency : start
        currentTimeSlot.end = availabilityRule.end + frequency

        while (until < (currentTimeSlot.end - frequency)) {
            if (until !== undefined) {
                if (until < currentTimeSlot.start) break
                if (!availabilityRule.start && until < (currentTimeSlot.end - frequency)) break
            }
            if (count !== undefined) {
                if (!count) break
                count--
            }

            if (currentTimeSlot.start < start) currentTimeSlot.start = start
            if (currentTimeSlot.end > end) currentTimeSlot.end = end 
            availability.push(currentTimeSlot)
            const newCurrentTimeSlot = timeSlotRepository.create()

            if (availabilityRule.start) {
                newCurrentTimeSlot.start = currentTimeSlot.start + frequency
                newCurrentTimeSlot.end = currentTimeSlot.end + frequency
            } else {
                newCurrentTimeSlot.start = start
                newCurrentTimeSlot.end = currentTimeSlot.end + frequency
            }

            currentTimeSlot = newCurrentTimeSlot
        }
    }

    availability.push(timeSlot)
}

function applyAvailabilityRule(availability: TimeSlotModel[], availabilityRule: AvailabilityRuleModel, start: number, end: number) {
    if (availabilityRule.available === true || availabilityRule.available === undefined) {
        // add all new timeslots
        addTimeSlotsFromRule(availability, availabilityRule, start, end)

        // sort by starttime
        sortTimeSlots(availability)

        // merge timeslots
        mergeTimeSlots(availability)
    } else {
        // invert availability
        invertTimeSlots(availability, start, end)

        // add all new timeslots
        addTimeSlotsFromRule(availability, availabilityRule, start, end)

        // sort by starttime
        sortTimeSlots(availability)

        // merge timeslots
        mergeTimeSlots(availability)
        
        // invert availability
        invertTimeSlots(availability, start, end)
    }
}

function applyAvailabilityRules(availability: TimeSlotModel[], availabilityRules: AvailabilityRuleModel[], start: number, end: number) {
    for (const availabilityRule of availabilityRules) {
        applyAvailabilityRule(availability, availabilityRule, start, end)
    }
}

function writeConcreteDevice(device: ConcreteDeviceModel, object: ConcreteDevice & { announcedAvailability?: AvailabilityRule[] }) {
    writeDeviceOverview(device, object)
    
    device.connected = false
    device.token = undefined
    device.experiment = object.experiment

    if (object.announcedAvailability) {
        if (!device.availabilityRules) device.availabilityRules = []
        const availabilityRuleRepository = AppDataSource.getRepository(AvailabilityRuleModel)
        for (const availabilityRule of object.announcedAvailability) {
            const availabilityRuleModel = availabilityRuleRepository.create()
            writeAvailabilityRule(availabilityRuleModel, availabilityRule)
            device.availabilityRules.push(availabilityRuleModel)
        }
    }

    // TODO: generate announcedAvailability timeslots
    if (!device.announcedAvailability) device.announcedAvailability = []
    if (device.availabilityRules) {
        device.announcedAvailability = []
        const start = Date.now()
        const end = start + YEAR
        applyAvailabilityRules(device.announcedAvailability, device.availabilityRules, start, end)
    }
}

function writeDeviceGroup(device: DeviceGroupModel, object: DeviceGroup) {
    writeDeviceOverview(device, object)

    if (object.devices) {
        if (!device.devices) device.devices = []
        const deviceReferenceRepository = AppDataSource.getRepository(DeviceReferenceModel)
        for (const deviceReference of object.devices) {
            const deviceReferenceModel = deviceReferenceRepository.create()
            deviceReferenceModel.url = deviceReference.url
            device.devices.push(deviceReferenceModel)
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

export const postDevices: postDevicesSignature = async (parameters, body, _user) => {
    let device
    if (isConcreteDevice(body)) {
        const concreteDeviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
        device = concreteDeviceRepository.create()
        writeConcreteDevice(device, body)
        await concreteDeviceRepository.save(device)
    } else {
        const deviceGroupRepository = AppDataSource.getRepository(DeviceGroupModel)
        device = deviceGroupRepository.create()
        writeDeviceGroup(device, body)
        await deviceGroupRepository.save(device)
    }

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

    if (isConcreteDeviceModel(device) && isConcreteDevice(body)) {
        writeConcreteDevice(device, body)
        concreteDeviceRepository.save(device)
    } else if (isDeviceGroupModel(device) && isDeviceGroup(body)) {
        writeDeviceGroup(device, body)
        deviceGroupRepository.save(device)
    } else {
        return {
            status: 400
        }
    }

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

    const availabilityRuleRepository = AppDataSource.getRepository(AvailabilityRuleModel)

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
    applyAvailabilityRules(device.announcedAvailability, device.availabilityRules, start, end)

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