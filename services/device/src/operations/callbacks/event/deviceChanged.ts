import {repositories} from "../../../database/dataSource";
import {ConcreteDevice, DeviceChangedEventCallback} from "../../../generated/types";
import {apiClient, timeoutMap} from "../../../globals";
import {signalingQueueManager} from "../../../methods/signaling/signalingQueueManager";

/**
 * This function handles an incoming "device-changed" event callback.
 * @param callback The incoming "device-changed" callback to be handled.
 * @returns The status code for the response to the incoming callback.
 */
export async function handleDeviceChangedEventCallback(
  callback: DeviceChangedEventCallback,
): Promise<200 | 410> {
  switch (callback.device.type) {
    case "device":
      return await handleConcreteDevice(callback.device);
    default:
      return 410;
  }
}

async function handleConcreteDevice(concreteDevice: ConcreteDevice<"response">) {
  const pendingConnections = (
    await repositories.peerconnection.find({
      where: {
        status: "new",
      },
    })
  ).filter(
    peerconnection =>
      peerconnection.deviceA.url === concreteDevice.url ||
      peerconnection.deviceB.url === concreteDevice.url,
  );

  for (const pendingConnection of pendingConnections) {
    const deviceA = await apiClient.getDevice(pendingConnection.deviceA.url);
    const deviceB = await apiClient.getDevice(pendingConnection.deviceB.url);

    if (deviceA.connected && deviceB.connected) {
      clearTimeout(timeoutMap.get(pendingConnection.uuid));
      signalingQueueManager.startSignalingQueues(pendingConnection.uuid);
      timeoutMap.delete(pendingConnection.uuid);
    }
  }

  return pendingConnections.length === 0 ? 410 : 200;
}
