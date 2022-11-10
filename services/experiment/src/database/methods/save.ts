import { RequestHandler } from '../../util/requestHandler'
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

/**
 * This function attempts to save a device model in its correct repository.
 * @param deviceModel The device model to be saved.
 */
export async function saveDeviceModel(
    requestHandler: RequestHandler,
    deviceModel: DeviceModel
) {
    requestHandler.log('debug', `Attempting to save the device model ${deviceModel}`)
    await deviceRepository.save(deviceModel)
}

/**
 * This function attempts to save a role model in its correct repository.
 * @param roleModel The role model to be saved.
 */
export async function saveRoleModel(
    requestHandler: RequestHandler,
    roleModel: RoleModel
) {
    requestHandler.log('debug', `Attempting to save the role model ${roleModel}`)
    await roleRepository.save(roleModel)
}

/**
 * This function attempts to save a peerconnection model in its correct repository.
 * @param peerconnectionModel The peerconnection model to be saved.
 */
export async function savePeerconnectionModel(
    requestHandler: RequestHandler,
    peerconnectionModel: PeerconnectionModel
) {
    requestHandler.log('debug', `Attempting to save the peerconnection model ${peerconnectionModel}`)
    await peerconnectionRepository.save(peerconnectionModel)
}

/**
 * This function attempts to save a participant model in its correct repository.
 * @param participantModel The participant model to be saved.
 */
export async function saveParticipantModel(
    requestHandler: RequestHandler,
    participantModel: ParticipantModel
) {
    requestHandler.log('debug', `Attempting to save the participant model ${participantModel}`)
    await participantRepository.save(participantModel)
}

/**
 * This function attempts to save a service configuration model in its correct repository.
 * @param serviceConfigurationModel The service configuration model to be saved.
 */
export async function saveServiceConfigurationModel(
    requestHandler: RequestHandler,
    serviceConfigurationModel: ServiceConfigurationModel
) {
    requestHandler.log('debug', `Attempting to save the service configuration model ${serviceConfigurationModel}`)
    await serviceConfigurationRepository.save(serviceConfigurationModel)
}

/**
 * This function attempts to save an experiment model in its correct repository.
 * @param experimentModel The experiment model to be saved.
 */
export async function saveExperimentModel(
    requestHandler: RequestHandler,
    experimentModel: ExperimentModel
) {
    requestHandler.log('debug', `Attempting to save the experiment model ${experimentModel}`)
    await experimentRepository.save(experimentModel)
}
