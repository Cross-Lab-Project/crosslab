import { MissingEntityError, logger } from '@crosslab/service-common';

import { deleteRoomsByRoomIdSignature } from '../../../generated/signatures.js';
import { removeParticipantData, roomMap } from '../../../globals.js';

/**
 * This function implements the functionality for handling DELETE requests on
 * /rooms/{room_id} endpoint.
 * @param _req The request object.
 * @param parameters The parameters of the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const deleteRoomsByRoomId: deleteRoomsByRoomIdSignature = async (
  _req,
  parameters,
) => {
  logger.log('info', 'deleteRoomsByRoomId called');

  const room = roomMap.get(parameters.room_id);

  if (!room) {
    throw new MissingEntityError(
      `Could not find room with id "${parameters.room_id}"`,
      404,
    );
  }

  for (const participant of room.participants) {
    removeParticipantData(parameters.room_id, participant.id);
  }

  logger.log('info', 'deleteRoomsByRoomId succeeded');

  return {
    status: 204,
  };
};
