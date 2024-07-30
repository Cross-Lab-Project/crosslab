import { InvalidValueError, MissingEntityError, logger } from '@crosslab/service-common';
import * as expressWs from 'express-ws';
import WebSocket from 'ws';

import { roomMap, webSocketMap } from '../../../globals.js';
import { roomUrlFromId } from '../../../methods/urlFromId.js';

export function webSocketHandling(app: expressWs.Application) {
  app.ws('/rooms/:roomId', (webSocket, request) => {
    logger.log('info', 'A new connection has been established!');

    const roomId = request.params['roomId'];
    const participantId = request.query['id'];

    if (!(typeof participantId === 'string')) {
      webSocket.close();
      throw new InvalidValueError(
        `Type of query parameter "id" is "${typeof participantId}" instead of "string"!`,
        400,
      );
    }

    const room = roomMap.get(roomId);
    if (!room) {
      webSocket.close();
      throw new MissingEntityError(`Could not find room with id "${roomId}"!`, 404);
    }

    const participant = room?.participants.find(p => p.id === participantId);
    if (!participant) {
      webSocket.close();
      throw new MissingEntityError(
        `Could not find participant with id "${participantId}" in room "${roomUrlFromId(roomId)}"!`,
        404,
      );
    }

    webSocketMap.set(`${roomId}:${participantId}`, webSocket);

    webSocket.on('message', message => forwardMessage(message, roomId, participantId));

    webSocket.on('close', () => {
      logger.log(
        'info',
        `websocket connection closed for participant "${participant.id}" from room "${room.url}"`,
      );
    });

    logger.log('info', 'The newly established connection was handled successfully!');
  });
}

function forwardMessage(
  message: WebSocket.RawData,
  roomId: string,
  participantId: string,
) {
  const room = roomMap.get(roomId);

  if (!room) {
    logger.log(
      'error',
      `room "${roomUrlFromId(roomId)}" does not exist anymore, closing websocket for participant "${participantId}"!`,
    );
    webSocketMap.get(`${roomId}:${participantId}`)?.close();
    webSocketMap.delete(`${roomId}:${participantId}`);
    return;
  }

  for (const participant of room.participants) {
    if (participant.id === participantId) continue;

    const webSocket = webSocketMap.get(`${roomId}:${participant.id}`);
    webSocket?.send(message);
  }
}
