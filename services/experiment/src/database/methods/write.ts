import {
    Role,
    ServiceConfiguration,
    Experiment,
    Device,
    Participant,
} from '../../generated/types'
import { MissingPropertyError } from '../../types/errors'
import {
    DeviceModel,
    RoleModel,
    PeerconnectionModel,
    ParticipantModel,
    ServiceConfigurationModel,
    ExperimentModel,
} from '../model'
import {
    createDeviceModel,
    createParticipantModel,
    createPeerconnectionModel,
    createRoleModel,
    createServiceConfigurationModel,
} from './create'

const HOUR = 60 * 60 * 1000

/**
 * This function writes the data of a Device to a DeviceModel.
 * @param deviceModel The DeviceModel the data should be written to.
 * @param device The Device providing the data to be written.
 */
export function writeDeviceModel(deviceModel: DeviceModel, device: Device) {
    if (!device.device)
        throw new MissingPropertyError('Device is missing property "url"', 400)
    if (device.device) deviceModel.url = device.device
    if (device.role) deviceModel.role = device.role
}

/**
 * This function writes the data of a Role to a RoleModel.
 * @param roleModel The RoleModel the data should be written to.
 * @param role The Role providing the data to be written.
 */
export function writeRoleModel(roleModel: RoleModel, role: Role) {
    if (role.name) roleModel.name = role.name
    if (role.description) roleModel.description = role.description
}

/**
 * This function writes the data of a string to a PeerconnectionModel.
 * @param peerconnectionModel The PeerconnectionModel the data should be written to.
 * @param peerconnectionUrl The url of a peerconnection.
 */
export function writePeerconnectionModel(
    peerconnectionModel: PeerconnectionModel,
    peerconnectionUrl: string
) {
    peerconnectionModel.url = peerconnectionUrl
}

/**
 * This function writes the data of a Participant to a ParticipantModel.
 * @param participantModel The ParticipantModel the data should be written to.
 * @param participant The Participant providing the data to be written.
 */
export function writeParticipantModel(
    participantModel: ParticipantModel,
    participant: Participant
) {
    if (participant.role) participantModel.role = participant.role
    if (participant.serviceId) participantModel.serviceId = participant.serviceId
    if (participant.config) participantModel.config = participant.config
}

/**
 * This function writes the data of a ServiceConfiguration to a ServiceConfigurationModel.
 * @param serviceConfigurationModel The ServiceConfigurationModel the data should be written to.
 * @param serviceConfiguration The ServiceConfiguration providing the data to be written.
 */
export function writeServiceConfigurationModel(
    serviceConfigurationModel: ServiceConfigurationModel,
    serviceConfiguration: ServiceConfiguration
) {
    if (serviceConfiguration.serviceType)
        serviceConfigurationModel.serviceType = serviceConfiguration.serviceType
    if (serviceConfiguration.configuration)
        serviceConfigurationModel.configuration = serviceConfiguration.configuration
    if (serviceConfiguration.participants) {
        serviceConfigurationModel.participants = []
        for (const participant of serviceConfiguration.participants) {
            const participantModel = createParticipantModel(participant)
            serviceConfigurationModel.participants.push(participantModel)
        }
    }
}

/**
 * This function writes the data of a Experiment to a ExperimentModel.
 * @param experimentModel The ExperimentModel the data should be written to.
 * @param experiment The Experiment providing the data to be written.
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
