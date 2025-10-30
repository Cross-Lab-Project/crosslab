import { logger } from '@crosslab/service-common';
import WebSocket from 'ws';

import { repositories } from '../../../../database/dataSource.js';
import { ConcreteDeviceModel } from '../../../../database/model.js';
import {
  AuthenticationMessage,
  isAuthenticationMessage,
  isMessage,
} from '../../../../generated/types.js';
import { deviceIdFromUrl, deviceUrlFromId } from '../../../../methods/urlFromId.js';
import { sendChangedCallback } from '../../../callbacks/index.js';
import { removeDisconnectTimeout } from './disconnect.js';
import { connectedDevices } from './index.js';

export async function authenticationHandling(
  ws: WebSocket,
  data: WebSocket.RawData,
): Promise<ConcreteDeviceModel | void> {
  const message = JSON.parse(data.toString('utf8'));

  if (!(isMessage(message) && isAuthenticationMessage(message, 'request'))) {
    logger.log(
      'error',
      'First received websocket message is not an authentication message',
    );
    return ws.close(1002, 'Received message is not a valid authentication message');
  }

  let deviceId: string | undefined;
  try {
    deviceId = deviceIdFromUrl(message.deviceUrl);
  } catch {
    logger.log('error', 'Received device url is not valid for this device service');
    return ws.close(1002, 'Received device url is not valid for this device service');
  }

  const deviceModel = await repositories.concreteDevice.findOne({
    where: { uuid: deviceId },
  });
  if (!deviceModel) {
    logger.log('error', 'Device could not be found');
    return ws.close(1002, 'Device could not be found');
  }

  if (deviceModel.token !== message.token) {
    logger.log('error', 'Websocket token does not match');
    return ws.close(1002, 'Websocket token does not match');
  }

  deviceModel.services = message.services;
  await repositories.concreteDevice.save(deviceModel);

  connectedDevices.set(deviceModel.uuid, ws);
  removeDisconnectTimeout(deviceModel.uuid);

  ws.send(
    JSON.stringify({
      messageType: 'authenticate',
      authenticated: true,
    } satisfies AuthenticationMessage<'response'>),
  );
  sendChangedCallback(deviceModel);

  logger.log('info', `device '${deviceUrlFromId(deviceModel.uuid)}' connected`);

  return deviceModel;
}
