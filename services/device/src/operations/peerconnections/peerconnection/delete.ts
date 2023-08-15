import {repositories} from "../../../database/dataSource";
import {deletePeerconnectionsByPeerconnectionIdSignature} from "../../../generated/signatures";
import {signalingQueueManager} from "../../../methods/signaling/signalingQueueManager";
import {logger} from "@crosslab/service-common";

/**
 * This function implements the functionality for handling DELETE requests on /peerconnection/{peerconnection_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 */
export const deletePeerconnectionsByPeerconnectionId: deletePeerconnectionsByPeerconnectionIdSignature =
  async (parameters, _user) => {
    logger.log("info", "deletePeerconnectionsByPeerconnectionId called");

    const peerconnectionModel = await repositories.peerconnection.findOneOrFail({
      where: {uuid: parameters.peerconnection_id},
    });

    await signalingQueueManager.closeSignalingQueues(peerconnectionModel.uuid);

    await repositories.peerconnection.remove(peerconnectionModel);

    logger.log("info", "deletePeerconnectionsByPeerconnectionId succeeded");

    return {
      status: 204,
    };
  };
