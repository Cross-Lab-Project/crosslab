import { logger } from '@crosslab/service-common';
import { randomUUID } from 'crypto';

import { postRoomsSignature } from '../../generated/signatures.js';
import { roomMap } from '../../globals.js';
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

  logger.log('info', 'postRooms succeeded');

  return {
    status: 201,
    body: room,
  };
};
