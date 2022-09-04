import { ConcreteDevice, DeviceGroup, Peerconnection, ServiceConfig, TimeSlot } from "@cross-lab-project/api-client/dist/generated/device/types";
import { fail } from "assert"
import { CompareOptions, isCompareOption, updateCompareOptions } from "./common"

export function flattenDeviceGroup(deviceGroup: DeviceGroup): ConcreteDevice[] {
    const devices: ConcreteDevice[] = []
    if (deviceGroup.devices) {
        for (const device of deviceGroup.devices) {
            if (!device.type) continue;
            if (device.type == "device") devices.push(device)
            if (device.type == "group") devices.push(...flattenDeviceGroup(device))
        }
    }
    return devices
}

export interface Device {
    [k: string]: unknown;
    url?: string | undefined;
    config?: {
        [k: string]: unknown;
        services?: ServiceConfig[] | undefined;
    } | undefined;
}

export interface CompareOptionsTimeslot extends CompareOptions<TimeSlot> {
    available: boolean
    end: boolean
    repeat: {
        count: boolean
        frequency: boolean
        until: boolean
    } | boolean
}

export interface CompareOptionsServiceConfig extends CompareOptions<ServiceConfig> {
    serviceType: boolean
    serviceId: boolean
    remoteServiceId: boolean
}

export interface CompareOptionsDevice extends CompareOptions<Device> {
    config: {
        services: CompareOptionsServiceConfig | boolean
    } | boolean
    url: boolean
}

export interface CompareOptionsPeerconnection extends CompareOptions<Peerconnection> {
    url: boolean
    devices: CompareOptionsDevice | boolean
}

export interface CompareOptionsDeviceGroup extends CompareOptions<DeviceGroup> {
    url: boolean
    name: boolean
    description: boolean
    type: boolean
    owner: boolean
    devices: {
        url: boolean
    } | boolean
}

export interface CompareOptionsConcreteDevice extends CompareOptions<ConcreteDevice> {
    url: boolean
    name: boolean
    description: boolean
    type: boolean
    owner: boolean
    connected: boolean
    announcedAvailability: CompareOptionsTimeslot | boolean
    experiment: boolean
}

export function compareTimeSlots(timeSlotA: TimeSlot, timeSlotB: TimeSlot, options?: Partial<CompareOptionsTimeslot> | boolean): boolean {
    const defaultOptions: CompareOptionsTimeslot = {
        available: true,
        end: true,
        repeat: true
    }

    const compareOptions = updateCompareOptions(defaultOptions, options)

    if (compareOptions.available && (timeSlotA.available != timeSlotB.available)) return false
    if (compareOptions.end && (timeSlotA.end != timeSlotB.end)) return false
    if (compareOptions.repeat) {
        if (!timeSlotA.repeat && timeSlotB.repeat) return false
        if (timeSlotA.repeat && !timeSlotB.repeat) return false
        if (timeSlotA.repeat && timeSlotB.repeat) {
            if (timeSlotA.repeat.count != timeSlotB.repeat.count) return false
            if (timeSlotA.repeat.frequency != timeSlotB.repeat.frequency) return false
            if (timeSlotA.repeat.until != timeSlotB.repeat.until) return false
        }
    }
    if (timeSlotA.start != timeSlotB.start) return false

    return true
}

export function compareDeviceGroups(deviceA: DeviceGroup, deviceB: DeviceGroup, options?: Partial<CompareOptionsDeviceGroup> | boolean, flat_group?: boolean): boolean {
    const defaultOptions: CompareOptionsDeviceGroup = {
        description: true,
        devices: true,
        name: true,
        owner: true,
        type: true,
        url: true
    }

    const compareOptions = updateCompareOptions(defaultOptions, options)

    if (compareOptions.description && (deviceA.description != deviceB.description)) return false
    if (compareOptions.name && (deviceA.name != deviceB.name)) return false
    if (compareOptions.owner && (deviceA.owner != deviceB.owner)) return false
    if (compareOptions.type && (deviceA.type != "group" || deviceB.type != "group")) return false
    if (compareOptions.url && (deviceA.url != deviceB.url)) return false
    if (compareOptions.devices) {
        if (!deviceA.devices && deviceB.devices) return false
        if (deviceA.devices && !deviceB.devices) return false
        if (deviceA.devices && deviceB.devices) {
            let devicesA = deviceA.devices
            let devicesB = deviceB.devices
            if (flat_group) {
                devicesA = flattenDeviceGroup(deviceA)
                devicesB = flattenDeviceGroup(deviceB)
            }
            if (devicesA.length != devicesB.length) return false
            for (let i = 0; i < devicesA.length; i++) {
                const dA = devicesA[i]
                const dB = devicesB[i]
                if (dA.url != dB.url) return false
                if (dA.type && dB.type) {
                    if (dA.type != dB.type) return false
                    if (dA.type == "device") compareConcreteDevices(dA, dB)
                    if (dA.type == "group") compareDeviceGroups(dA, dB)
                }
            }
        }
    }

    return true
}

