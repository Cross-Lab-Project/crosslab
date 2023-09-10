import { repositories } from '../../../database/dataSource.js';
import { ConcreteDevice, DeviceChangedEventCallback } from '../../../generated/types.js';
import { timeoutMap } from '../../../globals.js';
import { getDevice } from '../../../methods/device.js';
import { signalingQueueManager } from '../../../methods/signaling/signalingQueueManager.js';

/**
 * This function handles an incoming "device-changed" event callback.
 * @param callback The incoming "device-changed" callback to be handled.
 * @returns The status code for the response to the incoming callback.
 */
export async function handleDeviceChangedEventCallback(
  callback: DeviceChangedEventCallback,
): Promise<200 | 410> {
  switch (callback.device.type) {
    case 'device':
      return await handleConcreteDevice(callback.device);
    default:
      return 410;
  }
}

async function handleConcreteDevice(concreteDevice: ConcreteDevice<'response'>) {
  const pendingConnections = (
    await repositories.peerconnection.find({
      where: {
        status: 'new',
      },
    })
  ).filter(
    peerconnection =>
      peerconnection.deviceA.url === concreteDevice.url ||
      peerconnection.deviceB.url === concreteDevice.url,
  );

  for (const pendingConnection of pendingConnections) {
    const deviceA = await getDevice({ url: pendingConnection.deviceA.url });
    const deviceB = await getDevice({ url: pendingConnection.deviceB.url });

    if (!('connected' in deviceA && 'connected' in deviceB)) continue;
    if (!(deviceA.connected && deviceB.connected)) continue;

    clearTimeout(timeoutMap.get(pendingConnection.uuid));
    signalingQueueManager.startSignalingQueues(pendingConnection.uuid);
    timeoutMap.delete(pendingConnection.uuid);
  }

  return pendingConnections.length === 0 ? 410 : 200;
}
