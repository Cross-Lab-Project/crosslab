import { repositories } from '../../../database/dataSource.js';
import { deleteTemplatesByTemplateIdSignature } from '../../../generated/signatures.js';
import { templateUrlFromId } from '../../../methods/url.js';
import { logger } from '@crosslab/service-common';

/**
 * This function implements the functionality for handling DELETE requests on
 * /templates/{template_id} endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 */
export const deleteTemplatesByTemplateId: deleteTemplatesByTemplateIdSignature = async (
    authorization,
    parameters,
) => {
    logger.log(
        'info',
        `Handling DELETE request on endpoint /templates/${parameters.template_id}`,
    );

    await authorization.check_authorization_or_fail(
        'delete',
        `template:${templateUrlFromId(parameters.template_id)}`,
    );

    const templateModel = await repositories.template.findOneOrFail({
        where: { uuid: parameters.template_id },
    });

    await authorization.unrelate(
        authorization.user,
        'owner',
        `template:${templateUrlFromId(templateModel.uuid)}`,
    );

    await repositories.template.remove(templateModel);

    logger.log(
        'info',
        `Successfully handled DELETE request on endpoint /templates/${parameters.template_id}`,
    );

    return {
        status: 204,
    };
};
