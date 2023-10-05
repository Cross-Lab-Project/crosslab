import { logger } from '@crosslab/service-common';
import WebSocket from 'ws';

import { repositories } from '../../../../database/dataSource.js';
import { ConcreteDeviceModel } from '../../../../database/model.js';
import { deviceUrlFromId } from '../../../../methods/urlFromId.js';
import { sendChangedCallback } from '../../../callbacks/index.js';
import { addDisconnectTimeout } from './disconnect.js';
import { connectedDevices } from './index.js';

export function heartbeatHandling(
  ws: WebSocket,
  deviceModel: ConcreteDeviceModel,
): NodeJS.Timeout {
  let isAlive = true;
  ws.on('ping', () => {
    logger.log(
      'info',
      `ping received from device '${deviceUrlFromId(deviceModel.uuid)}'`,
    );
    ws.pong();
  });
  ws.on('pong', () => {
    isAlive = true;
    logger.log(
      'info',
      `hearbeat received from device '${deviceUrlFromId(deviceModel.uuid)}'`,
    );
  });

  const interval = setInterval(async () => {
    try {
      if (isAlive === false) {
        logger.log(
          'info',
          `Device '${deviceUrlFromId(
            deviceModel.uuid,
          )}' did not answer hearbeat check, closing connection`,
        );
        deviceModel.connected = false;
        await repositories.concreteDevice.save(deviceModel);
        sendChangedCallback(deviceModel);
        connectedDevices.delete(deviceModel.uuid);
        clearInterval(interval);
        addDisconnectTimeout(deviceModel.uuid);
        return ws.terminate();
      }
      isAlive = false;
      logger.log(
        'info',
        `sending hearbeat to device '${deviceUrlFromId(deviceModel.uuid)}'`,
      );
      ws.ping();
    } catch (error) {
      logger.log(
        'error',
        `An error occurred during the heartbeat check of device '${deviceUrlFromId(
          deviceModel.uuid,
        )}'`,
        { data: { error } },
      );
    }
  }, 30000);

  return interval;
}
