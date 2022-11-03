import { AppDataSource } from './data_source'
import {
    DeviceModel,
    ExperimentModel,
    ParticipantModel,
    PeerconnectionModel,
    RoleModel,
    ServiceConfigurationModel,
} from './model'

/**
 * Repository for experiment models.
 */
export const experimentRepository = AppDataSource.getRepository(ExperimentModel)

/**
 * Repository for role models.
 */
export const roleRepository = AppDataSource.getRepository(RoleModel)

/**
 * Repository for participant models.
 */
export const participantRepository = AppDataSource.getRepository(ParticipantModel)

/**
 * Repository for service configuration models.
 */
export const serviceConfigurationRepository = AppDataSource.getRepository(
    ServiceConfigurationModel
)

/**
 * Repository for device models.
 */
export const deviceRepository = AppDataSource.getRepository(DeviceModel)

/**
 * Repository for peerconnection models.
 */
export const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)
