import { Experiment, Role, ServiceConfiguration } from "@cross-lab-project/api-client/dist/generated/experiment/types"
import { CompareOptions, updateCompareOptions } from "./common.js"

export interface BookingTime {
    startTime?: string
    endTime?: string
    [k: string]: unknown
}

export interface Device {
    device?: string
    role?: string
    [k: string]: unknown
}

export interface Participant {
    role?: string
    serviceId?: string
    config?: {
        [k: string]: unknown
    }
    [k: string]: unknown
}

export interface CompareOptionsBookingTime extends CompareOptions<BookingTime> {
    startTime: boolean
    endTime: boolean
}

export interface CompareOptionsDevice extends CompareOptions<Device> {
    device: boolean
    role: boolean
}

export interface CompareOptionsRole extends CompareOptions<Role> {
    name: boolean
    description: boolean
}

export interface CompareOptionsParticipant extends CompareOptions<Participant> {
    role: boolean
    serviceId: boolean
    config: boolean
}

export interface CompareOptionsServiceConfiguration extends CompareOptions<ServiceConfiguration> {
    serviceType: boolean
    configuration: boolean
    participants: CompareOptionsParticipant | boolean
}

export interface CompareOptionsExperiment extends CompareOptions<Experiment> {
    url: boolean
    status: boolean
    bookingTime: CompareOptionsBookingTime | boolean
    devices: CompareOptionsDevice | boolean
    roles: CompareOptionsRole | boolean
    connections: boolean
    serviceConfigurations: CompareOptionsServiceConfiguration
}

export function compareBookingTimes(bookingTimeA: BookingTime, bookingTimeB: BookingTime, options?: Partial<CompareOptionsBookingTime> | boolean): boolean {
    const defaultOptions: CompareOptionsBookingTime = {
        startTime: true,
        endTime: true
    }

    const compareOptions = updateCompareOptions(defaultOptions, options)

    if (compareOptions.startTime && (bookingTimeA.startTime != bookingTimeB.startTime)) return false
    if (compareOptions.endTime && (bookingTimeA.endTime != bookingTimeB.endTime)) return false

    return true
}

export function compareDevices(deviceA: Device, deviceB: Device, options?: Partial<CompareOptionsDevice> | boolean): boolean {
    const defaultOptions: CompareOptionsDevice = {
        device: true,
        role: true
    }

    const compareOptions = updateCompareOptions(defaultOptions, options)

    if (compareOptions.device && (deviceA.device != deviceB.device)) return false
    if (compareOptions.role && (deviceA.role != deviceB.role)) return false

    return true
}

export function compareRoles(roleA: Role, roleB: Role, options?: Partial<CompareOptionsRole> | boolean): boolean {
    const defaultOptions: CompareOptionsRole = {
        description: true,
        name: true
    }

    const compareOptions = updateCompareOptions(defaultOptions, options)

    if (compareOptions.description && (roleA.description != roleB.description)) return false
    if (compareOptions.name && (roleA.name != roleB.name)) return false

    return true
}

export function compareParticipants(participantA: Participant, participantB: Participant, options?: Partial<CompareOptionsParticipant> | boolean): boolean {
    const defaultOptions: CompareOptionsParticipant = {
        config: true,
        role: true,
        serviceId: true
    }

    const compareOptions = updateCompareOptions(defaultOptions, options)

    if (compareOptions.config && (JSON.stringify(participantA.config) != JSON.stringify(participantB.config))) return false
    if (compareOptions.role && (participantA.role != participantB.role)) return false
    if (compareOptions.serviceId && (participantA.serviceId != participantB.serviceId)) return false

    return true
}

