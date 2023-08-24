import { connectedDevices } from '../..';
import { repositories } from '../../../../database/dataSource';
import { postDevicesByDeviceIdSignalingSignature } from '../../../../generated/signatures';
import { apiClient } from '../../../../globals';
import { deviceUrlFromId } from '../../../../methods/urlFromId';
import {
    ImpossibleOperationError,
    UnrelatedPeerconnectionError,
    MissingEntityError,
    logger,
} from '@crosslab/service-common';

/**
 * This function implements the functionality for handling POST requests on /devices/{device_id}/signaling endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database or if websocket for device is not found.
 * @throws {InvalidValueError} Thrown if type of device is not "device" or if device is not part of the peerconnection.
 */
export const postDevicesByDeviceIdSignaling: postDevicesByDeviceIdSignalingSignature =
    async (authorization, parameters, body) => {
        logger.log('info', 'postDevicesByDeviceIdSignaling called');

        await authorization.check_authorization_or_fail(
            'signal',
            `device:${deviceUrlFromId(parameters.device_id)}`,
        );

        // Get device
        const deviceModel = await repositories.device.findOneOrFail({
            where: { uuid: parameters.device_id },
        });

        // Make sure device is a concrete device
        if (deviceModel.type !== 'device')
            throw new ImpossibleOperationError(
                `Cannot send signaling message to device with type '${deviceModel.type}'`,
                400,
            );

        // Retrieve peerconnection and make sure the device is taking part in it
        const peerconnection = await apiClient.getPeerconnection(
            parameters.peerconnection_url,
        );
        const deviceA = peerconnection.devices[0];
        const deviceB = peerconnection.devices[1];

        if (
            !(deviceA.url === deviceUrlFromId(deviceModel.uuid)) &&
            !(deviceB.url === deviceUrlFromId(deviceModel.uuid))
        ) {
            throw new UnrelatedPeerconnectionError(
                `Device is not part of the peerconnection`,
                400,
            );
        }

        const webSocket = connectedDevices.get(parameters.device_id);

        if (!webSocket)
            throw new MissingEntityError(
                `Could not find websocket connection for device ${parameters.device_id}`,
                404,
            );

        webSocket.send(JSON.stringify(body));

        logger.log('info', 'postDevicesByDeviceIdSignaling succeeded');

        return {
            status: 200,
        };
    };
