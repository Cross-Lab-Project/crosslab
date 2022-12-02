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
    _requestHandler: RequestHandler,
    deviceModel: DeviceModel
) {
    await deviceRepository.save(deviceModel)
}

/**
 * This function attempts to save a role model in its correct repository.
 * @param roleModel The role model to be saved.
 */
export async function saveRoleModel(
    _requestHandler: RequestHandler,
    roleModel: RoleModel
) {
    await roleRepository.save(roleModel)
}

/**
 * This function attempts to save a peerconnection model in its correct repository.
 * @param peerconnectionModel The peerconnection model to be saved.
 */
export async function savePeerconnectionModel(
    _requestHandler: RequestHandler,
    peerconnectionModel: PeerconnectionModel
) {
    await peerconnectionRepository.save(peerconnectionModel)
}

/**
 * This function attempts to save a participant model in its correct repository.
 * @param participantModel The participant model to be saved.
 */
export async function saveParticipantModel(
    _requestHandler: RequestHandler,
    participantModel: ParticipantModel
) {
    await participantRepository.save(participantModel)
}

/**
 * This function attempts to save a service configuration model in its correct repository.
 * @param serviceConfigurationModel The service configuration model to be saved.
 */
export async function saveServiceConfigurationModel(
    _requestHandler: RequestHandler,
    serviceConfigurationModel: ServiceConfigurationModel
) {
    await serviceConfigurationRepository.save(serviceConfigurationModel)
}

/**
 * This function attempts to save an experiment model in its correct repository.
 * @param experimentModel The experiment model to be saved.
 */
export async function saveExperimentModel(
    _requestHandler: RequestHandler,
    experimentModel: ExperimentModel
) {
    await experimentRepository.save(experimentModel)
}
