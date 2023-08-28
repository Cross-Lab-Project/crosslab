import { repositories } from '../../database/dataSource';
import { getPeerconnectionsSignature } from '../../generated/signatures';
import { logger } from '@crosslab/service-common';

/**
 * This function implements the functionality for handling GET requests on
 * /peerconnections endpoint.
 * @param authorization The authorization helper object for the request.
 */
export const getPeerconnections: getPeerconnectionsSignature = async (authorization) => {
    logger.log('info', 'getPeerconnections called');

    await authorization.check_authorization_or_fail('view', 'peerconnection');

    const peerconnectionModels = await repositories.peerconnection.find();

    logger.log('info', 'getPeerconnections succeeded');

    return {
        status: 200,
        body: peerconnectionModels.map(repositories.peerconnection.formatOverview),
    };
};
