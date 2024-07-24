import { handleConnection } from '../methods/connectionHandling.js';

/**
 * This function adds the / endpoint, including its functionality, to an express application.
 * @param app The express application to add the /devices/ws endpoint to.
 */
export function websocketHandling(app: Express.Application) {
  app.ws('/', webSocket => handleConnection(webSocket));
}
