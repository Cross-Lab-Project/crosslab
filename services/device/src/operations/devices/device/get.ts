import { logger } from '@crosslab/service-common';

import { repositories } from '../../../database/dataSource.js';
import { getDevicesByDeviceIdSignature } from '../../../generated/signatures.js';
import { deviceUrlFromId } from '../../../methods/urlFromId.js';

/**
 * This function implements the functionality for handling GET requests on
 * /devices/{device_id} endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const getDevicesByDeviceId: getDevicesByDeviceIdSignature = async (
  req,
  parameters,
) => {
  logger.log('info', 'getDevicesByDeviceId called');

  await req.authorization.check_authorization_or_fail(
    'view',
    `device:${deviceUrlFromId(parameters.device_id)}`,
  );

  const deviceModel = await repositories.device.findOneOrFail({
    where: { uuid: parameters.device_id },
  });

  logger.log('info', 'getDevicesByDeviceId succeeded');

  return {
    status: 200,
    body: await repositories.device.format(deviceModel),
  };
};