export function compareServiceConfigurations(serviceConfigurationA: ServiceConfiguration, serviceConfigurationB: ServiceConfiguration, options?: Partial<CompareOptionsServiceConfiguration> | boolean): boolean {
    const defaultOptions: CompareOptionsServiceConfiguration = {
        configuration: true,
        participants: {
            config: true,
            role: true,
            serviceId: true
        },
        serviceType: true
    }

    const compareOptions = updateCompareOptions(defaultOptions, options)

    if (compareOptions.configuration && (JSON.stringify(serviceConfigurationA.configuration) != JSON.stringify(serviceConfigurationB.configuration))) return false
    if (compareOptions.participants) {
        if (serviceConfigurationA.participants && !serviceConfigurationB.participants) return false
        if (!serviceConfigurationA.participants && serviceConfigurationB.participants) return false
        if (serviceConfigurationA.participants && serviceConfigurationB.participants) {
            if (serviceConfigurationA.participants.length != serviceConfigurationB.participants.length) return false
            for (let i = 0; i < serviceConfigurationA.participants.length; i++) {
                if (!compareParticipants(serviceConfigurationA.participants[i], serviceConfigurationB.participants[i])) return false
            }
        }
    }

    return true
}

export function compareExperiments(experimentA: Experiment, experimentB: Experiment, options?: Partial<CompareOptionsExperiment> | boolean): boolean {
    const defaultOptions: CompareOptionsExperiment = {
        url: true,
        status: true,
        bookingTime: {
            startTime: true,
            endTime: true
        },
        devices: {
            device: true,
            role: true
        },
        connections: true,
        roles: {
            description: true,
            name: true
        },
        serviceConfigurations: {
            configuration: true,
            participants: {
                config: true,
                role: true,
                serviceId: true
            },
            serviceType: true
        }
    }

    const compareOptions = updateCompareOptions(defaultOptions, options)

    if (compareOptions.url && (experimentA.url != experimentB.url)) return false
    if (compareOptions.status && (experimentA.status != experimentB.status)) return false
    if (compareOptions.bookingTime) {
        if (experimentA.bookingTime && !experimentB.bookingTime) return false
        if (!experimentA.bookingTime && experimentB.bookingTime) return false
        if (experimentA.bookingTime && experimentB.bookingTime) {
            if (!compareBookingTimes(experimentA.bookingTime, experimentB.bookingTime, compareOptions.bookingTime)) return false
        }
    }
    if (compareOptions.connections) {
        if (experimentA.connections && !experimentB.connections) return false
        if (!experimentA.connections && experimentB.connections) return false
        if (experimentA.connections && experimentB.connections) {
            if (experimentA.connections.length != experimentB.connections.length) return false
            for (let i = 0; i < experimentA.connections.length; i++) {
                if (experimentA.connections[i] != experimentB.connections[i]) return false
            }
        }
    }
    if (compareOptions.devices) {
        if (experimentA.devices && !experimentB.devices) return false
        if (!experimentA.devices && experimentB.devices) return false
        if (experimentA.devices && experimentB.devices) {
            if (experimentA.devices.length != experimentB.devices.length) return false
            for (let i = 0; i < experimentA.devices.length; i++) {
                if (!compareDevices(experimentA.devices[i], experimentB.devices[i], compareOptions.devices)) return false
            }
        }
    }
    if (compareOptions.roles) {
        if (experimentA.roles && !experimentB.roles) return false
        if (!experimentA.roles && experimentB.roles) return false
        if (experimentA.roles && experimentB.roles) {
            if (experimentA.roles.length != experimentB.roles.length) return false
            for (let i = 0; i < experimentA.roles.length; i++) {
                if (!compareRoles(experimentA.roles[i], experimentB.roles[i], compareOptions.roles)) return false
            }
        }
    }
    if (compareOptions.serviceConfigurations) {
        if (experimentA.serviceConfigurations && !experimentB.serviceConfigurations) return false
        if (!experimentA.serviceConfigurations && experimentB.serviceConfigurations) return false
        if (experimentA.serviceConfigurations && experimentB.serviceConfigurations) {
            if (experimentA.serviceConfigurations.length != experimentB.serviceConfigurations.length) return false
            for (let i = 0; i < experimentA.serviceConfigurations.length; i++) {
                if (!compareServiceConfigurations(experimentA.serviceConfigurations[i], experimentB.serviceConfigurations[i], compareOptions.serviceConfigurations)) return false
            }
        }
    }

    return true
}