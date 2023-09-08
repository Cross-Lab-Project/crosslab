import { logger } from '@crosslab/service-common';

import { repositories } from '../../../database/dataSource.js';
import { getTemplatesByTemplateIdSignature } from '../../../generated/signatures.js';
import { templateUrlFromId } from '../../../methods/url.js';

/**
 * This function implements the functionality for handling GET requests on
 * /templates/{template_id} endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 */
export const getTemplatesByTemplateId: getTemplatesByTemplateIdSignature = async (
  authorization,
  parameters,
) => {
  logger.log(
    'info',
    `Handling GET request on endpoint /templates/${parameters.template_id}`,
  );

  await authorization.check_authorization_or_fail(
    'view',
    `template:${templateUrlFromId(parameters.template_id)}`,
  );

  const templateModel = await repositories.template.findOneOrFail({
    where: { uuid: parameters.template_id },
  });

  logger.log(
    'info',
    `Successfully handled GET request on endpoint /templates/${parameters.template_id}`,
  );

  return {
    status: 200,
    body: await repositories.template.format(templateModel),
  };
};
