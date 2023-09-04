import WebSocket from 'ws';

export { authenticationHandling } from './authentication';
export { closeHandling } from './close';
export { heartbeatHandling } from './heartbeat';
export { messageHandling } from './message';

export const connectedDevices = new Map<string, WebSocket>();
