import {
    ExperimentModel,
    ServiceConfigurationModel,
    DeviceModel,
    ParticipantModel,
} from '../database/model'
import { logger } from './logger'
import { experimentUrlFromId, getUrlOrInstanceUrl } from './url'
import { DeviceServiceTypes } from '@cross-lab-project/api-client'
import { MissingPropertyError } from '@crosslab/service-common'

export function buildConnectionPlan(
    experiment: ExperimentModel
): DeviceServiceTypes.Peerconnection<'request'>[] {
    const experimentUrl = experimentUrlFromId(experiment.uuid)
    logger.log('info', `Building connection plan for experiment ${experimentUrl}`)
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

    const pairwiseServiceConfigurations: (typeof experiment)['serviceConfigurations'] =
        toPairwiseServiceConfig(experiment)

    const deviceMappedServiceConfigs = mapRoleConfigToDevices(
        pairwiseServiceConfigurations,
        experiment
    )

    const sortedDeviceMappedServiceConfigs = deviceMappedServiceConfigs.map((dmsc) =>
        sortServiceParticipantsByDeviceId(dmsc)
    )

    const peerconnections: Record<
        string,
        DeviceServiceTypes.Peerconnection<'request'>
    > = {}
    for (const serviceConfig of sortedDeviceMappedServiceConfigs) {
        // HOTFIX: for local services: Don't connect local services to each other
        // TODO: create a new connection type 'local' as opposed to 'webrtc' and handle it correctly
        if (serviceConfig.devices[0].url === serviceConfig.devices[1].url) {
            continue
        }
        const lookupKey = `${serviceConfig.devices[0].url}::${serviceConfig.devices[1].url}`
        if (!(lookupKey in peerconnections)) {
            peerconnections[lookupKey] = {
                type: 'webrtc',
                devices: [
                    {
                        url: getUrlOrInstanceUrl(serviceConfig.devices[0]),
                    },
                    {
                        url: getUrlOrInstanceUrl(serviceConfig.devices[1]),
                    },
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

    logger.log('info', `connection plan: ${JSON.stringify(peerconnectionsArray)}`)
    return peerconnectionsArray
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

function updateServiceConfig(
    device: DeviceServiceTypes.ConfiguredDeviceReference,
    serviceConfig: ServiceConfigurationModel,
    participant: ParticipantModel,
    remoteParticipant: ParticipantModel
) {
    device.config = device.config ?? {}
    device.config.services = device.config.services ?? []
    device.config?.services?.push({
        ...serviceConfig.configuration,
        ...participant.config,
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
    logger.log(
        'info',
        `pairwise service config: ${JSON.stringify(pairwiseServiceConfigurations)}`
    )
    return pairwiseServiceConfigurations
}
