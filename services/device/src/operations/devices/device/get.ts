import { logger } from '@crosslab/service-common';
import base64url from 'base64-url';

import * as clients from '../../../clients/index.js';
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

  if (parameters.device_id.startsWith('federated-')) {
    const url = base64url.decode(parameters.device_id.replace('federated-', ''));

    const federatedDevice = await clients.device.getDevice(url);
    return {
      status: 200,
      body: federatedDevice,
    };
  }

  await req.authorization.check_authorization_or_fail(
    'view',
    `device:${deviceUrlFromId(parameters.device_id)}`,
  );

  const deviceModel = await repositories.device.findOneOrFail({
    where: { uuid: parameters.device_id },
  });

  const body = await repositories.device.format(deviceModel);

  if (deviceModel.type === 'group') {
    const visibility = await Promise.all(
      deviceModel.devices.map(
        async device =>
          (await req.authorization.check_authorization('view', `device:${device.url}`))
            .result,
      ),
    );

    body.devices = deviceModel.devices.filter((_device, index) => visibility[index]);
  }

  logger.log('info', 'getDevicesByDeviceId succeeded');

  return {
    status: 200,
    body,
  };
};
