import { repositories } from '../../../database/dataSource.js';
import { deleteInstitutionsByInstitutionIdSignature } from '../../../generated/signatures.js';
import { institutionUrlFromId } from '../../../methods/utils.js';

/**
 * This function implements the functionality for handling DELETE requests on
 * /institutions/{institution_id} endpoint.
 * @param req The incoming request.
 * @param parameters The parameters of the request.
 */
export const deleteInstitutionsByInstitutionId: deleteInstitutionsByInstitutionIdSignature =
  async (req, parameters) => {
    await req.authorization.check_authorization_or_fail(
      'delete',
      `institution:${institutionUrlFromId(parameters.institution_id)}`,
    );

    const institutionModel = await repositories.institution.findOneOrFail({
      where: { uuid: parameters.institution_id },
    });

    await repositories.institution.remove(institutionModel);

    return {
      status: 204,
    };
  };
