import { repositories } from '../../../../database/dataSource.js';
import { postDevicesByDeviceIdWebsocketSignature } from '../../../../generated/signatures.js';
import { deviceUrlFromId } from '../../../../methods/urlFromId.js';
import {
    ImpossibleOperationError,
    MissingEntityError as _MissingEntityError,
    logger,
} from '@crosslab/service-common';
import { randomUUID } from 'crypto';

/**
 * This function implements the functionality for handling POST requests on
 * /devices/{device_id}/token endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const postDevicesByDeviceIdWebsocket: postDevicesByDeviceIdWebsocketSignature =
    async (authorization, parameters) => {
        logger.log('info', 'postDevicesByDeviceIdWebsocket called');

        // NOTE: should the connect action be used here?
        await authorization.check_authorization_or_fail(
            'edit',
            `device:${deviceUrlFromId(parameters.device_id)}`,
        );

        const deviceModel = await repositories.device.findOneOrFail({
            where: {
                uuid: parameters.device_id,
            },
        });

        if (deviceModel.type !== 'device')
            throw new ImpossibleOperationError(
                "A websocket token may only be requested for a device of type 'device'",
                400,
            );

        deviceModel.token = randomUUID();
        await repositories.device.save(deviceModel);

        setTimeout(async () => {
            logger.log(
                'info',
                `trying to delete websocket token of device '${deviceUrlFromId(
                    parameters.device_id,
                )}'`,
            );

            const newDeviceModel = await repositories.device.findOne({
                where: {
                    uuid: parameters.device_id,
                },
            });

            if (!newDeviceModel) {
                logger.error(
                    'error',
                    `device '${deviceUrlFromId(parameters.device_id)}' does not exist`,
                );
                return;
            }

            if (newDeviceModel.type !== 'device') {
                logger.error(
                    'error',
                    `device '${deviceUrlFromId(parameters.device_id)}' has type '${
                        newDeviceModel.type
                    }' instead of 'device'`,
                );
                return;
            }

            newDeviceModel.token = undefined;
            await repositories.device.save(newDeviceModel);
        }, 300000);

        logger.log('info', 'postDevicesByDeviceIdWebsocket succeeded');

        return {
            status: 200,
            body: deviceModel.token,
        };
    };
