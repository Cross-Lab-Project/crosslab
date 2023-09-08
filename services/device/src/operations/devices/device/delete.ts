import { logger } from '@crosslab/service-common';

import { repositories } from '../../../database/dataSource.js';
import { deleteDevicesByDeviceIdSignature } from '../../../generated/signatures.js';
import { deviceUrlFromId } from '../../../methods/urlFromId.js';

/**
 * This function implements the functionality for handling DELETE requests on
 * /devices/{device_id} endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const deleteDevicesByDeviceId: deleteDevicesByDeviceIdSignature = async (
  authorization,
  parameters,
) => {
  logger.log('info', 'deleteDevicesByDeviceId called');

  await authorization.check_authorization_or_fail(
    'delete',
    `device:${deviceUrlFromId(parameters.device_id)}`,
  );

  const deviceModel = await repositories.device.findOneOrFail({
    where: { uuid: parameters.device_id },
  });

  await authorization.unrelate(
    authorization.user,
    'owner',
    `device:${deviceUrlFromId(deviceModel.uuid)}`,
  );

  await repositories.device.remove(deviceModel);

  logger.log('info', 'deleteDevicesByDeviceId succeeded');

  return {
    status: 204,
  };
};
