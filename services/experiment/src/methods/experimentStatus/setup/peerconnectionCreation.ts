import { logger } from '@crosslab/service-common';

import { Clients, clients as globalClients } from '../../../clients/index.js';
import { repositories } from '../../../database/dataSource.js';
import { ExperimentModel } from '../../../database/model.js';
import { InvalidStateError, MalformedExperimentError } from '../../../types/errors.js';
import { validateExperimentStatus } from '../../../types/typeguards.js';
import { createPeerconnections } from '../../peerconnection.js';
import { experimentUrlFromId } from '../../url.js';

async function checkDevices(
  experimentModel: ExperimentModel,
  clients: Clients,
  connectedMap: Map<string, boolean>,
) {
  await Promise.all(
    experimentModel.devices.map(async device => {
      const deviceUrl = device.instance?.url ?? device.resolvedDevice ?? device.url;
      const resolvedDevice = await clients.device.getDevice(deviceUrl);
      connectedMap.set(deviceUrl, !!resolvedDevice.connected); // TODO: better solution
    }),
  );

  let allConnected = true;

  for (const value of connectedMap.values()) {
    allConnected &&= value;
  }

  return allConnected;
}

export async function createPeerconnectionsExperiment(
  experimentModel: ExperimentModel,
  clients: Clients,
) {
  const connectedMap = new Map<string, boolean>();

  const connected = await checkDevices(experimentModel, clients, connectedMap);

  if (!connected)
    await new Promise<void>((resolve, reject) => {
      let i = 0;
      const connectionInterval = setInterval(async () => {
        const allConnected = await checkDevices(experimentModel, clients, connectedMap);

        if (allConnected) {
          resolve();
          clearInterval(connectionInterval);
        } else if (i === 6) {
          reject('Devices did not connect in time');
          clearInterval(connectionInterval);
        } else {
          i++;
        }
      }, 5000);
    });

  for (const device of experimentModel.devices) {
    await globalClients.device.sendSignalingMessage(
      device.instance?.url ?? device.resolvedDevice ?? device.url,
      {
        messageType: 'configuration',
        configuration: {
          experimentUrl: experimentUrlFromId(experimentModel.uuid),
          ...experimentModel.roles.find(role => role.name === device.role)?.configuration,
        },
      },
    );
  }

  const experimentUrl = experimentUrlFromId(experimentModel.uuid);
  logger.log('info', 'Attempting to create peerconnections for experiment', {
    data: { experimentUrl },
  });

  if (experimentModel.status !== 'booking-updated')
    throw new InvalidStateError(
      `Expected experiment to have status 'booking-updated', instead has status '${experimentModel.status}'`,
    );

  if (!validateExperimentStatus(experimentModel, 'booking-updated'))
    throw new MalformedExperimentError(
      `Experiment is in status 'booking-updated', but does not satisfy the requirements for this status`,
      500,
    );

  await createPeerconnections(experimentModel, clients);

  experimentModel.status = 'peerconnections-created';

  await repositories.experiment.save(experimentModel);

  logger.log('info', 'Successfully created peerconnections for experiment', {
    data: { experimentUrl },
  });
}
