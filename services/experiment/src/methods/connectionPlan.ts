import { MissingPropertyError } from '@crosslab/service-common';
import { logger } from '@crosslab/service-common';

import {
  DeviceModel,
  ExperimentModel,
  ParticipantModel,
  ServiceConfigurationModel,
} from '../database/model.js';
import { experimentUrlFromId, getUrlOrInstanceUrl } from './url.js';
import { CreatePeerconnectionRequest } from '../clients/device/schemas.js';
import { CreatePeerconnectionRequestDevicesItems } from '../clients/device/schemas.js';

export function buildConnectionPlan(experiment: ExperimentModel) {
  const experimentUrl = experimentUrlFromId(experiment.uuid);
  logger.log('info', 'Building connection plan', { data: { experimentUrl } });
  if (!experiment.serviceConfigurations || experiment.serviceConfigurations.length === 0)
    throw new MissingPropertyError('Experiment must have a configuration to be run', 400);

  if (!experiment.devices || experiment.devices.length === 0)
    throw new MissingPropertyError('Experiment must have a device to be run', 400);

  if (!experiment.serviceConfigurations)
    throw new MissingPropertyError('Experiment must have a configuration to be run', 400);

  const pairwiseServiceConfigurations = toPairwiseServiceConfig(experiment.serviceConfigurations);

  const deviceMappedServiceConfigs = mapRoleConfigToDevices(
    pairwiseServiceConfigurations,
    experiment,
  );

  const sortedDeviceMappedServiceConfigs = deviceMappedServiceConfigs.map(dmsc =>
    sortServiceParticipantsByDeviceId(dmsc),
  );

  const peerconnections: Record<
    string,
    Omit<CreatePeerconnectionRequest,'url'> // TODO: Generation Problem
  > = {};
  for (const serviceConfig of sortedDeviceMappedServiceConfigs) {
    // HOTFIX: for local services: Don't connect local services to each other
    // TODO: create a new connection type 'local' as opposed to 'webrtc' and handle it correctly
    if (serviceConfig.devices[0].url === serviceConfig.devices[1].url) {
      continue;
    }
    const lookupKey = `${serviceConfig.devices[0].url}::${serviceConfig.devices[1].url}`;
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
      };
    }
    const peerconnection = peerconnections[lookupKey];

    updateServiceConfig(
      peerconnection.devices[0],
      serviceConfig,
      serviceConfig.participants[0],
      serviceConfig.participants[1],
    );
    updateServiceConfig(
      peerconnection.devices[1],
      serviceConfig,
      serviceConfig.participants[1],
      serviceConfig.participants[0],
    );
  }

  const peerconnectionsArray = Object.values(peerconnections);

  logger.log('info', 'Built connection plan', {
    data: { connectionPlan: peerconnectionsArray },
  });
  return peerconnectionsArray;
}

function sortServiceParticipantsByDeviceId(
  serviceConfig: ServiceConfigurationModel & { devices: DeviceModel[] },
) {
  const swap = serviceConfig.devices[0].uuid > serviceConfig.devices[1].uuid;
  return {
    ...serviceConfig,
    participants: swap
      ? [serviceConfig.participants![1], serviceConfig.participants![0]]
      : [serviceConfig.participants![0], serviceConfig.participants![1]],
    devices: swap
      ? [serviceConfig.devices[1], serviceConfig.devices[0]]
      : [serviceConfig.devices[0], serviceConfig.devices[1]],
  };
}

function updateServiceConfig(
  device: CreatePeerconnectionRequestDevicesItems,
  serviceConfig: ServiceConfigurationModel,
  participant: ParticipantModel,
  remoteParticipant: ParticipantModel,
) {
  device.config = device.config ?? {};
  device.config.services = device.config.services ?? [];
  device.config?.services?.push({
    ...serviceConfig.configuration,
    ...participant.config,
    serviceId: participant.serviceId,
    serviceType: serviceConfig.serviceType,
    remoteServiceId: remoteParticipant.serviceId,
  });
}

function mapRoleConfigToDevices(
  pairwiseServiceConfigurations: Required<ExperimentModel>['serviceConfigurations'],
  experiment: ExperimentModel,
) {
  if (!experiment.devices || experiment.devices.length === 0) {
    throw new MissingPropertyError('Experiment must have a device to be run', 400);
  }
  const deviceMappedServiceConfigs: (ServiceConfigurationModel & {
    devices: DeviceModel[];
  })[] = [];
  for (const serviceConfig of pairwiseServiceConfigurations) {
    if (!serviceConfig.participants || serviceConfig.participants.length !== 2) {
      throw new MissingPropertyError(
        'pairwiseServiceConfigurations must have exactly two participants',
        400,
      );
    }
    const devicesA = experiment.devices
      .filter(d => d.role === serviceConfig.participants![0].role)
      .map(d => d);
    const devicesB = experiment.devices
      .filter(d => d.role === serviceConfig.participants![1].role)
      .map(d => d);
    for (const deviceA of devicesA) {
      for (const deviceB of devicesB) {
        if (deviceA !== deviceB) {
          deviceMappedServiceConfigs.push({
            ...serviceConfig,
            devices: [deviceA, deviceB],
          });
        } else {
          // TODO: Handle same device
        }
      }
    }
  }
  return deviceMappedServiceConfigs;
}

function toPairwiseServiceConfig(serviceConfigurations: ServiceConfigurationModel[]) {
  const pairwiseServiceConfigurations: Required<ExperimentModel>['serviceConfigurations'] =
    [];

  for (const serviceConfig of serviceConfigurations) {
    const participants = serviceConfig.participants;
    if (participants) {
      for (let i = 0; i < participants.length; i++) {
        for (let j = i + 1; j < participants.length; j++) {
          const participantA = participants[i];
          const participantB = participants[j];
          // TODO: Check for Service Direction
          pairwiseServiceConfigurations.push({
            ...serviceConfig,
            participants: [participantA, participantB],
          });
        }
      }
    }
  }
  logger.log('info', 'Built pairwise service configurations', {
    data: { pairwiseServiceConfigurations },
  });
  return pairwiseServiceConfigurations;
}
