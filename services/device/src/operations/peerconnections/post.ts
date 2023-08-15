import {repositories} from "../../database/dataSource";
import {postPeerconnectionsSignature} from "../../generated/signatures";
import {apiClient, timeoutMap} from "../../globals";
import {
  callbackUrl,
  sendStatusChangedCallback,
  closedCallbacks,
  statusChangedCallbacks,
} from "../../methods/callbacks";
import {signalingQueueManager} from "../../methods/signaling/signalingQueueManager";
import {peerconnectionUrlFromId} from "../../methods/urlFromId";
import {InvalidValueError, logger} from "@crosslab/service-common";

/**
 * This function implements the functionality for handling POST requests on /peerconnections endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 */
export const postPeerconnections: postPeerconnectionsSignature = async (
  parameters,
  body,
  _user,
) => {
  logger.log("info", "postPeerconnections called");

  const deviceA = await apiClient.getDevice(body.devices[0].url);
  const deviceB = await apiClient.getDevice(body.devices[1].url);

  if (deviceA.type !== "device" || deviceB.type !== "device") {
    throw new InvalidValueError(
      `Cannot establish a peerconnection between devices of type '${deviceA.type}' and '${deviceB.type}'`,
      400,
    );
  }

  const peerconnectionModel = await repositories.peerconnection.create(body);

  await repositories.peerconnection.save(peerconnectionModel);

  await signalingQueueManager.createSignalingQueues(peerconnectionModel.uuid);

  if (deviceA.connected && deviceB.connected) {
    // peerconnection can be started directly
    signalingQueueManager.startSignalingQueues(peerconnectionModel.uuid);
  } else {
    // need to wait for devices to connect
    // register changed callbacks for devices to get notified when they connect
    const n_deviceA = await apiClient.updateDevice(
      deviceA.url,
      {type: "device"},
      {changedUrl: callbackUrl},
    );
    const n_deviceB = await apiClient.updateDevice(
      deviceB.url,
      {type: "device"},
      {changedUrl: callbackUrl},
    );

    // check that devices still have the correct type
    if (n_deviceA.type !== "device" || n_deviceB.type !== "device") {
      throw new InvalidValueError(
        `Cannot establish a peerconnection between devices of type '${deviceA.type}' and '${deviceB.type}'`,
        400,
      );
    }

    // set timeout for checking if devices are connected ???
    timeoutMap.set(
      peerconnectionModel.uuid,
      setTimeout(async () => {
        try {
          logger.log("info", "devices did not connect");
          peerconnectionModel.status = "failed";
          await repositories.peerconnection.save(peerconnectionModel);
          await sendStatusChangedCallback(peerconnectionModel);
        } catch (error) {
          logger.log(
            "error",
            `Something went wrong while trying to set status of peerconnection '${peerconnectionUrlFromId(
              peerconnectionModel.uuid,
            )}' to 'failed'`,
            {data: {error}},
          );
        }
      }, 30000),
    );
  }

  if (parameters.closedUrl) {
    logger.log(
      "info",
      `postPeerconnections: registering closed-callback for '${parameters.closedUrl}'`,
    );
    const closedCallbackURLs = closedCallbacks.get(peerconnectionModel.uuid) ?? [];
    closedCallbackURLs.push(parameters.closedUrl);
    closedCallbacks.set(peerconnectionModel.uuid, closedCallbackURLs);
  }

  if (parameters.statusChangedUrl) {
    logger.log(
      "info",
      `postPeerconnections: registering status-changed-callback for '${parameters.statusChangedUrl}'`,
    );
    const statusChangedCallbackURLs =
      statusChangedCallbacks.get(peerconnectionModel.uuid) ?? [];
    statusChangedCallbackURLs.push(parameters.statusChangedUrl);
    statusChangedCallbacks.set(peerconnectionModel.uuid, statusChangedCallbackURLs);
  }

  logger.log("info", "postPeerconnections succeeded");

  return {
    status: peerconnectionModel.status === "connected" ? 201 : 202,
    body: await repositories.peerconnection.format(peerconnectionModel),
  };
};
