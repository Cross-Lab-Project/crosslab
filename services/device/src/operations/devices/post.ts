import { MalformedBodyError, logger } from '@crosslab/service-common';

import { repositories } from '../../database/dataSource.js';
import { postDevicesSignature } from '../../generated/signatures.js';
import { changedCallbacks } from '../../methods/callbacks.js';
import { deviceUrlFromId } from '../../methods/urlFromId.js';

/**
 * This function implements the functionality for handling POST requests on
 * /devices endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 */
export const postDevices: postDevicesSignature = async (
  req,
  parameters,
  body,
) => {
  logger.log('info', 'postDevices called');

  // NOTE: create action currently does not exist
  await req.authorization.check_authorization_or_fail('create', 'device');

  if (!body.name)
    throw new MalformedBodyError(
      "Property 'name' is required and must not be empty",
      400,
    );

  const deviceModel = await repositories.device.create(body);
  // TODO: remove owner property or change to make it usable again
  deviceModel.owner = 'http://example.com/users/1';

  await req.authorization.relate(
    req.authorization.user,
    'owner',
    `device:${deviceUrlFromId(deviceModel.uuid)}`,
  );

  await repositories.device.save(deviceModel);

  if (parameters.changedUrl) {
    logger.log(
      'info',
      `registering changed-callback for device '${deviceUrlFromId(
        deviceModel.uuid,
      )}' to '${parameters.changedUrl}'`,
    );
    changedCallbacks.set(deviceModel.uuid, [parameters.changedUrl]);
  }

  logger.log('info', 'postDevices succeeded');

  return {
    status: 201,
    body: await repositories.device.format(deviceModel),
  };
};
