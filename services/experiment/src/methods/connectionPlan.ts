import {
  InvalidValueError,
  MissingEntityError,
  MissingPropertyError,
} from '@crosslab/service-common';
import { logger } from '@crosslab/service-common';
import { randomUUID } from 'crypto';

import { ConcreteDevice, Peerconnection } from '../clients/device/types.js';
import { clients } from '../clients/index.js';
import { config } from '../config.js';
import {
  DeviceModel,
  ExperimentModel,
  ParticipantModel,
  ServiceConfigurationModel,
} from '../database/model.js';
import { experimentUrlFromId, getUrlOrInstanceUrl } from './url.js';

export async function buildConnectionPlan(
  experiment: ExperimentModel,
  resolvedDevices: ConcreteDevice<'response'>[],
) {
  const experimentUrl = experimentUrlFromId(experiment.uuid);
  logger.log('info', 'Building connection plan', { data: { experimentUrl } });

  if (!experiment.devices || experiment.devices.length === 0)
    throw new MissingPropertyError('Experiment must have a device to be run', 400);

  if (!experiment.serviceConfigurations)
    throw new MissingPropertyError('Experiment must have a configuration to be run', 400);

  const pairwiseServiceConfigurations = toPairwiseServiceConfig(
    experiment.serviceConfigurations,
  );

  const deviceMappedServiceConfigs = mapRoleConfigToDevices(
    pairwiseServiceConfigurations,
    experiment,
  );

  const sortedDeviceMappedServiceConfigs = deviceMappedServiceConfigs.map(dmsc =>
    sortServiceParticipantsByDeviceId(dmsc),
  );

  const peerconnections: Record<string, Peerconnection<'request'>> = {};
  for (const serviceConfig of sortedDeviceMappedServiceConfigs) {
    // HOTFIX: for local services: Don't connect local services to each other
    // TODO: create a new connection type 'local' as opposed to 'webrtc' and handle it correctly
    if (
      getUrlOrInstanceUrl(serviceConfig.devices[0]) ===
      getUrlOrInstanceUrl(serviceConfig.devices[1])
    ) {
      continue;
    }
    const lookupKey = `${getUrlOrInstanceUrl(
      serviceConfig.devices[0],
    )}::${getUrlOrInstanceUrl(serviceConfig.devices[1])}`;
    if (!(lookupKey in peerconnections)) {
      const deviceA = getResolvedDevice(
        resolvedDevices,
        getUrlOrInstanceUrl(serviceConfig.devices[0]),
      );
      const deviceB = getResolvedDevice(
        resolvedDevices,
        getUrlOrInstanceUrl(serviceConfig.devices[1]),
      );

      const connectionType = intersection(
        getSupportedConnectionTypes(
          deviceA,
          serviceConfig.serviceType,
          serviceConfig.participants[0].serviceId,
        ),
        getSupportedConnectionTypes(
          deviceB,
          serviceConfig.serviceType,
          serviceConfig.participants[1].serviceId,
        ),
      )[0];

      if (!connectionType)
        throw new InvalidValueError(
          // prettier-ignore
          `Service "${
            serviceConfig.participants[0].serviceId
          }:${
            serviceConfig.participants[1].serviceId
          }" of type "${
            serviceConfig.serviceType
          }" between device "${
            deviceA.url
          }" and device "${
            deviceB.url
          }" cannot be connected since they have no common supported connection type!`,
          400,
        );

      peerconnections[lookupKey] = await createPeerconnection(
        connectionType,
        serviceConfig,
      );
    }
    const peerconnection = peerconnections[lookupKey];

    updateServiceConfig(
      peerconnection.devices[0],
      getResolvedDevice(resolvedDevices, peerconnection.devices[1].url),
      serviceConfig,
      serviceConfig.participants[0],
      serviceConfig.participants[1],
    );
    updateServiceConfig(
      peerconnection.devices[1],
      getResolvedDevice(resolvedDevices, peerconnection.devices[0].url),
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
  device: Peerconnection<'request'>['devices'][number],
  remoteDevice: ConcreteDevice<'response'>,
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
    remoteServiceDescription: remoteDevice.services?.find(
      service =>
        service.serviceId === remoteParticipant.serviceId &&
        service.serviceType === remoteParticipant.serviceConfiguration.serviceType,
    ),
  });
}

