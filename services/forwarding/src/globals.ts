import WebSocket from 'ws';

import { Room } from './generated/types.js';

export const roomMap: Map<string, Room> = new Map();
export const webSocketMap: Map<string, WebSocket> = new Map();
