import { logger } from '@crosslab/service-common';

import {
  authenticationHandling,
  closeHandling,
  heartbeatHandling,
  messageHandling,
} from './handling/index.js';

// TODO: restructure to make it more readable
/**
 * This function adds the /devices/ws endpoint, including its functionality, to an express application.
 * @param app The express application to add the /devices/ws endpoint to.
 */
export function websocketHandling(app: Express.Application) {
  app.ws('/devices/websocket', ws => {
    ws.once('message', async data => {
      try {
        const deviceModel = await authenticationHandling(ws, data);

        if (!deviceModel) return;

        const interval = heartbeatHandling(ws, deviceModel);
        ws.on(
          'close',
          async (code, reason) =>
            await closeHandling(deviceModel, interval, code, reason),
        );
        ws.on(
          'message',
          async rawData => await messageHandling(ws, deviceModel, rawData),
        );
      } catch (error) {
        logger.log(
          'error',
          `Something went wrong during authentication or setup of a websocket connection`,
          { data: { error } },
        );
        return ws.close(1002, 'Something went wrong during authentication or setup');
      }
    });
  });
}
