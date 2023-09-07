import WebSocket from 'ws';

export { authenticationHandling } from './authentication.js';
export { closeHandling } from './close.js';
export { heartbeatHandling } from './heartbeat.js';
export { messageHandling } from './message.js';

export const connectedDevices = new Map<string, WebSocket>();
