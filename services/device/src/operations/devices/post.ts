import { repositories } from '../../database/dataSource';
import { postDevicesSignature } from '../../generated/signatures';
import { changedCallbacks } from '../../methods/callbacks';
import { deviceUrlFromId } from '../../methods/urlFromId';
import { MalformedBodyError, logger } from '@crosslab/service-common';

/**
 * This function implements the functionality for handling POST requests on
 * /devices endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 */
export const postDevices: postDevicesSignature = async (
    authorization,
    parameters,
    body,
) => {
    logger.log('info', 'postDevices called');

    await authorization.check_authorization_or_fail('create', 'device');

    if (!body.name)
        throw new MalformedBodyError(
            "Property 'name' is required and must not be empty",
            400,
        );

    const deviceModel = await repositories.device.create(body);
    // TODO: remove owner property or change to make it usable again
    deviceModel.owner = 'http://example.com/users/1';
    await repositories.device.save(deviceModel);

    if (parameters.changedUrl) {
        logger.log(
            'info',
            `registering changed-callback for device '${deviceUrlFromId(
                deviceModel.uuid,
            )}' to '${parameters.changedUrl}'`,
        );
        changedCallbacks.set(deviceModel.uuid, [parameters.changedUrl]);
    }

    logger.log('info', 'postDevices succeeded');

    return {
        status: 201,
        body: await repositories.device.format(deviceModel),
    };
};
