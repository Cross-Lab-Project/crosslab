import {
    // ExperimentOverview,
	Experiment,
    ServiceConfiguration,
    Role
} from "../generated/types"
import {
    getExperimentsSignature,
	postExperimentsSignature,
	getExperimentsByExperimentIdSignature,
	deleteExperimentsByExperimentIdSignature,
	patchExperimentsByExperimentIdSignature
} from "../generated/signatures/experiments"
import { AppDataSource } from "../data_source"
import { 
    DeviceModel, 
    ExperimentModel, 
    ParticipantModel, 
    PeerconnectionModel, 
    RoleModel, 
    ServiceConfigurationModel 
} from "../model"
import { config } from "../config"

const ExperimentBaseUrl = config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + 'experiments/'

function formatDevice(device: DeviceModel) {
    return {
        device: device.url,
        role: device.role
    }
}

function formatRole(role: RoleModel) {
    return {
        name: role.name,
        description: role.description
    }
}

function formatParticipant(participant: ParticipantModel) {
    return {
        role: participant.role,
        serviceId: participant.serviceId,
        config: participant.config ? JSON.parse(participant.config) : undefined
    }
}

function formatServiceConfiguration(serviceConfiguration: ServiceConfigurationModel): ServiceConfiguration {
    return {
        serviceType: serviceConfiguration.serviceType,
        configuration: serviceConfiguration.configuration ? JSON.parse(serviceConfiguration.configuration) : undefined,
        participants: serviceConfiguration.participants ? serviceConfiguration.participants.map(formatParticipant) : undefined
    }
}

function formatExperiment(experiment: ExperimentModel): Experiment {
    return {
        url: ExperimentBaseUrl + experiment.uuid,
        bookingTime: {
            startTime: experiment.bookingStart,
            endTime: experiment.bookingEnd
        },
        status: experiment.status,
        devices: experiment.devices ? experiment.devices.map(formatDevice) : undefined,
        roles: experiment.roles ? experiment.roles.map(formatRole) : undefined,
        connections: experiment.connections ? experiment.connections.map(c => c.url) : undefined,
        serviceConfigurations: experiment.serviceConfigurations ? experiment.serviceConfigurations.map(formatServiceConfiguration) : undefined
    }
}

function writeDevice(device: DeviceModel, object: { device?: string, role?: string }) {
    if (object.device) device.url = object.device
    if (object.role) device.role = object.role
}

function writeRole(role: RoleModel, object: Role) {
    if (object.name) role.name = object.name
    if (object.description) role.description = object.description
}

function writePeerconnection(peerconnection: PeerconnectionModel, object: string) {
    peerconnection.url = object
}

function writeParticipant(participant: ParticipantModel, object: { role?: string, serviceId?: string, config?: { serviceId?: string } }) {
    if (object.role) participant.role = object.role
    if (object.serviceId) participant.serviceId = object.serviceId
    if (object.config) participant.config = JSON.stringify(object.config)
}

async function writeServiceConfiguration(serviceConfiguration: ServiceConfigurationModel, object: ServiceConfiguration) {
    if (object.serviceType) serviceConfiguration.serviceType = object.serviceType
    if (object.configuration) serviceConfiguration.configuration = JSON.stringify(object.configuration)
    if (object.participants) {
        serviceConfiguration.participants = []
        const participantRepository = AppDataSource.getRepository(ParticipantModel)
        for (const p of object.participants) {
            const participant = participantRepository.create()
            writeParticipant(participant, p)
            await participantRepository.save(participant)
            serviceConfiguration.participants.push(participant)
        }
    }
}

async function writeExperiment(experiment: ExperimentModel, object: Experiment) {
    if (object.status) experiment.status = object.status
    if (object.bookingTime) {
        if (object.bookingTime.startTime) experiment.bookingStart = object.bookingTime.startTime
        if (object.bookingTime.endTime) experiment.bookingEnd = object.bookingTime.endTime
    }
    if (object.devices) {
        experiment.devices = []
        const deviceRepository = AppDataSource.getRepository(DeviceModel)
        for (const d of object.devices) {
            const device = deviceRepository.create()
            writeDevice(device, d)
            await deviceRepository.save(device)
            experiment.devices.push(device)
        }
    }
    if (object.roles) {
        experiment.roles = []
        const roleRepository = AppDataSource.getRepository(RoleModel)
        for (const r of object.roles) {
            const role = roleRepository.create()
            writeRole(role, r)
            await roleRepository.save(role)
            experiment.roles.push(role)
        }
    }
    if (object.connections) {
        experiment.connections = []
        const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)
        for (const pc of object.connections) {
            const peerconnection = peerconnectionRepository.create()
            writePeerconnection(peerconnection, pc)
            await peerconnectionRepository.save(peerconnection)
            experiment.connections.push(peerconnection)
        }
    }
    if (object.serviceConfigurations) {
        experiment.serviceConfigurations = []
        const serviceConfigurationRepository = AppDataSource.getRepository(ServiceConfigurationModel)
        for (const sc of object.serviceConfigurations) {
            const serviceConfiguration = serviceConfigurationRepository.create()
            await writeServiceConfiguration(serviceConfiguration, sc)
            await serviceConfigurationRepository.save(serviceConfiguration)
            experiment.serviceConfigurations.push(serviceConfiguration)
        }
    }
}

export const getExperiments: getExperimentsSignature = async (_user) => {
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)
    const experiments = await experimentRepository.find()

    return {
        status: 200,
        body: experiments.map(formatExperiment)
    }
}

export const postExperiments: postExperimentsSignature = async (body, _user) => {
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)
    const experiment = experimentRepository.create()
    await writeExperiment(experiment, body)
    await experimentRepository.save(experiment)

    return {
        status: 201,
        body: formatExperiment(experiment)
    }
}

export const getExperimentsByExperimentId: getExperimentsByExperimentIdSignature = async (parameters, _user) => {
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)
    const experiment = await experimentRepository.findOne({
        where: {
            uuid: parameters.path.experiment_id
        },
        relations: {
            devices: true,
            connections: true,
            roles: true,
            serviceConfigurations: true
        }
    })

    if (!experiment) {
        return {
            status: 404
        }
    }

    return {
        status: 200,
        body: formatExperiment(experiment)
    }
}

export const deleteExperimentsByExperimentId: deleteExperimentsByExperimentIdSignature = async (parameters, _user) => {
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)
    const result = await experimentRepository.softDelete({ uuid: parameters.path.experiment_id })

    if (!result.affected) {
        return {
            status: 404
        }
    }
    
    if (result.affected > 1) {
        // TBD
    }

    return {
        status: 204
    }
}

export const patchExperimentsByExperimentId: patchExperimentsByExperimentIdSignature = async (parameters, body, _user) => {
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)
    const experiment = await experimentRepository.findOneBy({ uuid: parameters.path.experiment_id })

    if (!experiment) {
        return {
            status: 404
        }
    }

    await writeExperiment(experiment, body)
    await experimentRepository.save(experiment)

    return {
        status: 200,
        body: formatExperiment(experiment)
    }
}
