import {
  ImpossibleOperationError,
  MissingEntityError,
  UnrelatedPeerconnectionError,
  logger,
} from '@crosslab/service-common';

import { repositories } from '../../../../database/dataSource.js';
import { postDevicesByDeviceIdSignalingSignature } from '../../../../generated/signatures.js';
import {
  isConfigurationMessage,
  isExperimentStatusChangedMessage,
} from '../../../../generated/types.js';
import { getPeerconnection } from '../../../../methods/peerconnection.js';
import { deviceUrlFromId } from '../../../../methods/urlFromId.js';
import { connectedDevices } from '../../websocket/handling/index.js';

/**
 * This function implements the functionality for handling POST requests on
 * /devices/{device_id}/signaling endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database
 * or if websocket for device is not found.
 * @throws {InvalidValueError} Thrown if type of device is not "device" or if
 * device is not part of the peerconnection.
 */
export const postDevicesByDeviceIdSignaling: postDevicesByDeviceIdSignalingSignature =
  async (req, parameters, body) => {
    logger.log('info', 'postDevicesByDeviceIdSignaling called');

    await req.authorization.check_authorization_or_fail(
      'message',
      `device:${deviceUrlFromId(parameters.device_id)}`,
    );

    // Get device
    const deviceModel = await repositories.device.findOneOrFail({
      where: { uuid: parameters.device_id },
    });

    // Make sure device is a concrete device
    if (deviceModel.type !== 'device')
      throw new ImpossibleOperationError(
        `Cannot send signaling message to device with type '${deviceModel.type}'`,
        400,
      );

    // Retrieve peerconnection and make sure the device is taking part in it
    if (!isConfigurationMessage(body) && !isExperimentStatusChangedMessage(body)) {
      const peerconnection = await getPeerconnection({
        url: body.connectionUrl,
      });
      const deviceA = peerconnection.deviceA;
      const deviceB = peerconnection.deviceB;

      if (
        !(deviceA.url === deviceUrlFromId(deviceModel.uuid)) &&
        !(deviceB.url === deviceUrlFromId(deviceModel.uuid))
      ) {
        throw new UnrelatedPeerconnectionError(
          `Device is not part of the peerconnection`,
          400,
        );
      }
    }

    const webSocket = connectedDevices.get(parameters.device_id);

    if (!webSocket)
      throw new MissingEntityError(
        `Could not find websocket connection for device ${parameters.device_id}`,
        404,
      );

    webSocket.send(JSON.stringify(body));

    logger.log('info', 'postDevicesByDeviceIdSignaling succeeded');

    return {
      status: 200,
    };
  };
