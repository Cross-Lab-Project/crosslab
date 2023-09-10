import { InvalidValueError, logger } from '@crosslab/service-common';

import { repositories } from '../../database/dataSource.js';
import { postPeerconnectionsSignature } from '../../generated/signatures.js';
import { closedCallbacks, statusChangedCallbacks } from '../../methods/callbacks.js';
import { getDevice } from '../../methods/device.js';
import { signalingQueueManager } from '../../methods/signaling/signalingQueueManager.js';
import { peerconnectionUrlFromId } from '../../methods/urlFromId.js';

/**
 * This function implements the functionality for handling POST requests on
 * /peerconnections endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 */
export const postPeerconnections: postPeerconnectionsSignature = async (
  req,
  parameters,
  body,
) => {
  logger.log('info', 'postPeerconnections called');

  // NOTE: create action currently does not exist
  await req.authorization.check_authorization_or_fail('create', 'peerconnection');

  const deviceA = await getDevice({ url: body.devices[0].url });
  const deviceB = await getDevice({ url: body.devices[1].url });

  if (deviceA.type !== 'device' || deviceB.type !== 'device') {
    throw new InvalidValueError(
      `Cannot establish a peerconnection between devices of type '${deviceA.type}' and '${deviceB.type}'`,
      400,
    );
  }

  const peerconnectionModel = await repositories.peerconnection.create(body);

  await req.authorization.relate(
    req.authorization.user,
    'owner',
    `peerconnection:${peerconnectionUrlFromId(peerconnectionModel.uuid)}`,
  );

  await repositories.peerconnection.save(peerconnectionModel);

  await signalingQueueManager.createSignalingQueues(peerconnectionModel.uuid);

  if (deviceA.connected && deviceB.connected) {
    // peerconnection can be started directly
    signalingQueueManager.startSignalingQueues(peerconnectionModel.uuid);
  }

  if (parameters.closedUrl) {
    logger.log(
      'info',
      `postPeerconnections: registering closed-callback for '${parameters.closedUrl}'`,
    );
    const closedCallbackURLs = closedCallbacks.get(peerconnectionModel.uuid) ?? [];
    closedCallbackURLs.push(parameters.closedUrl);
    closedCallbacks.set(peerconnectionModel.uuid, closedCallbackURLs);
  }

  if (parameters.statusChangedUrl) {
    logger.log(
      'info',
      `postPeerconnections: registering status-changed-callback for '${parameters.statusChangedUrl}'`,
    );
    const statusChangedCallbackURLs =
      statusChangedCallbacks.get(peerconnectionModel.uuid) ?? [];
    statusChangedCallbackURLs.push(parameters.statusChangedUrl);
    statusChangedCallbacks.set(peerconnectionModel.uuid, statusChangedCallbackURLs);
  }

  logger.log('info', 'postPeerconnections succeeded');

  return {
    status: peerconnectionModel.status === 'connected' ? 201 : 202,
    body: await repositories.peerconnection.format(peerconnectionModel),
  };
};
