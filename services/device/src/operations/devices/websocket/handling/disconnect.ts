import { logger } from '@crosslab/service-common';

import { repositories } from '../../../../database/dataSource.js';
import { signalingQueueManager } from '../../../../methods/signaling/signalingQueueManager.js';
import {
  deviceUrlFromId,
  peerconnectionUrlFromId,
} from '../../../../methods/urlFromId.js';
import { sendStatusChangedCallback } from '../../../callbacks/index.js';

export const disconnectTimeouts = new Map<string, NodeJS.Timeout>();

export function addDisconnectTimeout(deviceId: string) {
  if (disconnectTimeouts.get(deviceId)) return;

  disconnectTimeouts.set(
    deviceId,
    setTimeout(async () => {
      const peerconnections = (await repositories.peerconnection.find()).filter(
        peerconnection =>
          peerconnection.deviceA.url === deviceUrlFromId(deviceId) ||
          peerconnection.deviceB.url === deviceUrlFromId(deviceId),
      );

      for (const peerconnection of peerconnections) {
        peerconnection.status = 'closed';
        signalingQueueManager.closeSignalingQueues(peerconnection.uuid).catch(error =>
          logger.log(
            'error',
            `Something went wrong while trying to close the signaling queues of peerconnection "${peerconnectionUrlFromId(
              peerconnection.uuid,
            )}"`,
            {
              data: {
                error,
              },
            },
          ),
        );
        await repositories.peerconnection.save(peerconnection);
        sendStatusChangedCallback(peerconnection);
      }

      removeDisconnectTimeout(deviceId);
    }, 120000),
  );
}

export function removeDisconnectTimeout(deviceId: string) {
  const timeout = disconnectTimeouts.get(deviceId);

  clearTimeout(timeout);

  disconnectTimeouts.delete(deviceId);
}
