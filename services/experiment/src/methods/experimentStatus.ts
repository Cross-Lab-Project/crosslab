import { Peerconnection } from '@cross-lab-project/api-client/dist/generated/device/types'
import { config } from '../config'
import { AppDataSource } from '../data_source'
import { MalformedBodyError } from '../generated/types'
import { apiClient } from '../globals'
import { ExperimentModel, PeerconnectionModel } from '../model'
import {
    InvalidStateError,
    MissingPropertyError,
    ServiceConfigurationError,
} from '../types/errors'
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
    const peerconnections: (Peerconnection & {
        devices?: [{ role?: string }, { role?: string }]
    })[] = []
    for (let i = 0; i < experiment.devices.length; i++) {
        for (let j = i + 1; j < experiment.devices.length; j++) {
            peerconnections.push({
                devices: [
                    {
                        ...experiment.devices[i],
                    },
                    {
                        ...experiment.devices[j],
                    },
                ],
            })
        }
    }
    for (const serviceConfiguration of experiment.serviceConfigurations) {
        if (!serviceConfiguration.participants)
            throw new MissingPropertyError(
                'Service configuration must have participants',
                400
            )
        if (!serviceConfiguration.configuration) serviceConfiguration.configuration = '{}'
        for (const participant of serviceConfiguration.participants) {
            if (!participant.config) participant.config = '{}'
            for (const peerconnection of peerconnections) {
                if (!peerconnection.devices)
                    throw new MissingPropertyError('Peerconnection has no devices', 400)
                for (let i = 0; i < 2; i++) {
                    if (!peerconnection.devices[i].role)
                        throw new MissingPropertyError('Device has no role', 400)
                    if (!peerconnection.devices[i].config)
                        peerconnection.devices[i].config = { services: [] }
                    if (peerconnection.devices[i].role === participant.role) {
                        const peerdevice =
                            i === 0
                                ? peerconnection.devices[1]
                                : peerconnection.devices[0]
                        const peerparticipant = serviceConfiguration.participants.find(
                            (p) => p.role === peerdevice.role
                        )
                        if (!peerparticipant)
                            throw new ServiceConfigurationError(
                                'Peer device is not participating in service',
                                400
                            )
                        if (!peerparticipant)
                            throw new MissingPropertyError(
                                'ServiceId is missing in participant',
                                400
                            )
                        peerconnection.devices[i].config?.services?.push({
                            ...JSON.parse(serviceConfiguration.configuration),
                            ...JSON.parse(participant.config),
                            serviceId: participant.serviceId,
                            serviceType: serviceConfiguration.serviceType,
                            remoteServiceId: peerparticipant.serviceId,
                        })
                    }
                }
            }
        }
    }

    console.log('connection plan', JSON.stringify(peerconnections, null, 4))
    return peerconnections
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
        const peerconnection = await apiClient.createPeerconnection(
            apiClient.url,
            peerconnectionPlan,
            config.BASE_URL +
                (config.BASE_URL.endsWith('/') ? '' : '/') +
                'experiments/callbacks'
        )
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
