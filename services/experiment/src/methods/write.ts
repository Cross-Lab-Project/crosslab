import { AppDataSource } from '../data_source'
import {
    Role,
    ServiceConfiguration,
    Experiment,
    Device,
    Participant,
} from '../generated/types'
import {
    DeviceModel,
    RoleModel,
    PeerconnectionModel,
    ParticipantModel,
    ServiceConfigurationModel,
    ExperimentModel,
} from '../model'
import { MissingPropertyError } from '../types/errors'

const HOUR = 60 * 60 * 1000

/**
 * This function writes the data of a {@link Device} to a {@link DeviceModel}.
 * @param deviceModel The {@link DeviceModel} the data should be written to.
 * @param device The {@link Device} providing the data to be written.
 */
async function writeDevice(deviceModel: DeviceModel, device: Device) {
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
function writeRole(roleModel: RoleModel, role: Role) {
    if (role.name) roleModel.name = role.name
    if (role.description) roleModel.description = role.description
}

/**
 * This function writes the data of a string to a {@link PeerconnectionModel}.
 * @param peerconnectionModel The {@link PeerconnectionModel} the data should be written to.
 * @param peerconnectionUrl The string providing the data to be written.
 */
function writePeerconnection(
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
function writeParticipant(participantModel: ParticipantModel, participant: Participant) {
    // { role?: string, serviceId?: string, config?: { serviceId?: string } }
    if (participant.role) participantModel.role = participant.role
    if (participant.serviceId) participantModel.serviceId = participant.serviceId
    if (participant.config) participantModel.config = JSON.stringify(participant.config)
}

/**
 * This function writes the data of a {@link ServiceConfiguration} to a {@link ServiceConfigurationModel}.
 * @param serviceConfigurationModel The {@link ServiceConfigurationModel} the data should be written to.
 * @param serviceConfiguration The {@link ServiceConfiguration} providing the data to be written.
 */
async function writeServiceConfiguration(
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
        const participantRepository = AppDataSource.getRepository(ParticipantModel)
        for (const p of serviceConfiguration.participants) {
            const participant = participantRepository.create()
            writeParticipant(participant, p)
            await participantRepository.save(participant)
            serviceConfigurationModel.participants.push(participant)
        }
    }
}

/**
 * This function writes the data of a {@link Experiment} to a {@link ExperimentModel}.
 * @param experimentModel The {@link ExperimentModel} the data should be written to.
 * @param experiment The {@link Experiment} providing the data to be written.
 */
export async function writeExperiment(
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
        const deviceRepository = AppDataSource.getRepository(DeviceModel)
        for (const d of experiment.devices) {
            const device = deviceRepository.create()
            await writeDevice(device, d)
            experimentModel.devices.push(device)
        }
    }
    if (experiment.roles) {
        experimentModel.roles = []
        const roleRepository = AppDataSource.getRepository(RoleModel)
        for (const r of experiment.roles) {
            const role = roleRepository.create()
            writeRole(role, r)
            experimentModel.roles.push(role)
        }
    }
    if (experiment.connections) {
        experimentModel.connections = []
        const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)
        for (const pc of experiment.connections) {
            const peerconnection = peerconnectionRepository.create()
            writePeerconnection(peerconnection, pc)
            experimentModel.connections.push(peerconnection)
        }
    }
    if (experiment.serviceConfigurations) {
        experimentModel.serviceConfigurations = []
        const serviceConfigurationRepository = AppDataSource.getRepository(
            ServiceConfigurationModel
        )
        for (const sc of experiment.serviceConfigurations) {
            const serviceConfiguration = serviceConfigurationRepository.create()
            await writeServiceConfiguration(serviceConfiguration, sc)
            experimentModel.serviceConfigurations.push(serviceConfiguration)
        }
    }
}
