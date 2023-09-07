import { repositories } from '../../../../database/dataSource.js';
import { deleteDevicesByDeviceIdAvailabilitySignature } from '../../../../generated/signatures.js';
import { deviceUrlFromId } from '../../../../methods/urlFromId.js';
import { ImpossibleOperationError, logger } from '@crosslab/service-common';

/**
 * This function implements the functionality for handling DELETE requests on
 * /devices/{device_id}/availability endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const deleteDevicesByDeviceIdAvailability: deleteDevicesByDeviceIdAvailabilitySignature =
    async (authorization, parameters) => {
        logger.log('info', 'deleteDevicesByDeviceIdAvailability called');

        await authorization.check_authorization_or_fail(
            'delete',
            `device:${deviceUrlFromId(parameters.device_id)}`,
        );

        const deviceModel = await repositories.device.findOneOrFail({
            where: { uuid: parameters.device_id },
        });

        if (deviceModel.type !== 'device')
            throw new ImpossibleOperationError(
                "Availability rules can only be deleted for devices of type 'device'",
                400,
            );

        deviceModel.availabilityRules = [];
        await repositories.device.save(deviceModel);

        logger.log('info', 'deleteDevicesByDeviceIdAvailability succeeded');

        return {
            status: 204,
        };
    };
