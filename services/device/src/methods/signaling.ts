import {
  ImpossibleOperationError,
  MissingEntityError,
  UnrelatedPeerconnectionError,
} from '@crosslab/service-common';

import { repositories } from '../database/dataSource.js';
import { connectedDevices } from '../operations/devices/websocket/handling/index.js';
import { getPeerconnection } from './peerconnection.js';
import { deviceIdFromUrl, deviceUrlFromId } from './urlFromId.js';

export async function sendSignalingMessage(
  device_url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: any,
  peerconnection_url: string,
) {
  const device_id = deviceIdFromUrl(device_url);
  const deviceModel = await repositories.device.findOneOrFail({
    where: { uuid: device_id },
  });

  // Make sure device is a concrete device
  if (deviceModel.type !== 'device')
    throw new ImpossibleOperationError(
      `Cannot send signaling message to device with type '${deviceModel.type}'`,
      400,
    );

  // Retrieve peerconnection and make sure the device is taking part in it
  const peerconnection = await getPeerconnection({
    url: peerconnection_url,
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

  const webSocket = connectedDevices.get(device_id);

  if (!webSocket)
    throw new MissingEntityError(
      `Could not find websocket connection for device ${device_id}`,
      404,
    );

  webSocket.send(JSON.stringify(message));
}
