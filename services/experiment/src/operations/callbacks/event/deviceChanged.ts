import { logger } from '@crosslab/service-common';

import { DeviceChangedEventCallback } from '../../../clients/device/types.js';
import { clients } from '../../../clients/index.js';
import { repositories } from '../../../database/dataSource.js';
import { finishExperiment } from '../../../methods/experimentStatus/finish.js';
import { callbackEventEmitter } from './index.js';

/**
 * This function handles an incoming "device-changed" event callback.
 * @param callback The incoming "device-changed" callback to be handled.
 * @returns The status code for the response to the incoming callback.
 */
export async function handleDeviceChangedEventCallback(
  callback: DeviceChangedEventCallback,
): Promise<200 | 410> {
  logger.log('info', 'Device changed!', { meta: { deviceUrl: callback.device.url } });

  callbackEventEmitter.emit('device-changed', callback.device);

  if (!callback.device.connected) {
    const dbInstance = await repositories.instance.findOne({
      where: { url: callback.device.url },
    });

    const dbDevice = await repositories.device.findOneOrFail({
      where: dbInstance ?[
        { instance: dbInstance },
      ]:[
        { url: callback.device.url },
      ],
      relations: { experiment: true },
    });

    const experimentModel = await repositories.experiment.findOneOrFail({
      where: { uuid: dbDevice.experiment.uuid },
      relations: {
        connections: true,
        devices: {
          instance: true,
        },
      },
    });

    await finishExperiment(experimentModel, clients);
  }
  return 200;
}
