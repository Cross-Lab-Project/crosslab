import { Peerconnection } from '@cross-lab-project/api-client/dist/generated/device/types'
import { config } from '../config'
import { AppDataSource } from '../data_source'
import { MalformedBodyError } from '../generated/types'
import { apiClient } from '../globals'
import {
    DeviceModel,
    ExperimentModel,
    PeerconnectionModel,
    ServiceConfigurationModel,
} from '../model'
import { InvalidStateError, MissingPropertyError } from '../types/errors'
import { experimentUrlFromId } from './utils'

export async function bookExperiment(experiment: ExperimentModel) {
    console.log('booking experiment', experiment.uuid)
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)

    // create instances for virtual devices
    if (!experiment.devices || experiment.devices.length === 0)
        throw new MissingPropertyError(
            `Experiment ${experimentUrlFromId(experiment.uuid)} has no devices`
        )
    for (const device of experiment.devices) {
        if (device.isVirtual) {
            const instance = await apiClient.createDeviceInstance(device.url)
            if (!instance.url)
                throw new MalformedBodyError(`Returned device instance has no url`, 502)
            device.url = instance.url
        }
    }

    // TODO: book experiment (booking client missing)

    experiment.status = 'booked'
    await experimentRepository.save(experiment)
}

function sortServiceParticipantsByDeviceId(
    serviceConfig: ServiceConfigurationModel & { devices: DeviceModel[] }
) {
    const swap = serviceConfig.devices[0] > serviceConfig.devices[1]
    return {
        ...serviceConfig,
        participants: swap
            ? [serviceConfig.participants![1], serviceConfig.participants![0]]
            : [serviceConfig.participants![0], serviceConfig.participants![1]],
        devices: swap
            ? [serviceConfig.devices[1], serviceConfig.devices[0]]
            : [serviceConfig.devices[0], serviceConfig.devices[1]],
    }
}
function buildConnectionPlan(experiment: ExperimentModel): Peerconnection[] {
    console.log('building connection plan for experiment', experiment.uuid)
    if (
        !experiment.serviceConfigurations ||
        experiment.serviceConfigurations.length === 0
    )
        throw new MissingPropertyError(
            'Experiment must have a configuration to be run',
            400
        )

    if (!experiment.devices || experiment.devices.length === 0)
        throw new MissingPropertyError('Experiment must have a device to be run', 400)

    const pairwiseServiceConfigurations: typeof experiment['serviceConfigurations'] =
        toPairwiseServiceConfig(experiment)

    const deviceMappedServiceConfigs: any[] = mapRoleConfigToDevices(
        pairwiseServiceConfigurations,
        experiment
    )

    const sortedDeviceMappedServiceConfigs = deviceMappedServiceConfigs.map(
        sortServiceParticipantsByDeviceId
    )

    const peerconnections: Record<string, Pick<Required<Peerconnection>, 'devices'>> = {}
    for (const serviceConfig of sortedDeviceMappedServiceConfigs) {
        const lookupKey = `${serviceConfig.devices[0]}::${serviceConfig.devices[1]}`
        if (!(lookupKey in peerconnections)) {
            peerconnections[lookupKey] = {
                devices: [
                    { url: serviceConfig.devices[0].url },
                    { url: serviceConfig.devices[1].url },
                ],
            }
        }
        const peerconnection = peerconnections[lookupKey]

        updateServiceConfig(
            peerconnection.devices[0],
            serviceConfig,
            serviceConfig.participants[0],
            serviceConfig.participants[1]
        )
        updateServiceConfig(
            peerconnection.devices[1],
            serviceConfig,
            serviceConfig.participants[1],
            serviceConfig.participants[0]
        )
    }

    const peerconnectionsArray = Object.values(peerconnections)

    console.log(JSON.stringify(peerconnectionsArray))

    console.log('connection plan', JSON.stringify(peerconnections, null, 4))
    return peerconnectionsArray
}

function updateServiceConfig(
    device: any,
    serviceConfig: any,
    participant: any,
    remoteParticipant: any
) {
    device.config = device.config ?? {}
    device.config.services = device.config.services ?? []
    device.config?.services?.push({
        ...JSON.parse(serviceConfig.configuration),
        ...JSON.parse(participant.config),
        serviceId: participant.serviceId,
        serviceType: serviceConfig.serviceType,
        remoteServiceId: remoteParticipant.serviceId,
    })
}

