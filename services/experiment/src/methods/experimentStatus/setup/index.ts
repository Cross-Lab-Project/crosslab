import { logger } from '@crosslab/service-common';

import { Clients } from '../../../clients/index.js';
import { repositories } from '../../../database/dataSource.js';
import { ExperimentModel } from '../../../database/model.js';
import { InvalidStateError, MalformedExperimentError } from '../../../types/errors.js';
import { validateExperimentStatus } from '../../../types/typeguards.js';
import { ResolvedDevice } from '../../../types/types.js';
import { mutexManager } from '../../mutexManager.js';
import { sendStatusUpdateMessages } from '../../statusUpdateMessage.js';
import { experimentUrlFromId } from '../../url.js';
import { finishExperiment } from '../finish.js';
import { lockBookingExperiment } from './bookingLocking.js';
import { updateBookingExperiment } from './bookingUpdate.js';
import { Instantiable, instantiateDevicesExperiment } from './deviceInstantiation.js';
import { createPeerconnectionsExperiment } from './peerconnectionCreation.js';

export async function setupExperiment(
  experimentModel: ExperimentModel,
  resolvedDevices: ResolvedDevice[],
  clients: Clients,
) {
  const experimentUrl = experimentUrlFromId(experimentModel.uuid);
  logger.log('info', 'Setting up experiment', { data: { experimentUrl } });

  if (experimentModel.status !== 'booked')
    throw new InvalidStateError(
      `Expected experiment to have status 'booked', instead has status '${experimentModel.status}'`,
      500,
    );

  if (!validateExperimentStatus(experimentModel, 'booked'))
    throw new MalformedExperimentError(
      `Experiment is in status 'booked', but does not satisfy the requirements for this status`,
      500,
    );

  const uninstantiatedDevices: Instantiable[] = [];

  for (const resolvedDevice of resolvedDevices) {
    if (
      (resolvedDevice.type === 'cloud instantiable' ||
        resolvedDevice.type === 'edge instantiable') &&
      (!resolvedDevice.instanceUrl || !resolvedDevice.instanceToken)
    ) {
      uninstantiatedDevices.push(resolvedDevice);
    }
  }

  await lockBookingExperiment(experimentModel, resolvedDevices);

  if (uninstantiatedDevices) {
    const instances = await instantiateDevicesExperiment(
      experimentModel,
      uninstantiatedDevices,
      clients,
    );
    await updateBookingExperiment(
      experimentModel,
      instances.map(instance => instance.url),
    );
  } else {
    experimentModel.status = 'booking-updated';
    await repositories.experiment.save(experimentModel);
  }

  const release = await mutexManager.acquire(
    `create-peerconnections:${experimentModel.uuid}`,
  );

  createPeerconnectionsExperiment(experimentModel, clients)
    .catch(async error => {
      logger.log(
        'error',
        'Something went wrong while trying to create the peerconnections',
        { data: { error } },
      );
      sendStatusUpdateMessages(
        experimentModel,
        `Finishing the experiment because peerconnection could not be established successfully!`,
      );
      try {
        await finishExperiment(experimentModel, clients);
      } catch (finishError) {
        logger.log('error', 'Could not finish the experiment!', {
          data: { error: finishError },
        });
      }
    })
    .finally(() => release());

  logger.log('info', 'Successfully set up experiment', { data: { experimentUrl } });
}
