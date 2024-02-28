import { logger } from '@crosslab/service-common';

import {
  InstantiableBrowserDevice,
  InstantiableCloudDevice,
} from '../../../clients/device/types.js';
import { Clients } from '../../../clients/index.js';
import { repositories } from '../../../database/dataSource.js';
import { ExperimentModel } from '../../../database/model.js';
import { callbackHandler } from '../../../operations/callbacks/callbackHandler.js';
import { callbackUrl } from '../../../operations/callbacks/index.js';
import { InvalidStateError, MalformedExperimentError } from '../../../types/errors.js';
import { validateExperimentStatus } from '../../../types/typeguards.js';
import { InstantiatedDevice } from '../../../types/types.js';
import { experimentUrlFromId } from '../../url.js';

export type Instantiable = InstantiableBrowserDevice | InstantiableCloudDevice;

export async function instantiateDevicesExperiment(
  experimentModel: ExperimentModel,
  instantiables: Instantiable[],
  clients: Clients,
): Promise<InstantiatedDevice[]> {
  const experimentUrl = experimentUrlFromId(experimentModel.uuid);
  logger.log('info', 'Attempting to instantiate devices for experiment', {
    data: { experimentUrl },
  });

  if (experimentModel.status !== 'booking-locked')
    throw new InvalidStateError(
      `Expected experiment to have status 'booking-locked', instead has status '${experimentModel.status}'`,
      500,
    );

  if (!validateExperimentStatus(experimentModel, 'booking-locked'))
    throw new MalformedExperimentError(
      `Experiment is in status 'booking-locked', but does not satisfy the requirements for this status`,
      500,
    );

  // TODO: error handling
  const instances: InstantiatedDevice[] = [];
  for (const instantiable of instantiables) {
    const instantiableDevice = experimentModel.devices.find(
      device => device.url === instantiable.url,
    );

    if (!instantiableDevice || instantiableDevice.instance) continue;

    const instanceData = await clients.device.instantiateDevice(instantiable.url, {
      changedUrl: callbackUrl,
    });

    callbackHandler.addListener(
      'device',
      instanceData.instance.url,
      experimentModel.uuid,
    );

    instances.push({ ...instanceData.instance, token: instanceData.deviceToken });

    const instance = await repositories.instance.create({
      url: instanceData.instance.url,
      token: instanceData.deviceToken,
      codeUrl:
        instantiable.type === 'edge instantiable' ? instantiable.codeUrl : undefined,
    });
    await repositories.instance.save(instance);

    instantiableDevice.instance = instance;
  }

  experimentModel.status = 'devices-instantiated';

  await repositories.experiment.save(experimentModel);

  logger.log('info', 'Successfully instantiated devices for experiment', {
    data: { experimentUrl },
  });

  return instances;
}
