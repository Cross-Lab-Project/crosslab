import { logger } from '@crosslab/service-common';
import { RawData, WebSocket } from 'ws';

import { isConnectionMessage } from '../generated/types.js';
import { roomMap, webSocketMap } from '../globals.js';
import { roomIdFromUrl } from './urlFromId.js';

export function handleConnection(webSocket: WebSocket) {
  logger.log('info', 'A new connection has been established');
  webSocket.once('message', connectionMessage => {
    const parsedConnectionMessage = JSON.parse(connectionMessage.toString());

    if (!isConnectionMessage(parsedConnectionMessage)) {
      return webSocket.close();
    }

    const roomId = roomIdFromUrl(parsedConnectionMessage.roomUrl);
    const participantId = parsedConnectionMessage.participantId;

    const room = roomMap.get(roomId);
    if (!room) {
      return webSocket.close();
    }

    const participant = room?.participants.find(p => p.id === participantId);
    if (!participant) {
      return webSocket.close();
    }

    webSocket.on('message', message => forwardMessage(roomId, participantId, message));

    webSocketMap.set(`${roomId}:${participantId}`, webSocket);
  });
}

function forwardMessage(roomId: string, participantId: string, message: RawData) {
  const room = roomMap.get(roomId);

  if (!room) {
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
