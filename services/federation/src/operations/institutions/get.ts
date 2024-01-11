import { repositories } from '../../database/dataSource.js';
import { getInstitutionsSignature } from '../../generated/signatures.js';

/**
 * This function implements the functionality for handling GET requests on
 * /institutions endpoint.
 * @param req The incoming request.
 */
export const getInstitutions: getInstitutionsSignature = async req => {
  await req.authorization.check_authorization_or_fail('view', `institution`);

  const institutions = await repositories.institution.find();

  return {
    status: 200,
    body: await Promise.all(institutions.map(repositories.institution.format)),
  };
};
