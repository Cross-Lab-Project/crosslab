import { DeviceServiceTypes } from '@cross-lab-project/api-client'
import {
    ExperimentModel,
    ServiceConfigurationModel,
    DeviceModel,
    ParticipantModel,
} from '../database/model'
import { MissingPropertyError } from '../types/errors'
import { RequestHandler } from './requestHandler'
import { experimentUrlFromId, getUrlOrInstanceUrl } from './url'

export function buildConnectionPlan(
    requestHandler: RequestHandler,
    experiment: ExperimentModel
): DeviceServiceTypes.Peerconnection[] {
    const experimentUrl = requestHandler.executeSync(experimentUrlFromId, experiment.uuid)
    requestHandler.log('info', `Building connection plan for experiment ${experimentUrl}`)
    console.log('building connection plan for experiment', experiment.uuid)
    if (
        !experiment.serviceConfigurations ||
        experiment.serviceConfigurations.length === 0
    )
        requestHandler.throw(
            MissingPropertyError,
            'Experiment must have a configuration to be run',
            400
        )

    if (!experiment.devices || experiment.devices.length === 0)
        requestHandler.throw(
            MissingPropertyError,
            'Experiment must have a device to be run',
            400
        )

    const pairwiseServiceConfigurations: typeof experiment['serviceConfigurations'] =
        toPairwiseServiceConfig(requestHandler, experiment)

    const deviceMappedServiceConfigs = mapRoleConfigToDevices(
        requestHandler,
        pairwiseServiceConfigurations,
        experiment
    )

    const sortedDeviceMappedServiceConfigs = deviceMappedServiceConfigs.map((dmsc) =>
        sortServiceParticipantsByDeviceId(requestHandler, dmsc)
    )

    const peerconnections: Record<
        string,
        Pick<Required<DeviceServiceTypes.Peerconnection>, 'devices'>
    > = {}
    for (const serviceConfig of sortedDeviceMappedServiceConfigs) {
        const lookupKey = `${serviceConfig.devices[0].url}::${serviceConfig.devices[1].url}`
        if (!(lookupKey in peerconnections)) {
            peerconnections[lookupKey] = {
                devices: [
                    {
                        url: requestHandler.executeSync(
                            getUrlOrInstanceUrl,
                            serviceConfig.devices[0]
                        ),
                    },
                    {
                        url: requestHandler.executeSync(
                            getUrlOrInstanceUrl,
                            serviceConfig.devices[1]
                        ),
                    },
                ],
            }
        }
        const peerconnection = peerconnections[lookupKey]

        updateServiceConfig(
            requestHandler,
            peerconnection.devices[0],
            serviceConfig,
            serviceConfig.participants[0],
            serviceConfig.participants[1]
        )
        updateServiceConfig(
            requestHandler,
            peerconnection.devices[1],
            serviceConfig,
            serviceConfig.participants[1],
            serviceConfig.participants[0]
        )
    }

    const peerconnectionsArray = Object.values(peerconnections)

    console.log(JSON.stringify(peerconnectionsArray))

    console.log('connection plan', JSON.stringify(peerconnectionsArray, null, 4))
    return peerconnectionsArray
}

function sortServiceParticipantsByDeviceId(
    _requestHandler: RequestHandler,
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
    _requestHandler: RequestHandler,
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
    requestHandler: RequestHandler,
    pairwiseServiceConfigurations: Required<ExperimentModel>['serviceConfigurations'],
    experiment: ExperimentModel
) {
    if (!experiment.devices || experiment.devices.length === 0) {
        requestHandler.throw(
            MissingPropertyError,
            'Experiment must have a device to be run',
            400
        )
    }
    const deviceMappedServiceConfigs: (ServiceConfigurationModel & {
        devices: DeviceModel[]
    })[] = []
    for (const serviceConfig of pairwiseServiceConfigurations) {
        if (!serviceConfig.participants || serviceConfig.participants.length !== 2) {
            requestHandler.throw(
                MissingPropertyError,
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

function toPairwiseServiceConfig(
    requestHandler: RequestHandler,
    experiment: ExperimentModel
) {
    if (!experiment.serviceConfigurations) {
        requestHandler.throw(
            MissingPropertyError,
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
