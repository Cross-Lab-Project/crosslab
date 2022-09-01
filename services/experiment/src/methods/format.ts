import {
    ServiceConfiguration,
    Experiment,
    Role,
    Device,
    Participant,
} from '../generated/types'
import {
    DeviceModel,
    RoleModel,
    ParticipantModel,
    ServiceConfigurationModel,
    ExperimentModel,
} from '../model'
import { experimentUrlFromId } from './utils'

/**
 * This function formats a {@link DeviceModel} to a {@link Device}.
 * @param deviceModel The {@link DeviceModel} to be formatted.
 * @returns The resulting {@link Device}.
 */
function formatDevice(deviceModel: DeviceModel): Device {
    return {
        device: deviceModel.url,
        role: deviceModel.role,
    }
}

/**
 * This function formats a {@link RoleModel} to a {@link Role}.
 * @param roleModel The {@link RoleModel} to be formatted.
 * @returns The resulting {@link Role}.
 */
function formatRole(roleModel: RoleModel): Role {
    return {
        name: roleModel.name,
        description: roleModel.description,
    }
}

/**
 * This function formats a {@link ParticipantModel} to a {@link Participant}.
 * @param participantModel The {@link ParticipantModel} to be formatted.
 * @returns The resulting {@link Participant}.
 */
function formatParticipant(participantModel: ParticipantModel): Participant {
    return {
        role: participantModel.role,
        serviceId: participantModel.serviceId,
        config: participantModel.config ? JSON.parse(participantModel.config) : undefined,
    }
}

/**
 * This function formats a {@link ServiceConfigurationModel} to a {@link ServiceConfiguration}.
 * @param serviceConfigurationModel The {@link ServiceConfigurationModel} to be formatted.
 * @returns The resulting {@link ServiceConfiguration}.
 */
function formatServiceConfiguration(
    serviceConfigurationModel: ServiceConfigurationModel
): ServiceConfiguration {
    return {
        serviceType: serviceConfigurationModel.serviceType,
        configuration: serviceConfigurationModel.configuration
            ? JSON.parse(serviceConfigurationModel.configuration)
            : undefined,
        participants: serviceConfigurationModel.participants
            ? serviceConfigurationModel.participants.map(formatParticipant)
            : undefined,
    }
}

/**
 * This function formats a {@link ExperimentModel} to a {@link Experiment}.
 * @param experimentModel The {@link ExperimentModel} to be formatted.
 * @returns The resulting {@link Experiment}.
 */
export function formatExperiment(experimentModel: ExperimentModel): Experiment {
    return {
        url: experimentUrlFromId(experimentModel.uuid),
        bookingTime: {
            startTime: experimentModel.bookingStart,
            endTime: experimentModel.bookingEnd,
        },
        status: experimentModel.status,
        devices: experimentModel.devices
            ? experimentModel.devices.map(formatDevice)
            : undefined,
        roles: experimentModel.roles ? experimentModel.roles.map(formatRole) : undefined,
        connections: experimentModel.connections
            ? experimentModel.connections.map((c) => c.url)
            : undefined,
        serviceConfigurations: experimentModel.serviceConfigurations
            ? experimentModel.serviceConfigurations.map(formatServiceConfiguration)
            : undefined,
    }
}
