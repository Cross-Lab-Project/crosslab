import WebSocket from 'ws';

import { Room } from './generated/types.js';
import { ForwardingQueue } from './methods/forwardingQueue.js';

export const roomMap: Map<string, Room> = new Map();
export const webSocketMap: Map<string, WebSocket> = new Map();
export const forwardingQueueMap: Map<string, ForwardingQueue> = new Map();

export function getLabel(roomId: string, participantId: string) {
  return `${roomId}:${participantId}`;
}

export function removeParticipantData(roomId: string, participantId: string) {
  const label = getLabel(roomId, participantId);
  webSocketMap.get(label)?.close();
  webSocketMap.delete(label);
  forwardingQueueMap.get(label)?.end();
  forwardingQueueMap.delete(label);
}
