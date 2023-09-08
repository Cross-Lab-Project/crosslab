import { InvalidChangeError, MissingEntityError } from '@crosslab/service-common';

import { AppDataSource } from '../database/dataSource';
import { UpdateInformationModel } from '../database/model';
import {
  deleteUpdatesByDeviceIdSignature,
  getUpdatesByDeviceIdSignature,
  getUpdatesSignature,
  patchUpdatesByDeviceIdSignature,
  postUpdatesSignature,
} from '../generated/signatures';
import { formatUpdateInformation } from '../methods/format';
import { writeUpdateInformation } from '../methods/write';

/**
 * This function implements the functionality for handling POST requests on
 * /updates endpoint.
 * @param authorization The authorization helper object for the request.
 */
export const getUpdates: getUpdatesSignature = async authorization => {
  await authorization.check_authorization_or_fail('view', `update`);

  const updateInformationRepository = AppDataSource.getRepository(UpdateInformationModel);
  const updateInformationArray = await updateInformationRepository.find();

  return {
    status: 200,
    body: updateInformationArray.map(formatUpdateInformation),
  };
};

/**
 * This function implements the functionality for handling POST requests on
 * /updates endpoint.
 * @param authorization The authorization helper object for the request.
 * @param body The body of the request.
 */
export const postUpdates: postUpdatesSignature = async (authorization, body) => {
  await authorization.check_authorization_or_fail('create', `update`);

  const updateInformationRepository = AppDataSource.getRepository(UpdateInformationModel);
  const updateInformation = updateInformationRepository.create();

  writeUpdateInformation(updateInformation, body);
  await updateInformationRepository.save(updateInformation);

  return {
    status: 201,
    body: formatUpdateInformation(updateInformation),
  };
};

/**
 * This function implements the functionality for handling GET requests on
 * /updates/{device_id} endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 */
export const getUpdatesByDeviceId: getUpdatesByDeviceIdSignature = async (
  authorization,
  parameters,
) => {
  await authorization.check_authorization_or_fail(
    'view',
    `update:${parameters.device_id}`,
  );

  const updateInformationRepository = AppDataSource.getRepository(UpdateInformationModel);
  const updateInformation = await updateInformationRepository.findOneBy({
    device_id: parameters.device_id,
  });

  if (!updateInformation) {
    throw new MissingEntityError(
      `Could not find update for device ${parameters.device_id}`,
      404,
    );
  }

  if (parameters.current_version !== updateInformation.latest_version) {
    return {
      status: 303,
      headers: {
        Location: updateInformation.latest_version_link,
      },
    };
  }

  return {
    status: 200,
  };
};

/**
 * This function implements the functionality for handling DELETE requests on
 * /updates/{device_id} endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 */
export const deleteUpdatesByDeviceId: deleteUpdatesByDeviceIdSignature = async (
  authorization,
  parameters,
) => {
  await authorization.check_authorization_or_fail(
    'delete',
    `update:${parameters.device_id}`,
  );

  const updateInformationRepository = AppDataSource.getRepository(UpdateInformationModel);
  const updateInformation = await updateInformationRepository.findOneBy({
    device_id: parameters.device_id,
  });

  if (!updateInformation) {
    throw new MissingEntityError(
      `Could not find update for device ${parameters.device_id}`,
      404,
    );
  }

  await updateInformationRepository.delete(updateInformation);

  return {
    status: 204,
  };
};

/**
 * This function implements the functionality for handling PATCH requests on
 * /updates/{device_id} endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 */
export const patchUpdatesByDeviceId: patchUpdatesByDeviceIdSignature = async (
  authorization,
  parameters,
  body,
) => {
  await authorization.check_authorization_or_fail(
    'edit',
    `update:${parameters.device_id}`,
  );

  const updateInformationRepository = AppDataSource.getRepository(UpdateInformationModel);
  const updateInformation = await updateInformationRepository.findOneBy({
    device_id: parameters.device_id,
  });

  if (!updateInformation) {
    throw new MissingEntityError(
      `Could not find update for device ${parameters.device_id}`,
      404,
    );
  }

  if (updateInformation.device_id != body.device_id) {
    throw new InvalidChangeError(`Cannot change device id of update`, 400);
  }

  writeUpdateInformation(updateInformation, body);
  await updateInformationRepository.save(updateInformation);

  return {
    status: 200,
    body: formatUpdateInformation(updateInformation),
  };
};
