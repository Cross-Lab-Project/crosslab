import { MissingEntityError, logger } from '@crosslab/service-common';

import { getRoomsByRoomIdSignature } from '../../../generated/signatures.js';
import { roomMap } from '../../../globals.js';

/**
 * This function implements the functionality for handling GET requests on
 * /rooms/{room_id} endpoint.
 * @param _req The request object.
 * @param parameters The parameters of the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const getRoomsByRoomId: getRoomsByRoomIdSignature = async (_req, parameters) => {
  logger.log('info', 'getRoomsByRoomId called');

  const room = roomMap.get(parameters.room_id);

  if (!room) {
    throw new MissingEntityError(
      `Could not find room with id "${parameters.room_id}"`,
      404,
    );
  }

  logger.log('info', 'getRoomsByRoomId succeeded');

  return {
    status: 200,
    body: room,
  };
};
