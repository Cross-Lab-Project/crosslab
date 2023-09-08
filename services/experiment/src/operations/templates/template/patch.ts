import { logger } from '@crosslab/service-common';

import { repositories } from '../../../database/dataSource.js';
import { patchTemplatesByTemplateIdSignature } from '../../../generated/signatures.js';
import { templateUrlFromId } from '../../../methods/url.js';

/**
 * This function implements the functionality for handling PATCH requests on
 * /templates/{template_id} endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 */
export const patchTemplatesByTemplateId: patchTemplatesByTemplateIdSignature = async (
  authorization,
  parameters,
  body,
) => {
  logger.log(
    'info',
    `Handling PATCH request on endpoint /templates/${parameters.template_id}`,
  );

  await authorization.check_authorization_or_fail(
    'edit',
    `template:${templateUrlFromId(parameters.template_id)}`,
  );

  const templateModel = await repositories.template.findOneOrFail({
    where: {
      uuid: parameters.template_id,
    },
  });

  await repositories.template.write(templateModel, body);

  await repositories.template.save(templateModel);

  logger.log(
    'info',
    `Successfully handled PATCH request on endpoint /templates/${parameters.template_id}`,
  );

  return {
    status: 200,
    body: await repositories.template.format(templateModel),
  };
};