export function compareConcreteDevices(deviceA: ConcreteDevice, deviceB: ConcreteDevice, options?: Partial<CompareOptionsConcreteDevice> | boolean): boolean {
    const defaultOptions: CompareOptionsConcreteDevice = {
        announcedAvailability: true,
        connected: true,
        description: true,
        experiment: true,
        name: true,
        owner: true,
        type: true,
        url: true
    }

    const compareOptions = updateCompareOptions(defaultOptions, options)

    if (compareOptions.announcedAvailability) {
        if (!deviceA.announcedAvailability && deviceB.announcedAvailability) return false
        if (deviceA.announcedAvailability && !deviceB.announcedAvailability) return false
        if (deviceA.announcedAvailability && deviceB.announcedAvailability) {
            if (deviceA.announcedAvailability.length != deviceB.announcedAvailability.length) return false
            for (let i = 0; i < deviceA.announcedAvailability.length; i++) {
                const timeSlotA = deviceA.announcedAvailability[i]
                const timeSlotB = deviceB.announcedAvailability[i]
                if (!compareTimeSlots(timeSlotA, timeSlotB)) return false
            }
        }
    }
    if (compareOptions.connected && (deviceA.connected != deviceB.connected)) return false
    if (compareOptions.description && (deviceA.description != deviceB.description)) return false
    if (compareOptions.experiment && (deviceA.experiment != deviceB.experiment)) return false
    if (compareOptions.name && (deviceA.name != deviceB.name)) return false
    if (compareOptions.owner && (deviceA.owner != deviceB.owner)) return false
    if (compareOptions.type && (deviceA.type != "device" || deviceB.type != "device")) return false
    if (compareOptions.url && (deviceA.url != deviceB.url)) return false

    return true
}

export function compareServiceConfigs(serviceConfigA: ServiceConfig, serviceConfigB: ServiceConfig, options?: Partial<CompareOptionsServiceConfig> | boolean): boolean {
    const defaultOptions: CompareOptionsServiceConfig = {
        remoteServiceId: true,
        serviceId: true,
        serviceType: true
    }

    const compareOptions = updateCompareOptions(defaultOptions, options)

    if (compareOptions.remoteServiceId && (serviceConfigA.remoteServiceId != serviceConfigB.remoteServiceId)) return false
    if (compareOptions.serviceId && (serviceConfigA.serviceId != serviceConfigB.serviceId)) return false
    if (compareOptions.serviceType && (serviceConfigA.serviceType != serviceConfigB.serviceType)) return false

    return true
}

export function compareDevices(deviceA: Device, deviceB: Device, options?: Partial<CompareOptionsDevice> | boolean): boolean {
    const defaultOptions: CompareOptionsDevice = {
        config: {
            services: {
                remoteServiceId: true,
                serviceId: true,
                serviceType: true
            }
        },
        url: true
    }

    const compareOptions = updateCompareOptions(defaultOptions, options)

    if (compareOptions.url && (deviceA.url != deviceB.url)) return false
    if (compareOptions.config) {
        const [configA, configB] = [deviceA.config, deviceB.config]
        if (!configA && configB) return false
        if (configA && !configB) return false
        if (configA && configB) {
            const [servicesA, servicesB] = [configA.services, configB.services]
            if (!servicesA && servicesB) return false
            if (servicesA && !servicesB) return false
            if (servicesA && servicesB) {
                if (servicesA.length != servicesB.length) return false
                for (let i = 0; i < servicesA.length; i++) {
                    if (!isCompareOption(compareOptions.config)) fail("compare options not set correctly")
                    if (!compareServiceConfigs(servicesA[i], servicesB[i], compareOptions.config)) return false
                }
            }
        }
    }

    return true
}

export function comparePeerconnections(peerconnectionA: Peerconnection, peerconnectionB: Peerconnection, options?: Partial<CompareOptionsPeerconnection> | boolean): boolean {
    const defaultOptions: CompareOptionsPeerconnection = {
        url: true,
        devices: {
            config: {
                services: {
                    remoteServiceId: true,
                    serviceId: true,
                    serviceType: true
                }
            },
            url: true
        }
    }

    const compareOptions = updateCompareOptions(defaultOptions, options)

    if (compareOptions.url && (peerconnectionA.url != peerconnectionB.url)) return false
    if (compareOptions.devices) {
        const [devicesA, devicesB] = [peerconnectionA.devices, peerconnectionB.devices]
        if (!devicesA && devicesB) return false
        if (devicesA && !devicesB) return false
        if (devicesA && devicesB) {
            if (!compareDevices(devicesA[0], devicesB[0], compareOptions.devices)) return false
            if (!compareDevices(devicesA[1], devicesB[1], compareOptions.devices)) return false
        }
    }

    return true
}