function mapRoleConfigToDevices(
    pairwiseServiceConfigurations: Required<ExperimentModel>['serviceConfigurations'],
    experiment: ExperimentModel
) {
    if (!experiment.devices || experiment.devices.length === 0) {
        throw new MissingPropertyError('Experiment must have a device to be run', 400)
    }
    const deviceMappedServiceConfigs: (ServiceConfigurationModel & {
        devices: DeviceModel[]
    })[] = []
    for (const serviceConfig of pairwiseServiceConfigurations) {
        if (!serviceConfig.participants || serviceConfig.participants.length !== 2) {
            throw new MissingPropertyError(
                'pairwiseServiceConfigurations must have exactly two participants',
                400
            )
        }
        const devicesA = experiment.devices
            .filter((d) => d.role === serviceConfig.participants![0].role)
            .map((d) => d)
        const devicesB = experiment.devices
            .filter((d) => d.role === serviceConfig.participants![1].role)
            .map((d) => d)
        for (const deviceA of devicesA) {
            for (const deviceB of devicesB) {
                if (deviceA !== deviceB) {
                    deviceMappedServiceConfigs.push({
                        ...serviceConfig,
                        devices: [deviceA, deviceB],
                    })
                } else {
                    // TODO: Handle same device
                }
            }
        }
    }
    return deviceMappedServiceConfigs
}

function toPairwiseServiceConfig(experiment: ExperimentModel) {
    if (!experiment.serviceConfigurations) {
        throw new MissingPropertyError(
            'Experiment must have a configuration to be run',
            400
        )
    }
    const pairwiseServiceConfigurations: Required<ExperimentModel>['serviceConfigurations'] =
        []

    for (const serviceConfig of experiment.serviceConfigurations) {
        const participants = serviceConfig.participants
        if (participants) {
            for (let i = 0; i < participants.length; i++) {
                for (let j = i + 1; j < participants.length; j++) {
                    const participantA = participants[i]
                    const participantB = participants[j]
                    // TODO: Check for Service Direction
                    pairwiseServiceConfigurations.push({
                        ...serviceConfig,
                        participants: [participantA, participantB],
                    })
                }
            }
        }
    }
    console.log('connection plan', JSON.stringify(pairwiseServiceConfigurations, null, 4))
    return pairwiseServiceConfigurations
}

async function runExperiment(experiment: ExperimentModel) {
    console.log('running experiment', experiment.uuid)
    // make sure experiment is already booked
    if (experiment.status !== 'booked') {
        // experiment is not booked
        throw new InvalidStateError(
            `Experiment status is "${experiment.status}", expected "booked"`,
            400
        )
    }

    // establish peerconnections between the devices
    const peerconnectionPlans = buildConnectionPlan(experiment)
    for (const peerconnectionPlan of peerconnectionPlans) {
        const peerconnection = await apiClient.createPeerconnection(peerconnectionPlan, {
            closedUrl:
                config.BASE_URL +
                (config.BASE_URL.endsWith('/') ? '' : '/') +
                'experiments/callbacks',
        })
        if (!experiment.connections) experiment.connections = []
        if (!peerconnection.url)
            throw new MissingPropertyError(
                'Created peerconnection does not have a url',
                502
            )
        // create, save and push new peerconnection
        const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)
        const peerconnectionModel = peerconnectionRepository.create()
        peerconnectionModel.experiment = experiment
        peerconnectionModel.url = peerconnection.url
        experiment.connections.push(peerconnectionModel)
    }

    // set experiment status to running and save experiment
    experiment.status = 'running'
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)
    await experimentRepository.save(experiment)
}

export async function startExperiment(experiment: ExperimentModel) {
    console.log(
        'starting experiment',
        experiment.uuid,
        'with current status:',
        experiment.status
    )
    switch (experiment.status) {
        case 'created': {
            await bookExperiment(experiment)
            await runExperiment(experiment)
            break
        }
        case 'booked': {
            await runExperiment(experiment)
            break
        }
        case 'running': {
            // nothing to do since experiment is already running
            break
        }
        case 'finished': {
            // fail because experiment is already finished
            throw new InvalidStateError('Cannot start finished experiment', 400)
        }
    }
}

export async function finishExperiment(experiment: ExperimentModel) {
    console.log('finishing experiment', experiment.uuid)
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)

    switch (experiment.status) {
        case 'created': {
            // nothing to do here as status is set to finished below
            break
        }
        case 'booked': {
            // TODO: delete booking (booking client missing)
            break
        }
        case 'running': {
            // delete all peerconnections
            if (experiment.connections) {
                for (const peerconnection of experiment.connections) {
                    await apiClient.deletePeerconnection(peerconnection.url)
                }
            }
            // TODO: unlock all devices (booking client missing)
            // TODO: delete booking (booking client missing)
            break
        }
        case 'finished': {
            // nothing to do since experiment is already finished
            break
        }
    }

    experiment.status = 'finished'
    await experimentRepository.save(experiment)
}
