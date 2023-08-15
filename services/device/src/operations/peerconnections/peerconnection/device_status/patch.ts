import {repositories} from "../../../../database/dataSource";
import {patchPeerconnectionsByPeerconnectionIdDeviceStatusSignature} from "../../../../generated/signatures";
import {mutexManager} from "../../../../methods/mutexManager";
import {peerconnectionUrlFromId} from "../../../../methods/urlFromId";
import {sendClosedCallback, sendStatusChangedCallback} from "../../../callbacks";
import {UnrelatedPeerconnectionError, logger} from "@crosslab/service-common";

/**
 * This function implements the functionality for handling PATCH requests on
 * /peerconnections/{peerconnection_id}/device_status endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 */
export const patchPeerconnectionsByPeerconnectionIdDeviceStatus: patchPeerconnectionsByPeerconnectionIdDeviceStatusSignature =
  async (parameters, body, _user) => {
    logger.log("info", "patchPeerconnectionsByPeerconnectionIdDeviceStatus called", {
      data: {
        peerconnection: parameters.peerconnection_id,
        device: parameters.device_url,
        status: body.status,
      },
    });

    const release = await mutexManager.acquire(parameters.peerconnection_id);

    try {
      const peerconnectionModel = await repositories.peerconnection.findOneOrFail({
        where: {uuid: parameters.peerconnection_id},
      });

      if (
        peerconnectionModel.deviceA.url !== parameters.device_url &&
        peerconnectionModel.deviceB.url !== parameters.device_url
      ) {
        throw new UnrelatedPeerconnectionError(
          `Device '${
            parameters.device_url
          }' is not taking part in peerconnection '${peerconnectionUrlFromId(
            peerconnectionModel.uuid,
          )}'`,
          400,
        );
      }

      if (peerconnectionModel.deviceA.url === parameters.device_url)
        peerconnectionModel.deviceA.status = body.status;

      if (peerconnectionModel.deviceB.url === parameters.device_url)
        peerconnectionModel.deviceB.status = body.status;

      const oldStatus = peerconnectionModel.status;

      if (
        peerconnectionModel.status === "closed" ||
        peerconnectionModel.deviceA.status === "closed" ||
        peerconnectionModel.deviceB.status === "closed"
      ) {
        peerconnectionModel.status = "closed";
      } else if (
        peerconnectionModel.deviceA.status === "failed" ||
        peerconnectionModel.deviceB.status === "failed"
      ) {
        peerconnectionModel.status = "failed";
      } else if (
        peerconnectionModel.deviceA.status === "disconnected" ||
        peerconnectionModel.deviceB.status === "disconnected"
      ) {
        peerconnectionModel.status = "disconnected";
      } else if (
        peerconnectionModel.deviceA.status === "connecting" ||
        peerconnectionModel.deviceB.status === "connecting"
      ) {
        peerconnectionModel.status = "connecting";
      } else if (
        peerconnectionModel.deviceA.status === "connected" &&
        peerconnectionModel.deviceB.status === "connected"
      ) {
        peerconnectionModel.status = "connected";
      } else {
        peerconnectionModel.status = "new";
      }

      if (peerconnectionModel.status !== oldStatus) {
        await sendStatusChangedCallback(peerconnectionModel);
        if (peerconnectionModel.status === "closed")
          await sendClosedCallback(peerconnectionModel);
      }

      logger.log("info", "peerconnection devices status info", {
        data: {
          peerconnection: peerconnectionModel.uuid,
          statusDeviceA: peerconnectionModel.deviceA.status,
          statusDeviceB: peerconnectionModel.deviceB.status,
        },
      });

      await repositories.peerconnection.save(peerconnectionModel);

      logger.log("info", "patchPeerconnectionsByPeerconnectionIdDeviceStatus succeeded");
    } finally {
      release();
    }

    return {
      status: 204,
    };
  };
