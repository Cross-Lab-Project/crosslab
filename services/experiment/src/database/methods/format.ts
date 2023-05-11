import {
    ServiceConfiguration,
    Experiment,
    Role,
    Device,
    Participant,
} from '../../generated/types'
import { experimentUrlFromId } from '../../util/url'
import {
    DeviceModel,
    RoleModel,
    ParticipantModel,
    ServiceConfigurationModel,
    ExperimentModel,
} from '../model'

/**
 * This function formats a DeviceModel to a Device.
 * @param deviceModel The DeviceModel to be formatted.
 * @returns The resulting Device.
 */
function formatDeviceModel(deviceModel: DeviceModel): Device {
    return {
        device: deviceModel.url,
        role: deviceModel.role,
        additionalProperties: deviceModel.additionalProperties,
    }
}

/**
 * This function formats a RoleModel to a Role.
 * @param roleModel The RoleModel to be formatted.
 * @returns The resulting Role.
 */
function formatRoleModel(roleModel: RoleModel): Role {
    return {
        name: roleModel.name,
        description: roleModel.description ?? undefined,
    }
}

/**
 * This function formats a ParticipantModel to a Participant.
 * @param participantModel The ParticipantModel to be formatted.
 * @returns The resulting Participant.
 */
function formatParticipantModel(participantModel: ParticipantModel): Participant {
    return {
        role: participantModel.role,
        serviceId: participantModel.serviceId,
        config: participantModel.config ? participantModel.config : undefined,
    }
}

/**
 * This function formats a ServiceConfigurationModel to a ServiceConfiguration.
 * @param serviceConfigurationModel The ServiceConfigurationModel to be formatted.
 * @returns The resulting ServiceConfiguration.
 * @notExported
 */
function formatServiceConfigurationModel(
    serviceConfigurationModel: ServiceConfigurationModel
): ServiceConfiguration {
    return {
        serviceType: serviceConfigurationModel.serviceType,
        configuration: serviceConfigurationModel.configuration
            ? serviceConfigurationModel.configuration
            : undefined,
        participants: serviceConfigurationModel.participants
            ? serviceConfigurationModel.participants.map((participant) =>
                  formatParticipantModel(participant)
              )
            : undefined,
    }
}

/**
 * This function formats an ExperimentModel to an Experiment.
 * @param experimentModel The ExperimentModel to be formatted.
 * @returns The resulting Experiment.
 */
export function formatExperimentModel(experimentModel: ExperimentModel): Experiment {
    const experimentUrl = experimentUrlFromId(experimentModel.uuid)
    return {
        url: experimentUrl,
        bookingTime: {
            startTime: experimentModel.bookingStart,
            endTime: experimentModel.bookingEnd,
        },
        status: experimentModel.status,
        devices: experimentModel.devices
            ? experimentModel.devices.map((device) => formatDeviceModel(device))
            : undefined,
        roles: experimentModel.roles
            ? experimentModel.roles.map((role) => formatRoleModel(role))
            : undefined,
        connections: experimentModel.connections
            ? experimentModel.connections.map((connection) => connection.url)
            : undefined,
        serviceConfigurations: experimentModel.serviceConfigurations
            ? experimentModel.serviceConfigurations.map((serviceConfiguration) =>
                  formatServiceConfigurationModel(serviceConfiguration)
              )
            : undefined,
    }
}
