import { logger } from '@crosslab/service-common';

import { repositories } from '../../../database/dataSource.js';
import { deleteDevicesByDeviceIdSignature } from '../../../generated/signatures.js';
import { signalingQueueManager } from '../../../methods/signaling/signalingQueueManager.js';
import { deviceUrlFromId } from '../../../methods/urlFromId.js';
import { connectedDevices } from '../websocket/handling/index.js';

/**
 * This function implements the functionality for handling DELETE requests on
 * /devices/{device_id} endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const deleteDevicesByDeviceId: deleteDevicesByDeviceIdSignature = async (
  req,
  parameters,
) => {
  logger.log('info', 'deleteDevicesByDeviceId called');

  await req.authorization.check_authorization_or_fail(
    'delete',
    `device:${deviceUrlFromId(parameters.device_id)}`,
  );

  const deviceModel = await repositories.device.findOneOrFail({
    where: { uuid: parameters.device_id },
  });

  await req.authorization.unrelate(
    req.authorization.user,
    'owner',
    `device:${deviceUrlFromId(deviceModel.uuid)}`,
  );

  await repositories.device.remove(deviceModel);

  const peerconnections = (await repositories.peerconnection.find()).filter(
    peerconnection =>
      peerconnection.deviceA.url === deviceUrlFromId(deviceModel.uuid) ||
      peerconnection.deviceB.url === deviceUrlFromId(deviceModel.uuid),
  );
  for (const peerconnection of peerconnections) {
    await repositories.peerconnection.remove(peerconnection);
    await signalingQueueManager.deleteSignalingQueues(peerconnection.uuid);
  }

  const webSocket = connectedDevices.get(deviceModel.uuid);
  if (webSocket) webSocket.terminate();
  connectedDevices.delete(deviceModel.uuid);

  logger.log('info', 'deleteDevicesByDeviceId succeeded');

  return {
    status: 204,
  };
};
