import { AppDataSource } from '../database/dataSource.js';
import { InstitutionModel } from '../database/model.js';
import {
    getInstitutionsSignature,
    postInstitutionsSignature,
    getInstitutionsByInstitutionIdSignature,
    patchInstitutionsByInstitutionIdSignature,
    deleteInstitutionsByInstitutionIdSignature,
} from '../generated/signatures.js';
import { formatInstitution } from '../methods/format.js';
import { institutionUrlFromId } from '../methods/utils.js';
import { writeInstitution } from '../methods/write.js';
import { MissingEntityError, InconsistentDatabaseError } from '@crosslab/service-common';

/**
 * This function implements the functionality for handling GET requests on
 * /institutions endpoint.
 * @param authorization The authorization helper object for the request.
 */
export const getInstitutions: getInstitutionsSignature = async (authorization) => {
    await authorization.check_authorization_or_fail('view', `institution`);

    const institutionRepository = AppDataSource.getRepository(InstitutionModel);
    const institutions = await institutionRepository.find();

    return {
        status: 200,
        body: institutions.map(formatInstitution),
    };
};

/**
 * This function implements the functionality for handling POST requests on
 * /institutions endpoint.
 * @param authorization The authorization helper object for the request.
 * @param body The body of the request.
 */
export const postInstitutions: postInstitutionsSignature = async (
    authorization,
    body,
) => {
    await authorization.check_authorization_or_fail('create', `institution`);

    const institutionRepository = AppDataSource.getRepository(InstitutionModel);
    const institution = institutionRepository.create();
    writeInstitution(institution, body);
    await institutionRepository.save(institution);

    return {
        status: 201,
        body: formatInstitution(institution),
    };
};

/**
 * This function implements the functionality for handling GET requests on
 * /institutions/{institution_id} endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 */
export const getInstitutionsByInstitutionId: getInstitutionsByInstitutionIdSignature =
    async (authorization, parameters) => {
        await authorization.check_authorization_or_fail(
            'view',
            `institution:${institutionUrlFromId(parameters.institution_id)}`,
        );

        const institutionRepository = AppDataSource.getRepository(InstitutionModel);
        const institution = await institutionRepository.findOneBy({
            uuid: parameters.institution_id,
        });
        if (!institution) {
            throw new MissingEntityError(
                `Could not find institution ${parameters.institution_id}`,
                404,
            );
        }

        return {
            status: 200,
            body: formatInstitution(institution),
        };
    };

/**
 * This function implements the functionality for handling PATCH requests on
 * /institutions/{institution_id} endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 */
export const patchInstitutionsByInstitutionId: patchInstitutionsByInstitutionIdSignature =
    async (authorization, parameters, body) => {
        await authorization.check_authorization_or_fail(
            'edit',
            `institution:${institutionUrlFromId(parameters.institution_id)}`,
        );

        const institutionRepository = AppDataSource.getRepository(InstitutionModel);
        const institution = await institutionRepository.findOneBy({
            uuid: parameters.institution_id,
        });
        if (!institution) {
            throw new MissingEntityError(
                `Could not find institution ${parameters.institution_id}`,
                404,
            );
        }
        if (body) writeInstitution(institution, body);
        await institutionRepository.save(institution);

        return {
            status: 200,
            body: formatInstitution(institution),
        };
    };

/**
 * This function implements the functionality for handling DELETE requests on
 * /institutions/{institution_id} endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 */
export const deleteInstitutionsByInstitutionId: deleteInstitutionsByInstitutionIdSignature =
    async (authorization, parameters) => {
        await authorization.check_authorization_or_fail(
            'delete',
            `institution:${institutionUrlFromId(parameters.institution_id)}`,
        );

        const institutionRepository = AppDataSource.getRepository(InstitutionModel);
        const result = await institutionRepository.softDelete({
            uuid: parameters.institution_id,
        });

        if (!result.affected) {
            throw new MissingEntityError(
                `Could not find institution ${parameters.institution_id}`,
                404,
            );
        }

        if (result.affected > 1) {
            throw new InconsistentDatabaseError(
                `More than one institution with id ${parameters.institution_id} deleted`,
                500,
            );
        }

        return {
            status: 204,
        };
    };
