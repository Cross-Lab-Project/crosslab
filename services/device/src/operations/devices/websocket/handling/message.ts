import { UnrelatedPeerconnectionError, logger } from '@crosslab/service-common';
import WebSocket from 'ws';

import { ConcreteDeviceModel } from '../../../../database/model.js';
import {
  ConnectionStateChangedMessage,
  Message,
  SignalingMessage,
  isConnectionStateChangedMessage,
  isMessage,
  isSignalingMessage,
} from '../../../../generated/types.js';
import { apiClient } from '../../../../globals.js';
import { signalingQueueManager } from '../../../../methods/signaling/signalingQueueManager.js';
import { deviceUrlFromId } from '../../../../methods/urlFromId.js';

export async function messageHandling(
  ws: WebSocket,
  deviceModel: ConcreteDeviceModel,
  rawData: WebSocket.RawData,
) {
  // message handler: handle incoming messages from devices
  try {
    const msg = JSON.parse(rawData.toString('utf-8'));
    if (!isMessage(msg)) {
      logger.log(
        'error',
        `Received something that is not a message from device '${deviceUrlFromId(
          deviceModel.uuid,
        )}', disconnecting`,
      );
      ws.close(1002, 'Malformed Message');
      return;
    }
    await handleDeviceMessage(deviceModel, msg);
  } catch (error) {
    logger.log(
      'error',
      `An error occurred while handling an incoming message for device '${deviceUrlFromId(
        deviceModel.uuid,
      )}'`,
      { data: { error } },
    );
  }
}

/**
 * This function handles a message for a device.
 * @param deviceModel The device for which to handle the message.
 * @param message The message to be handled.
 */
async function handleDeviceMessage(deviceModel: ConcreteDeviceModel, message: Message) {
  if (isSignalingMessage(message)) {
    await handleSignalingMessage(deviceModel, message);
  } else if (isConnectionStateChangedMessage(message)) {
    await handleConnectionStateChangedMessage(deviceModel, message);
  }
}

/**
 * This function handles a signaling message for a device.
 * @param deviceModel The device for which to handle the signaling message.
 * @param message The signaling message to be handled.
 */
async function handleSignalingMessage(
  deviceModel: ConcreteDeviceModel,
  message: SignalingMessage,
) {
  const peerconnection = await apiClient.getPeerconnection(message.connectionUrl);

  const deviceA = peerconnection.devices[0];
  const deviceB = peerconnection.devices[1];

  let peerDeviceUrl: string | undefined = undefined;
  if (deviceA.url === deviceUrlFromId(deviceModel.uuid)) peerDeviceUrl = deviceB.url;
  if (deviceB.url === deviceUrlFromId(deviceModel.uuid)) peerDeviceUrl = deviceA.url;
  if (!peerDeviceUrl) {
    throw new UnrelatedPeerconnectionError(
      'Device is not taking part in peerconnection.',
      400,
    );
  }

  signalingQueueManager.addSignalingMessage(
    message.connectionUrl,
    peerDeviceUrl,
    message,
  );
}

/**
 * This function handles a connection-state-changed message for a device.
 * @param deviceModel The device for which the connection state changed
 * @param message The connection-state-changed message.
 */
async function handleConnectionStateChangedMessage(
  deviceModel: ConcreteDeviceModel,
  message: ConnectionStateChangedMessage,
) {
  await apiClient.patchPeerconnectionDeviceStatus(
    message.connectionUrl,
    { status: message.status },
    deviceUrlFromId(deviceModel.uuid),
  );
}
