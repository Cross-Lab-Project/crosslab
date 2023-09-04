import { repositories } from '../../database/dataSource';
import { postExperimentsSignature } from '../../generated/signatures';
import {
    runExperiment,
    finishExperiment,
    bookExperiment,
} from '../../methods/experimentStatus';
import { experimentUrlFromId } from '../../methods/url';
import { logger } from '@crosslab/service-common';

/**
 * This function implements the functionality for handling POST requests on
 * /experiments endpoint.
 * @param authorization The authorization helper object for the request.
 * @param body The body of the request.
 */
export const postExperiments: postExperimentsSignature = async (authorization, body) => {
    logger.log('info', 'Handling POST request on endpoint /experiments');

    // NOTE: create action currently does not exist
    await authorization.check_authorization_or_fail('create', 'experiment');

    if (body.template === undefined) {
        body.template;
    } else {
        body.template;
    }

    const experimentModel =
        body.template === undefined
            ? await repositories.experiment.create(body)
            : await repositories.experiment.create(body);
    const requestedStatus = body.status;
    await repositories.experiment.save(experimentModel);

    if (requestedStatus === 'booked') await bookExperiment(experimentModel);
    if (requestedStatus === 'running') await runExperiment(experimentModel);
    if (requestedStatus === 'finished') await finishExperiment(experimentModel);

    await authorization.relate(
        authorization.user,
        'owner',
        `experiment:${experimentUrlFromId(experimentModel.uuid)}`,
    );

    await repositories.experiment.save(experimentModel); // NOTE: truly needed?

    logger.log('info', 'Successfully handled POST request on endpoint /experiments');

    return {
        status: 201,
        body: await repositories.experiment.format(experimentModel),
    };
};
