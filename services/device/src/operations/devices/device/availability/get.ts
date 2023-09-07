import { repositories } from '../../../../database/dataSource.js';
import { getDevicesByDeviceIdAvailabilitySignature } from '../../../../generated/signatures.js';
import { WEEK } from '../../../../globals.js';
import { calculateAvailability } from '../../../../methods/availability.js';
import { deviceUrlFromId } from '../../../../methods/urlFromId.js';
import { ImpossibleOperationError, logger } from '@crosslab/service-common';

/**
 * This function implements the functionality for handling GET requests on
 * /devices/{device_id}/availability endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const getDevicesByDeviceIdAvailability: getDevicesByDeviceIdAvailabilitySignature =
    async (authorization, parameters) => {
        logger.log('info', 'getDevicesByDeviceIdAvailability called');

        await authorization.check_authorization_or_fail(
            'view',
            `device:${deviceUrlFromId(parameters.device_id)}`,
        );

        const deviceModel = await repositories.device.findOneOrFail({
            where: { uuid: parameters.device_id },
        });

        if (deviceModel.type !== 'device')
            throw new ImpossibleOperationError(
                "Availability can only be retrieved for devices of type 'device'",
                500,
            );

        const startTime = parameters.startTime
            ? Date.parse(parameters.startTime)
            : Date.now();
        const endTime =
            (parameters.startTime ? Date.parse(parameters.startTime) : startTime) + WEEK;

        const availability = calculateAvailability(
            deviceModel.availabilityRules,
            startTime,
            endTime,
        );

        logger.log('info', 'getDevicesByDeviceIdAvailability succeeded');

        return {
            status: 200,
            body: availability,
        };
    };
