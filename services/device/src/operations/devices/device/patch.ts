import { logger } from '@crosslab/service-common';

import { repositories } from '../../../database/dataSource.js';
import { patchDevicesByDeviceIdSignature } from '../../../generated/signatures.js';
import { changedCallbacks, sendChangedCallback } from '../../../methods/callbacks.js';
import { deviceUrlFromId } from '../../../methods/urlFromId.js';
import { getViewerOwner, setViewerOwner } from '../../../methods/visibility.js';

/**
 * This function implements the functionality for handling PATCH requests on
 * /devices/{device_id} endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 * @throws {InvalidChangeError} Thrown if client tries to update the type of
 * the device.
 */
export const patchDevicesByDeviceId: patchDevicesByDeviceIdSignature = async (
  req,
  parameters,
  body,
) => {
  logger.log('info', 'patchDevicesByDeviceId called');

  await req.authorization.check_authorization_or_fail(
    'edit',
    `device:${deviceUrlFromId(parameters.device_id)}`,
  );

  const deviceModel = await repositories.device.findOneOrFail({
    where: { uuid: parameters.device_id },
  });

  await repositories.device.write(deviceModel, body ?? { type: deviceModel.type });

  await setViewerOwner(
    req.authorization,
    body?.viewer?.map(v => v.url),
    body?.owner?.map(o => o.url),
    `device:${deviceUrlFromId(parameters.device_id)}`,
  );

  await repositories.device.save(deviceModel);

  const { owner, viewer } = await getViewerOwner(
    req.authorization,
    `device:${deviceUrlFromId(parameters.device_id)}`,
  );

  sendChangedCallback(deviceModel);

  if (parameters.changedUrl) {
    logger.log(
      'info',
      `registering changed-callback for device '${deviceUrlFromId(
        deviceModel.uuid,
      )}' to '${parameters.changedUrl}'`,
    );
    const changedCallbackURLs = changedCallbacks.get(deviceModel.uuid) ?? [];
    changedCallbackURLs.push(parameters.changedUrl);
    changedCallbacks.set(deviceModel.uuid, changedCallbackURLs);
  }

  logger.log('info', 'patchDevicesByDeviceId succeeded');

  return {
    status: 200,
    body: {
      ...(await repositories.device.format(deviceModel)),
      owner: owner.map(ownerUrl => {
        return { url: ownerUrl };
      }),
      viewer: viewer.map(viewerUrl => {
        return { url: viewerUrl };
      }),
    },
  };
};
