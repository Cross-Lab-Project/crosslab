import { config } from '../config.js';

export function roomUrlFromId(roomId: string): string {
  return (config.BASE_URL + '/rooms/' + roomId).replace('//rooms', '/rooms');
}

export function roomIdFromUrl(url: string): string {
  const regex = /\/rooms\/([\dA-Fa-f-]+)/;
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  throw new Error('Invalid room url');
}
