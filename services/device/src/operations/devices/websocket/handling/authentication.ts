import { logger } from '@crosslab/service-common';
import WebSocket from 'ws';

import { repositories } from '../../../../database/dataSource.js';
import { ConcreteDeviceModel } from '../../../../database/model.js';
import {
  AuthenticationMessage,
  isAuthenticationMessage,
  isMessage,
} from '../../../../generated/types.js';
import { deviceUrlFromId } from '../../../../methods/urlFromId.js';
import { sendChangedCallback } from '../../../callbacks/index.js';
import { removeDisconnectTimeout } from './disconnect.js';
import { connectedDevices } from './index.js';

export async function authenticationHandling(
  ws: WebSocket,
  data: WebSocket.RawData,
): Promise<ConcreteDeviceModel | void> {
  const message = JSON.parse(data.toString('utf8'));

  if (!(isMessage(message) && isAuthenticationMessage(message))) {
    logger.log(
      'error',
      'First received websocket message is not an authentication message',
    );
    return ws.close(1002, 'Received message is not an authentication message');
  }

  if (!message.token) {
    logger.log('error', 'Authentication message does not contain a websocket token');
    return ws.close(1002, 'Authentication message does not contain a websocket token');
  }

  const deviceModel = await repositories.concreteDevice.findOne({
    where: { token: message.token },
  });
  if (!deviceModel) {
    logger.log('error', 'No device found with matching websocket token');
    return ws.close(1002, 'No device found with matching websocket token');
  }

  deviceModel.connected = true;
  connectedDevices.set(deviceModel.uuid, ws);
  await repositories.concreteDevice.save(deviceModel);
  removeDisconnectTimeout(deviceModel.uuid);

  ws.send(
    JSON.stringify(<AuthenticationMessage>{
      messageType: 'authenticate',
      authenticated: true,
    }),
  );
  sendChangedCallback(deviceModel);

  logger.log('info', `device '${deviceUrlFromId(deviceModel.uuid)}' connected`);

  return deviceModel;
}
