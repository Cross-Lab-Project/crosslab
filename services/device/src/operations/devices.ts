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
    return {
        available: timeSlot.available ?? true,
        start: timeSlot.start ?? undefined,
        end: timeSlot.end ?? undefined,
        repeat: {
            frequency: timeSlot.frequency ?? undefined,
            until: timeSlot.until ?? undefined,
            count: timeSlot.count ?? undefined
        }
    }
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
        const concreteDevice = device as DeviceConcreteModel
        concreteDevice.connected = object.connected
        if (object.announcedAvailability) {
            concreteDevice.announcedAvailability = []
            const timeSlotRepository = AppDataSource.getRepository(TimeSlotModel)
            for (const ts of object.announcedAvailability) {
                const timeSlot = timeSlotRepository.create()
                writeTimeSlot(timeSlot, ts)
                await timeSlotRepository.save(timeSlot)
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
                await deviceReferenceRepository.save(deviceReference)
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
    let device
    if (isConcreteDevice(body)) {
        const deviceRepository = AppDataSource.getRepository(DeviceConcreteModel)
        device = deviceRepository.create()
        await writeDevice(device, body)
        await deviceRepository.save(device)
    } else {
        const deviceRepository = AppDataSource.getRepository(DeviceGroupModel)
        device = deviceRepository.create()
        await writeDevice(device, body)
        await deviceRepository.save(device)
    }
    
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

    // remove old timeslot
    if (!device.announcedAvailability) {
        device.announcedAvailability = []
    } else {
        let timeSlot = undefined
        while (timeSlot = device.announcedAvailability.pop()) {
            await timeSlotRepository.softDelete({ id : timeSlot.id })
        }
    }

    // insert new timeslots
    for (const ts of body) {
        const timeSlot = timeSlotRepository.create()
        writeTimeSlot(timeSlot, ts)
        await timeSlotRepository.save(timeSlot)
        device.announcedAvailability.push(timeSlot)
    }

    await deviceRepository.save(device)
    
    return {
        status: 200,
        body: device.announcedAvailability.map(formatTimeSlot)
    }
}
