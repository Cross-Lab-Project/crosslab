import { repositories } from '../../../../database/dataSource.js';
import { postDevicesByDeviceIdAvailabilitySignature } from '../../../../generated/signatures.js';
import { WEEK } from '../../../../globals.js';
import { calculateAvailability } from '../../../../methods/availability.js';
import { sendChangedCallback } from '../../../../methods/callbacks.js';
import { deviceUrlFromId } from '../../../../methods/urlFromId.js';
import { ImpossibleOperationError, logger } from '@crosslab/service-common';

/**
 * This function implements the functionality for handling POST requests on
 * /devices/{device_id}/availability endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const postDevicesByDeviceIdAvailability: postDevicesByDeviceIdAvailabilitySignature =
    async (authorization, parameters, body) => {
        logger.log('info', 'postDevicesByDeviceIdAvailability called');

        await authorization.check_authorization_or_fail(
            'edit',
            `device:${deviceUrlFromId(parameters.device_id)}`,
        );

        const deviceModel = await repositories.device.findOneOrFail({
            where: { uuid: parameters.device_id },
        });

        if (deviceModel.type !== 'device') {
            throw new ImpossibleOperationError(
                `Can only update the availability for a device of type 'device', not for type '${deviceModel.type}'`,
                400,
            );
        }

        deviceModel.availabilityRules ??= [];
        deviceModel.availabilityRules.push(...(body ?? []));

        const start = Date.now();
        const end = start + WEEK;
        deviceModel.announcedAvailability = calculateAvailability(
            deviceModel.availabilityRules,
            start,
            end,
        );

        await repositories.device.save(deviceModel);
        sendChangedCallback(deviceModel);

        logger.log('info', 'postDevicesByDeviceIdAvailability succeeded');

        return {
            status: 200,
            body: deviceModel.announcedAvailability,
        };
    };
