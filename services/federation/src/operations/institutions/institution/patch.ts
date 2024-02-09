import { MissingEntityError } from '@crosslab/service-common';

import { repositories } from '../../../database/dataSource.js';
import { patchInstitutionsByInstitutionIdSignature } from '../../../generated/signatures.js';
import { institutionUrlFromId } from '../../../methods/utils.js';

/**
 * This function implements the functionality for handling PATCH requests on
 * /institutions/{institution_id} endpoint.
 * @param req The incoming request.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 */
export const patchInstitutionsByInstitutionId: patchInstitutionsByInstitutionIdSignature =
  async (req, parameters, body) => {
    await req.authorization.check_authorization_or_fail(
      'edit',
      `institution:${institutionUrlFromId(parameters.institution_id)}`,
    );

    const institutionModel = await repositories.institution.findOneOrFail({
      where: {
        uuid: parameters.institution_id,
      },
    });

    if (!institutionModel) {
      throw new MissingEntityError(
        `Could not find institution ${parameters.institution_id}`,
        404,
      );
    }

    if (body) {
      await repositories.institution.write(institutionModel, body);
      await repositories.institution.save(institutionModel);
    }

    return {
      status: 200,
      body: await repositories.institution.format(institutionModel),
    };
  };
