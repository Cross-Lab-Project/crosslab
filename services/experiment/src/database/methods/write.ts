import {
    Role,
    ServiceConfiguration,
    Experiment,
    Device,
    Participant,
} from '../../generated/types'
import {
    DeviceModel,
    RoleModel,
    PeerconnectionModel,
    ParticipantModel,
    ServiceConfigurationModel,
    ExperimentModel,
} from '../model'
import { MissingPropertyError } from '../../types/errors'
import {
    createDeviceModel,
    createParticipantModel,
    createPeerconnectionModel,
    createRoleModel,
    createServiceConfigurationModel,
} from './create'

const HOUR = 60 * 60 * 1000

/**
 * This function writes the data of a {@link Device} to a {@link DeviceModel}.
 * @param deviceModel The {@link DeviceModel} the data should be written to.
 * @param device The {@link Device} providing the data to be written.
 */
export function writeDeviceModel(deviceModel: DeviceModel, device: Device) {
    if (!device.device)
        throw new MissingPropertyError('Device is missing property "url"', 400)
    if (device.device) deviceModel.url = device.device
    if (device.role) deviceModel.role = device.role
}

/**
 * This function writes the data of a {@link Role} to a {@link RoleModel}.
 * @param roleModel The {@link RoleModel} the data should be written to.
 * @param role The {@link Role} providing the data to be written.
 */
export function writeRoleModel(roleModel: RoleModel, role: Role) {
    if (role.name) roleModel.name = role.name
    if (role.description) roleModel.description = role.description
}

/**
 * This function writes the data of a string to a {@link PeerconnectionModel}.
 * @param peerconnectionModel The {@link PeerconnectionModel} the data should be written to.
 * @param peerconnectionUrl The url of a peerconnection.
 * @throws {MissingPropertyError} Thrown when the peerconnection is missing required properties.
 */
export function writePeerconnectionModel(
    peerconnectionModel: PeerconnectionModel,
    peerconnectionUrl: string
) {
    peerconnectionModel.url = peerconnectionUrl
}

/**
 * This function writes the data of a {@link Participant} to a {@link ParticipantModel}.
 * @param participantModel The {@link ParticipantModel} the data should be written to.
 * @param participant The {@link Participant} providing the data to be written.
 */
export function writeParticipantModel(
    participantModel: ParticipantModel,
    participant: Participant
) {
    if (participant.role) participantModel.role = participant.role
    if (participant.serviceId) participantModel.serviceId = participant.serviceId
    if (participant.config) participantModel.config = JSON.stringify(participant.config)
}

/**
 * This function writes the data of a {@link ServiceConfiguration} to a {@link ServiceConfigurationModel}.
 * @param serviceConfigurationModel The {@link ServiceConfigurationModel} the data should be written to.
 * @param serviceConfiguration The {@link ServiceConfiguration} providing the data to be written.
 */
export function writeServiceConfigurationModel(
    serviceConfigurationModel: ServiceConfigurationModel,
    serviceConfiguration: ServiceConfiguration
) {
    if (serviceConfiguration.serviceType)
        serviceConfigurationModel.serviceType = serviceConfiguration.serviceType
    if (serviceConfiguration.configuration)
        serviceConfigurationModel.configuration = JSON.stringify(
            serviceConfiguration.configuration
        )
    if (serviceConfiguration.participants) {
        serviceConfigurationModel.participants = []
        for (const participant of serviceConfiguration.participants) {
            const participantModel = createParticipantModel(participant)
            serviceConfigurationModel.participants.push(participantModel)
        }
    }
}

/**
 * This function writes the data of a {@link Experiment} to a {@link ExperimentModel}.
 * @param experimentModel The {@link ExperimentModel} the data should be written to.
 * @param experiment The {@link Experiment} providing the data to be written.
 */
export function writeExperimentModel(
    experimentModel: ExperimentModel,
    experiment: Experiment
) {
    experimentModel.status = experiment.status ?? experimentModel.status ?? 'created'
    if (experiment.bookingTime) {
        if (experiment.bookingTime.startTime)
            experimentModel.bookingStart = experiment.bookingTime.startTime
        if (experiment.bookingTime.endTime)
            experimentModel.bookingEnd = experiment.bookingTime.endTime
    } else {
        const start = Date.now()
        const end = start + HOUR
        experimentModel.bookingStart =
            experimentModel.bookingStart ?? new Date(start).toISOString()
        experimentModel.bookingEnd =
            experimentModel.bookingEnd ?? new Date(end).toISOString()
    }
    if (experiment.devices) {
        experimentModel.devices = []
        for (const device of experiment.devices) {
            const deviceModel = createDeviceModel(device)
            experimentModel.devices.push(deviceModel)
        }
    }
    if (experiment.roles) {
        experimentModel.roles = []
        for (const role of experiment.roles) {
            const roleModel = createRoleModel(role)
            experimentModel.roles.push(roleModel)
        }
    }
    if (experiment.connections) {
        experimentModel.connections = []
        for (const peerconnection of experiment.connections) {
            const peerconnectionModel = createPeerconnectionModel(peerconnection)
            experimentModel.connections.push(peerconnectionModel)
        }
    }
    if (experiment.serviceConfigurations) {
        experimentModel.serviceConfigurations = []
        for (const serviceConfiguration of experiment.serviceConfigurations) {
            const serviceConfigurationModel =
                createServiceConfigurationModel(serviceConfiguration)
            experimentModel.serviceConfigurations.push(serviceConfigurationModel)
        }
    }
}
