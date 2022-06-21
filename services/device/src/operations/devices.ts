import {
    DeviceOverview,
	ConcreteDevice,
	DeviceGroup,
	//Availability,
    TimeSlot
} from "../generated/types"
import {
    getDevicesSignature,
	postDevicesSignature,
	getDevicesByDeviceIdSignature,
	deleteDevicesByDeviceIdSignature,
	patchDevicesByDeviceIdSignature,
	postDevicesByDeviceIdAvailabilitySignature
} from "../generated/signatures/devices"
import { AppDataSource } from "../data_source"
import { DeviceOverviewModel, DeviceConcreteModel, DeviceGroupModel, TimeSlotModel, DeviceReferenceModel } from "../model";
import { config } from "../config"

const DeviceBaseURL = config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + 'devices/'

function formatTimeSlot(timeSlot: TimeSlotModel): TimeSlot {
    const ts: TimeSlot = {}
    if (timeSlot.start) ts.start = timeSlot.start
    if (timeSlot.end) ts.end = timeSlot.end
    if (timeSlot.frequency || timeSlot.until || timeSlot.count) {
        ts.repeat = {}
        if (timeSlot.frequency) ts.repeat.freqency = timeSlot.frequency
        if (timeSlot.until) ts.repeat.until = timeSlot.until
        if (timeSlot.count) ts.repeat.count = timeSlot.count
    }
    return ts
} 

function formatDevice(device: DeviceOverviewModel): DeviceOverview {
    return { 
        url: DeviceBaseURL + device.uuid,
        name: device.name,
        description: device.description,
        type: device.type,
        owner: device.owner 
    }
}

function isConcreteDevice(device: DeviceOverview): device is ConcreteDevice {
    return device.type == "device"
}

function isDeviceGroup(device: DeviceOverview): device is DeviceGroup {
    return device.type == "group"
}

function writeTimeSlot(timeSlot: TimeSlotModel, device: DeviceConcreteModel, object: TimeSlot) {
    if (object.start) timeSlot.start = object.start
    if (object.end) timeSlot.end = object.end
    if (object.repeat) {
        if (object.repeat.freqency) timeSlot.frequency = object.repeat.frequency
        if (object.repeat.until) timeSlot.until = object.repeat.until
        if (object.repeat.count) timeSlot.count = object.repeat.count
    }
    timeSlot.device = device
}

async function writeDevice(device: DeviceOverviewModel, object: DeviceOverview) {
    if (object.name) 
        device.name = object.name
    if (object.description) 
        device.description = object.description
    if (object.type) 
        device.type = object.type
    if (object.owner) 
        device.owner = object.owner

    if (isConcreteDevice(object)) {
        const concreteDevice = device as DeviceConcreteModel
        if (object.connected) 
            concreteDevice.connected = object.connected
        if (object.announcedAvailability) {
            const timeSlotRepository = AppDataSource.getRepository(TimeSlotModel)
            concreteDevice.announcedAvailability = []
            for (const ts of object.announcedAvailability) {
                const timeSlot = timeSlotRepository.create()
                writeTimeSlot(timeSlot, concreteDevice, ts)
                await timeSlotRepository.save(timeSlot)
                concreteDevice.announcedAvailability.push(timeSlot)
            }
        }
        if (object.experiment) concreteDevice.experiment = object.experiment
    } else if (isDeviceGroup(object)) {
        const deviceGroup = device as DeviceGroupModel
        if (object.devices) {
            deviceGroup.devices = []
            for (const d of object.devices) {
                const deviceReferenceRepository = AppDataSource.getRepository(DeviceReferenceModel)
                const deviceReference = deviceReferenceRepository.create()
                if (d.url) deviceReference.url = d.url
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
        body: devices.map(formatDevice)
    }
}

export const postDevices: postDevicesSignature = async (_parameters, body, _user) => {
    const deviceRepository = AppDataSource.getRepository(DeviceOverviewModel)
    const device = deviceRepository.create()
    await writeDevice(device, body)
    await deviceRepository.save(device)
    
    return {
        status: 201,
        body: formatDevice(device)
    }
}

export const getDevicesByDeviceId: getDevicesByDeviceIdSignature = async (parameters, _user) => {
    const deviceRepository = AppDataSource.getRepository(DeviceOverviewModel)
    const device = await deviceRepository.findOneBy({ uuid: parameters.path.device_id })
    
    if (!device) {
        return {
            status: 404
        }
    }

    return {
        status: 200,
        body: formatDevice(device)
    }
}

export const deleteDevicesByDeviceId: deleteDevicesByDeviceIdSignature = async (parameters, _user) => {
    const deviceRepository = AppDataSource.getRepository(DeviceOverviewModel)
    const result = await deviceRepository.softDelete({ uuid: parameters.path.device_id })

    if (!result.affected) {
        return {
            status: 404
        }
    }
    
    if (result.affected > 1) {
        // TBD
    }

    return {
        status: 204
    }
}

export const patchDevicesByDeviceId: patchDevicesByDeviceIdSignature = async (parameters, body, _user) => {
    const deviceRepository = AppDataSource.getRepository(DeviceOverviewModel)
    const device = await deviceRepository.findOneBy({ uuid: parameters.path.device_id })

    if (!device) {
        return {
            status: 404
        }
    }

    await writeDevice(device, body)
    await deviceRepository.save(device)
    
    return {
        status: 200,
        body: formatDevice(device)
    }
}

export const postDevicesByDeviceIdAvailability: postDevicesByDeviceIdAvailabilitySignature = async (parameters, body, _user) => {
    const deviceRepository = AppDataSource.getRepository(DeviceConcreteModel)
    const device = await deviceRepository.findOneBy({ uuid: parameters.path.device_id })

    if (!device) {
        return {
            status: 404
        }
    }

    const timeSlotRepository = AppDataSource.getRepository(TimeSlotModel)
    const to_remove: TimeSlotModel[] = []
    if (!device.announcedAvailability) device.announcedAvailability = []
    for (const timeSlot of body) {
        const ts = timeSlotRepository.create()
        if (timeSlot.available) {
            writeTimeSlot(ts, device, timeSlot)
            await timeSlotRepository.save(ts)
            device.announcedAvailability.push(ts)
        } else {
            const timeSlots = device.announcedAvailability.filter((ts) => ts.start == timeSlot.start && ts.end == timeSlot.end)
            if (timeSlot.repeat) {
                for (const ts of timeSlots) {
                    if (timeSlot.repeat.freqency) {
                        if (!ts.frequency) break
                        if (timeSlot.repeat.freqency != ts.frequency) break
                    }
                    if (timeSlot.repeat.until) {
                        if (!ts.until) break
                        if (timeSlot.repeat.until != ts.until) break
                    }
                    if (timeSlot.repeat.count) {
                        if (!ts.count) break
                        if (timeSlot.repeat.count != ts.count) break
                    }
                }
            }
            to_remove.push(ts)
        }
    }

    device.announcedAvailability = device.announcedAvailability.filter((el) => to_remove.includes(el))

    for (const ts of to_remove) {
        await timeSlotRepository.softDelete(ts)
    }

    await deviceRepository.save(device)
    
    return {
        status: 200,
        body: device.announcedAvailability.map(formatTimeSlot)
    }
}
