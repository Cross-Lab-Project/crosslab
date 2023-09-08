import { ImpossibleOperationError, logger } from '@crosslab/service-common';

import { repositories } from '../../../database/dataSource.js';
import { postDevicesByDeviceIdSignature } from '../../../generated/signatures.js';
import { changedCallbacks } from '../../../methods/callbacks.js';
import { deviceUrlFromId } from '../../../methods/urlFromId.js';

/**
 * This function implements the functionality for handling POST requests on
 * /devices/{device_id} endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 * @throws {ImpossibleOperationError} Thrown if device is not instantiable.
 */
export const postDevicesByDeviceId: postDevicesByDeviceIdSignature = async (
  authorization,
  parameters,
) => {
  logger.log('info', 'postDevicesByDeviceId called');

  await authorization.check_authorization_or_fail(
    'instantiate',
    `device:${deviceUrlFromId(parameters.device_id)}`,
  );

  const instantiableDeviceModel = await repositories.device.findOneOrFail({
    where: { uuid: parameters.device_id },
  });

  if (
    instantiableDeviceModel.type !== 'cloud instantiable' &&
    instantiableDeviceModel.type !== 'edge instantiable'
  )
    throw new ImpossibleOperationError(
      `Cannot create new instance of device '${deviceUrlFromId(
        instantiableDeviceModel.uuid,
      )}' since it has type '${instantiableDeviceModel.type}'`,
      400,
    );

  const concreteDeviceModel = await repositories.concreteDevice.create({
    ...(await repositories.device.format(instantiableDeviceModel)),
    type: 'device',
  });
  concreteDeviceModel.owner = 'https://todo.example.com';

  await repositories.device.save(concreteDeviceModel);

  if (parameters.changedUrl) {
    logger.log(
      'info',
      `registering changed-callback for device '${deviceUrlFromId(
        concreteDeviceModel.uuid,
      )}' to '${parameters.changedUrl}'`,
    );
    const changedCallbackURLs = changedCallbacks.get(concreteDeviceModel.uuid) ?? [];
    changedCallbackURLs.push(parameters.changedUrl);
    changedCallbacks.set(concreteDeviceModel.uuid, changedCallbackURLs);
  }
  const instance = await repositories.concreteDevice.format(concreteDeviceModel);

  await repositories.device.save(instantiableDeviceModel);

  logger.log('info', 'postDevicesByDeviceId succeeded');

  return {
    status: 201,
    body: {
      deviceToken: 'deprecated',
      instance: instance,
    },
  };
};
