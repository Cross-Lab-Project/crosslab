import { logger } from '@crosslab/service-common';
import WebSocket from 'ws';

export function heartbeatHandling(
  ws: WebSocket,
  participantId: string,
  roomUrl: string,
): NodeJS.Timeout {
  let isAlive = true;
  ws.on('ping', () => {
    logger.log(
      'info',
      `ping received from participant "${participantId}" in room "${roomUrl}"`,
    );
    ws.pong();
  });
  ws.on('pong', () => {
    isAlive = true;
    logger.log(
      'info',
      `hearbeat received from participant "${participantId}" in room "${roomUrl}"`,
    );
  });

  const interval = setInterval(async () => {
    try {
      if (isAlive === false) {
        logger.log(
          'info',
          `Participant "${participantId}" in room "${roomUrl}" did not answer hearbeat check, closing connection`,
        );
        clearInterval(interval);
        return ws.terminate();
      }
      isAlive = false;
      logger.log(
        'info',
        `sending hearbeat to participant "${participantId}" in room "${roomUrl}"`,
      );
      ws.ping();
    } catch (error) {
      logger.log(
        'error',
        `An error occurred during the heartbeat check of participant "${participantId}" in room "${roomUrl}"`,
        { data: { error } },
      );
    }
  }, 30000);

  return interval;
}
