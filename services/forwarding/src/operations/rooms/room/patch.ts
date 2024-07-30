import { MissingEntityError, logger } from '@crosslab/service-common';

import { patchRoomsByRoomIdSignature } from '../../../generated/signatures.js';
import { roomMap, webSocketMap } from '../../../globals.js';
import { roomUrlFromId } from '../../../methods/urlFromId.js';

/**
 * This function implements the functionality for handling PATCH requests on
 * /rooms/{room_id} endpoint.
 * @param _req The request object.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const patchRoomsByRoomId: patchRoomsByRoomIdSignature = async (
  _req,
  parameters,
  body,
) => {
  logger.log('info', 'patchRoomsByRoomId called');

  const room = roomMap.get(parameters.room_id);

  if (!room) {
    throw new MissingEntityError(
      `Could not find room with id "${parameters.room_id}"`,
      404,
    );
  }

  for (const participant of room.participants) {
    if (!body.participants.find(p => p.id === participant.id)) {
      logger.log(
        'info',
        `removing participant "${participant.id}" from room "${room.url}"!`,
      );
      webSocketMap.get(`${parameters.room_id}:${participant.id}`)?.close();
      webSocketMap.delete(`${parameters.room_id}:${participant.id}`);
    }
  }

  const updatedRoom = { ...body, url: roomUrlFromId(parameters.room_id) };
  roomMap.set(parameters.room_id, updatedRoom);

  logger.log('info', 'patchRoomsByRoomId succeeded');

  return {
    status: 200,
    body: updatedRoom,
  };
};
