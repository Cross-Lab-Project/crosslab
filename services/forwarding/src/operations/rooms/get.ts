import { logger } from '@crosslab/service-common';

import { getRoomsSignature } from '../../generated/signatures.js';
import { roomMap } from '../../globals.js';

/**
 * This function implements the functionality for handling GET requests on
 * /rooms endpoint.
 * @param _req The request object.
 */
export const getRooms: getRoomsSignature = async _req => {
  logger.log('info', 'getRooms called');

  const rooms = Array.from(roomMap.values());

  logger.log('info', 'getRooms succeeded');

  return {
    status: 200,
    body: rooms,
  };
};
