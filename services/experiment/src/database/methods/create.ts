import {
    Device,
    Experiment,
    Participant,
    Role,
    ServiceConfiguration,
} from '../../generated/types'
import {
    DeviceModel,
    ExperimentModel,
    ParticipantModel,
    PeerconnectionModel,
    RoleModel,
    ServiceConfigurationModel,
} from '../model'
import {
    deviceRepository,
    experimentRepository,
    participantRepository,
    peerconnectionRepository,
    roleRepository,
    serviceConfigurationRepository,
} from '../repositories'
import {
    writeDeviceModel,
    writeExperimentModel,
    writeParticipantModel,
    writePeerconnectionModel,
    writeRoleModel,
    writeServiceConfigurationModel,
} from './write'

/**
 * This function attempts to create a device model with the device provided.
 * @param device The device providing the data for the model.
 * @returns The created device model.
 */
export function createDeviceModel(device: Device): DeviceModel {
    const deviceModel = deviceRepository.create()
    writeDeviceModel(deviceModel, device)
    return deviceModel
}

/**
 * This function attempts to create a role model with the role provided.
 * @param role The role providing the data for the model.
 * @returns The created role model.
 */
export function createRoleModel(role: Role): RoleModel {
    const roleModel = roleRepository.create()
    writeRoleModel(roleModel, role)
    return roleModel
}

/**
 * This function attempts to create a peerconnection model with the peerconnection url provided.
 * @param peerconnectionUrl The url of the peerconnection.
 * @returns The created peerconnection model.
 */
export function createPeerconnectionModel(
    peerconnectionUrl: string
): PeerconnectionModel {
    const peerconnectionModel = peerconnectionRepository.create()
    writePeerconnectionModel(peerconnectionModel, peerconnectionUrl)
    return peerconnectionModel
}

/**
 * This function attempts to create a participant model with the participant provided.
 * @param participant The participant providing the data for the model.
 * @returns The created participant model.
 */
export function createParticipantModel(participant: Participant): ParticipantModel {
    const participantModel = participantRepository.create()
    writeParticipantModel(participantModel, participant)
    return participantModel
}

/**
 * This function attempts to create a service configuration model with the service configuration provided.
 * @param serviceConfiguration The service configuration providing the data for the model.
 * @returns The created service configuration model.
 */
export function createServiceConfigurationModel(
    serviceConfiguration: ServiceConfiguration
): ServiceConfigurationModel {
    const serviceConfigurationModel = serviceConfigurationRepository.create()
    writeServiceConfigurationModel(serviceConfigurationModel, serviceConfiguration)
    return serviceConfigurationModel
}

/**
 * This function attempts to create an experiment model with the data provided.
 * The status of the newly created experiment model will always be "created".
 * @param experiment The experiment providing the data for the model.
 * @returns The created experiment model.
 */
export function createExperimentModel(experiment: Experiment): ExperimentModel {
    const experimentModel = experimentRepository.create()
    writeExperimentModel(experimentModel, experiment)
    experimentModel.status = 'created'
    return experimentModel
}
