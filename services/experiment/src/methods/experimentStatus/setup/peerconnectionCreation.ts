import { logger } from '@crosslab/service-common';
import { MutexInterface } from 'async-mutex';

import { Clients } from '../../../clients/index.js';
import { ExperimentModel } from '../../../database/model.js';
import { InvalidStateError, MalformedExperimentError } from '../../../types/errors.js';
import { validateExperimentStatus } from '../../../types/typeguards.js';
import { saveExperiment } from '../../experimentChangedEvent.js';
import { createPeerconnections } from '../../peerconnection.js';
import { experimentUrlFromId } from '../../url.js';

async function checkDevices(
  experimentModel: ExperimentModel,
  clients: Clients,
  connectedMap: Map<string, boolean>,
) {
  await Promise.all(
    experimentModel.devices.map(async device => {
      const deviceUrl = device.instance ? device.instance.url : device.url;
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
  release: MutexInterface.Releaser,
) {
  try {
    const connectedMap = new Map<string, boolean>();

    const connected = await checkDevices(experimentModel, clients, connectedMap);

    if (!connected)
      await new Promise<void>((res, rej) => {
        let i = 0;
        const connectionInterval = setInterval(async () => {
          const allConnected = await checkDevices(experimentModel, clients, connectedMap);

          if (allConnected) {
            res();
            clearInterval(connectionInterval);
          } else if (i === 6) {
            rej('Devices did not connect in time');
            clearInterval(connectionInterval);
          } else {
            i++;
          }
        }, 5000);
      });

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

    experimentModel.status =
      experimentModel.connections.length > 0 ? 'peerconnections-created' : 'running';

    await saveExperiment(experimentModel);

    logger.log('info', 'Successfully created peerconnections for experiment', {
      data: { experimentUrl },
    });
  } finally {
    release();
  }
}
