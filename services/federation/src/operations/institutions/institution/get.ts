import { MissingEntityError } from '@crosslab/service-common';

import { repositories } from '../../../database/dataSource.js';
import { getInstitutionsByInstitutionIdSignature } from '../../../generated/signatures.js';
import { institutionUrlFromId } from '../../../methods/utils.js';

/**
 * This function implements the functionality for handling GET requests on
 * /institutions/{institution_id} endpoint.
 * @param req The incoming request.
 * @param parameters The parameters of the request.
 */
export const getInstitutionsByInstitutionId: getInstitutionsByInstitutionIdSignature =
  async (req, parameters) => {
    await req.authorization.check_authorization_or_fail(
      'view',
      `institution:${institutionUrlFromId(parameters.institution_id)}`,
    );

    const institutionModel = await repositories.institution.findOneOrFail({
      where: {
        uuid: parameters.institution_id,
      },
    });

    if (!institutionModel) {
      throw new MissingEntityError(
        `Could not find institution with id "${parameters.institution_id}"`,
        404,
      );
    }

    return {
      status: 200,
      body: await repositories.institution.format(institutionModel),
    };
  };
