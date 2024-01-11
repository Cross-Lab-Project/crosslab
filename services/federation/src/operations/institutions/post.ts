import { repositories } from '../../database/dataSource.js';
import { postInstitutionsSignature } from '../../generated/signatures.js';

/**
 * This function implements the functionality for handling POST requests on
 * /institutions endpoint.
 * @param req The incoming request.
 * @param body The body of the request.
 */
export const postInstitutions: postInstitutionsSignature = async (req, body) => {
  await req.authorization.check_authorization_or_fail('create', `institution`);

  const institution = await repositories.institution.create();

  await repositories.institution.write(institution, body);

  await repositories.institution.save(institution);

  return {
    status: 201,
    body: await repositories.institution.format(institution),
  };
};
