import { logger } from '@crosslab/service-common';
import { randomUUID } from 'crypto';

import { postRoomsSignature } from '../../generated/signatures.js';
import { forwardingQueueMap, roomMap } from '../../globals.js';
import { ForwardingQueue } from '../../methods/forwardingQueue.js';
import { roomUrlFromId } from '../../methods/urlFromId.js';

/**
 * This function implements the functionality for handling POST requests on
 * /rooms endpoint.
 * @param _req The request object.
 * @param body The body of the request.
 */
export const postRooms: postRoomsSignature = async (_req, body) => {
  logger.log('info', 'postRooms called');

  const uuid = randomUUID();
  const room = { ...body, url: roomUrlFromId(uuid) };

  roomMap.set(uuid, room);
  for (const participant of room.participants) {
    forwardingQueueMap.set(
      `${uuid}:${participant.id}`,
      new ForwardingQueue(uuid, participant.id),
    );
  }

  logger.log('info', 'postRooms succeeded');

  return {
    status: 201,
    body: room,
  };
};
