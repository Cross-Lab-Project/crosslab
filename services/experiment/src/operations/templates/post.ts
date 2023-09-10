import { logger } from '@crosslab/service-common';

import { repositories } from '../../database/dataSource.js';
import { postTemplatesSignature } from '../../generated/signatures.js';
import { templateUrlFromId } from '../../methods/url.js';

/**
 * This function implements the functionality for handling POST requests on
 * /templates endpoint.
 * @param authorization The authorization helper object for the request.
 * @param body The body of the request.
 */
export const postTemplates: postTemplatesSignature = async (req, body) => {
  logger.log('info', 'Handling POST request on endpoint /templates');

  await req.authorization.check_authorization_or_fail('create', 'template');

  const templateModel = await repositories.template.create(body);

  await req.authorization.relate(
    req.authorization.user,
    'owner',
    `template:${templateUrlFromId(templateModel.uuid)}`,
  );

  await repositories.template.save(templateModel);

  logger.log('info', 'Successfully handled POST request on endpoint /templates');

  return {
    status: 201,
    body: await repositories.template.format(templateModel),
  };
};
