import { UnrelatedPeerconnectionError, logger } from '@crosslab/service-common';
import WebSocket from 'ws';

import { repositories } from '../../../../database/dataSource.js';
import { ConcreteDeviceModel } from '../../../../database/model.js';
import {
  ConnectionStateChangedMessage,
  LoggingMessage,
  Message,
  SignalingMessage,
  isConnectionStateChangedMessage,
  isLoggingMessage,
  isMessage,
  isSignalingMessage,
} from '../../../../generated/types.js';
import {
  sendClosedCallback,
  sendStatusChangedCallback,
} from '../../../../methods/callbacks.js';
import { mutexManager } from '../../../../methods/mutexManager.js';
import { getPeerconnection } from '../../../../methods/peerconnection.js';
import { signalingQueueManager } from '../../../../methods/signaling/signalingQueueManager.js';
import {
  deviceUrlFromId,
  peerconnectionIdFromUrl,
  peerconnectionUrlFromId,
} from '../../../../methods/urlFromId.js';

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
 * This function handles a message received from a device.
 * @param deviceModel The device that had sent the message.
 * @param message The message to be handled.
 */
async function handleDeviceMessage(deviceModel: ConcreteDeviceModel, message: Message) {
  if (isSignalingMessage(message)) {
    await handleSignalingMessage(deviceModel, message);
  } else if (isConnectionStateChangedMessage(message)) {
    await handleConnectionStateChangedMessage(deviceModel, message);
  } else if (isLoggingMessage(message)){
    await handleLoggingMessage(deviceModel, message)
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
  const peerconnection = await getPeerconnection({ url: message.connectionUrl });

  const deviceA = peerconnection.deviceA;
  const deviceB = peerconnection.deviceB;

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
  const peerconnectionUUID = peerconnectionIdFromUrl(message.connectionUrl);
  const release = await mutexManager.acquire(peerconnectionUUID);

  try {
    const peerconnectionModel = await repositories.peerconnection.findOneOrFail({
      where: { uuid: peerconnectionUUID },
    });

    if (
      peerconnectionModel.deviceA.url !== deviceUrlFromId(deviceModel.uuid) &&
      peerconnectionModel.deviceB.url !== deviceUrlFromId(deviceModel.uuid)
    ) {
      throw new UnrelatedPeerconnectionError(
        `Device '${deviceUrlFromId(
          deviceModel.uuid,
        )}' is not taking part in peerconnection '${peerconnectionUrlFromId(
          peerconnectionUUID,
        )}'`,
        400,
      );
    }

    if (peerconnectionModel.deviceA.url === deviceUrlFromId(deviceModel.uuid))
      peerconnectionModel.deviceA.status = message.status;

    if (peerconnectionModel.deviceB.url === deviceUrlFromId(deviceModel.uuid))
      peerconnectionModel.deviceB.status = message.status;

    const oldStatus = peerconnectionModel.status;

    if (
      peerconnectionModel.status === 'closed' ||
      peerconnectionModel.deviceA.status === 'closed' ||
      peerconnectionModel.deviceB.status === 'closed'
    ) {
      peerconnectionModel.status = 'closed';
    } else if (
      peerconnectionModel.deviceA.status === 'failed' ||
      peerconnectionModel.deviceB.status === 'failed'
    ) {
      peerconnectionModel.status = 'failed';
    } else if (
      peerconnectionModel.deviceA.status === 'disconnected' ||
      peerconnectionModel.deviceB.status === 'disconnected'
    ) {
      peerconnectionModel.status = 'disconnected';
    } else if (
      peerconnectionModel.deviceA.status === 'connecting' ||
      peerconnectionModel.deviceB.status === 'connecting'
    ) {
      peerconnectionModel.status = 'connecting';
    } else if (
      peerconnectionModel.deviceA.status === 'connected' &&
      peerconnectionModel.deviceB.status === 'connected'
    ) {
      peerconnectionModel.status = 'connected';
    } else {
      peerconnectionModel.status = 'new';
    }

    if (peerconnectionModel.status !== oldStatus) {
      sendStatusChangedCallback(peerconnectionModel);
      if (peerconnectionModel.status === 'closed')
        sendClosedCallback(peerconnectionModel);
    }

    logger.log('info', 'peerconnection devices status info', {
      data: {
        peerconnection: peerconnectionModel.uuid,
        statusDeviceA: peerconnectionModel.deviceA.status,
        statusDeviceB: peerconnectionModel.deviceB.status,
      },
    });

    await repositories.peerconnection.save(peerconnectionModel);
  } finally {
    release();
  }
}

/**
 * This function handles a logging message received from a device
 * @param deviceModel The device that sent the logging message
 * @param message The logging message to be handled
 */
async function handleLoggingMessage(deviceModel: ConcreteDeviceModel, message: LoggingMessage) {
  let level = 'info';
  if ('level' in message.content){
    level = message.content.level as string;
  }
  logger.log(level, {...message.content, labels: {...message.labels ?? {}, job: 'remote_device'}, device: deviceModel.uuid, deviceName: deviceModel.name});
}