type PairwiseServiceConfiguration = ServiceConfigurationModel & {
  participants: [ParticipantModel, ParticipantModel];
};

type PairwiseServiceConfigurationWithDevices = PairwiseServiceConfiguration & {
  devices: [DeviceModel, DeviceModel];
};

function mapRoleConfigToDevices(
  pairwiseServiceConfigurations: PairwiseServiceConfiguration[],
  experiment: ExperimentModel,
): PairwiseServiceConfigurationWithDevices[] {
  if (!experiment.devices || experiment.devices.length === 0) {
    throw new MissingPropertyError('Experiment must have a device to be run', 400);
  }
  const deviceMappedServiceConfigs: PairwiseServiceConfigurationWithDevices[] = [];
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

function toPairwiseServiceConfig(
  serviceConfigurations: ServiceConfigurationModel[],
): PairwiseServiceConfiguration[] {
  const pairwiseServiceConfigurations: PairwiseServiceConfiguration[] = [];

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

async function createPeerconnection(
  type: 'webrtc' | 'websocket',
  serviceConfig: ServiceConfigurationModel & { devices: DeviceModel[] },
): Promise<Peerconnection<'request'>> {
  switch (type) {
    case 'webrtc':
      return createPeerconnectionWebrtc(serviceConfig);
    case 'websocket':
      return await createPeerconnectionWebsocket(serviceConfig);
  }
}

function createPeerconnectionWebrtc(
  serviceConfig: ServiceConfigurationModel & { devices: DeviceModel[] },
): Peerconnection<'request'> {
  return {
    type: 'webrtc',
    devices: [
      {
        url: getUrlOrInstanceUrl(serviceConfig.devices[0]),
      },
      {
        url: getUrlOrInstanceUrl(serviceConfig.devices[1]),
      },
    ],
    configuration: {
      iceServers: [
        { urls: config.STUN_SERVER_URL },
        {
          urls: config.TURN_SERVER_URL,
          username: config.TURN_SERVER_USERNAME,
          credential: config.TURN_SERVER_CREDENTIAL,
        },
      ],
    },
  };
}

async function createPeerconnectionWebsocket(
  serviceConfig: ServiceConfigurationModel & { devices: DeviceModel[] },
): Promise<Peerconnection<'request'>> {
  const room = await clients.forwarding.createRoom({
    participants: [{ id: randomUUID() }, { id: randomUUID() }],
  });

  return {
    type: 'websocket',
    devices: [
      {
        url: getUrlOrInstanceUrl(serviceConfig.devices[0]),
      },
      {
        url: getUrlOrInstanceUrl(serviceConfig.devices[1]),
      },
    ],
    configuration: {
      webSocketUrls: [0, 1].map(index =>
        `${room.url}?${new URLSearchParams({
          id: room?.participants[index].id,
        }).toString()}`
          .replace('http://', 'ws://')
          .replace('https://', 'wss://'),
      ),
    },
  };
}

function intersection<T>(array1: T[], array2: T[]) {
  return array1.filter(value => array2.includes(value));
}

function getResolvedDevice(resolvedDevices: ConcreteDevice<'response'>[], url: string) {
  const resolvedDevice = resolvedDevices.find(device => device.url === url);

  if (!resolvedDevice) {
    throw new MissingEntityError(
      `Could not find a resolved device for device "${url}"`,
      404,
    );
  }

  return resolvedDevice;
}

function getSupportedConnectionTypes(
  device: ConcreteDevice<'response'>,
  serviceType: string,
  serviceId: string,
): ('webrtc' | 'websocket')[] {
  const supportedConnectionTypes = device.services?.find(
    service => service.serviceType === serviceType && service.serviceId === serviceId,
  )?.supportedConnectionTypes;

  if (!supportedConnectionTypes) return ['webrtc'];

  return supportedConnectionTypes.filter(
    supportedConnectionType =>
      supportedConnectionType === 'webrtc' || supportedConnectionType === 'websocket',
  ) as ('webrtc' | 'websocket')[];
}
