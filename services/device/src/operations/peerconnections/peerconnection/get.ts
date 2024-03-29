import { logger } from '@crosslab/service-common';

import { repositories } from '../../../database/dataSource.js';
import { getPeerconnectionsByPeerconnectionIdSignature } from '../../../generated/signatures.js';
import { peerconnectionUrlFromId } from '../../../methods/urlFromId.js';

/**
 * This function implements the functionality for handling GET requests on
 * /peerconnections/{peerconnection_id} endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 */
export const getPeerconnectionsByPeerconnectionId: getPeerconnectionsByPeerconnectionIdSignature =
  async (req, parameters) => {
    logger.log('info', 'getPeerconnectionsByPeerconnectionId called');

    await req.authorization.check_authorization_or_fail(
      'view',
      `peerconnection:${peerconnectionUrlFromId(parameters.peerconnection_id)}`,
    );

    const peerconnectionModel = await repositories.peerconnection.findOneOrFail({
      where: { uuid: parameters.peerconnection_id },
    });

    logger.log('info', 'getPeerconnectionsByPeerconnectionId succeeded');

    return {
      status: 200,
      body: await repositories.peerconnection.format(peerconnectionModel),
    };
  };
