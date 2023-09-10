import { logger } from '@crosslab/service-common';

import { repositories } from '../../database/dataSource.js';
import { getDevicesSignature } from '../../generated/signatures.js';
import { deviceUrlFromId } from '../../methods/urlFromId.js';

/**
 * This function implements the functionality for handling GET requests on
 * /devices endpoint.
 * @param authorization The authorization helper object for the request.
 */
export const getDevices: getDevicesSignature = async req => {
  logger.log('info', 'getDevices called');

  await req.authorization.check_authorization_or_fail('view', 'device');

  const deviceModels = await repositories.device.find();

  logger.log('info', 'getDevices succeeded');

  const visibility = await Promise.all(
    deviceModels.map(device =>
      req.authorization.check_authorization(
        'view',
        `device:${deviceUrlFromId(device.uuid)}`,
      ),
    ),
  );

  const visibleDevices = deviceModels.filter((_value, index) => visibility[index].result);

  return {
    status: 200,
    body: await Promise.all(visibleDevices.map(repositories.deviceOverview.format)),
  };
};
