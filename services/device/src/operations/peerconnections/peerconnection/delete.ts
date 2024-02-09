import { logger } from '@crosslab/service-common';

import { repositories } from '../../../database/dataSource.js';
import { deletePeerconnectionsByPeerconnectionIdSignature } from '../../../generated/signatures.js';
import { signalingQueueManager } from '../../../methods/signaling/signalingQueueManager.js';
import { peerconnectionUrlFromId } from '../../../methods/urlFromId.js';

/**
 * This function implements the functionality for handling DELETE requests on
 * /peerconnection/{peerconnection_id} endpoint.
 * @param req The incoming request.
 * @param parameters The parameters of the request.
 */
export const deletePeerconnectionsByPeerconnectionId: deletePeerconnectionsByPeerconnectionIdSignature =
  async (req, parameters) => {
    logger.log('info', 'deletePeerconnectionsByPeerconnectionId called');

    await req.authorization.check_authorization_or_fail(
      'delete',
      `peerconnection:${peerconnectionUrlFromId(parameters.peerconnection_id)}`,
    );

    const peerconnectionModel = await repositories.peerconnection.findOneOrFail({
      where: { uuid: parameters.peerconnection_id },
    });

    await signalingQueueManager.deleteSignalingQueues(peerconnectionModel.uuid);

    await req.authorization.unrelate(
      req.authorization.user,
      'owner',
      `peerconnection:${peerconnectionUrlFromId(peerconnectionModel.uuid)}`,
    );

    await repositories.peerconnection.remove(peerconnectionModel);

    logger.log('info', 'deletePeerconnectionsByPeerconnectionId succeeded');

    return {
      status: 204,
    };
  };
