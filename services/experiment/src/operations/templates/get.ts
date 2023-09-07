import { repositories } from '../../database/dataSource.js';
import { getTemplatesSignature } from '../../generated/signatures.js';
import { logger } from '@crosslab/service-common';

/**
 * This function implements the functionality for handling GET requests on
 * /templates endpoint.
 * @param authorization The authorization helper object for the request.
 */
export const getTemplates: getTemplatesSignature = async (authorization) => {
    logger.log('info', 'Handling GET request on endpoint /experiments');

    await authorization.check_authorization_or_fail('view', 'template');

    const templateModels = await repositories.template.find();

    logger.info('info', 'Successfully handled GET request on endpoint /templates');

    return {
        status: 200,
        body: await Promise.all(
            templateModels.map((templateModel) =>
                repositories.template.formatOverview(templateModel),
            ),
        ),
    };
};
