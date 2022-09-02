import { AppDataSource } from '../data_source'
import { InstitutionModel } from '../model'
import {
    deleteInstitutionsByInstitutionIdSignature,
    getInstitutionsByInstitutionIdSignature,
    getInstitutionsSignature,
    patchInstitutionsByInstitutionIdSignature,
    postInstitutionsSignature,
} from '../generated/signatures/institutions'
import { formatInstitution } from '../methods/format'
import { writeInstitution } from '../methods/write'
import { InconsistentDatabaseError, MissingEntityError } from '../types/errors'

/**
 * This function implements the functionality for handling GET requests on /institutions endpoint.
 * @param _user The user submitting the request.
 */
export const getInstitutions: getInstitutionsSignature = async (_user) => {
    const institutionRepository = AppDataSource.getRepository(InstitutionModel)
    const institutions = await institutionRepository.find()
    return {
        status: 200,
        body: institutions.map(formatInstitution),
    }
}

/**
 * This function implements the functionality for handling POST requests on /institutions endpoint.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 */
export const postInstitutions: postInstitutionsSignature = async (body, _user) => {
    const institutionRepository = AppDataSource.getRepository(InstitutionModel)
    const institution = institutionRepository.create()
    writeInstitution(institution, body)
    await institutionRepository.save(institution)
    return {
        status: 201,
        body: formatInstitution(institution),
    }
}

/**
 * This function implements the functionality for handling GET requests on /institutions/{institution_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 */
export const getInstitutionsByInstitutionId: getInstitutionsByInstitutionIdSignature =
    async (parameters, _user) => {
        const institutionRepository = AppDataSource.getRepository(InstitutionModel)
        const institution = await institutionRepository.findOneBy({
            uuid: parameters.institution_id,
        })
        if (!institution) {
            throw new MissingEntityError(
                `Could not find institution ${parameters.institution_id}`,
                404
            )
        }
        return {
            status: 200,
            body: formatInstitution(institution),
        }
    }

/**
 * This function implements the functionality for handling PATCH requests on /institutions/{institution_id} endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 */
export const patchInstitutionsByInstitutionId: patchInstitutionsByInstitutionIdSignature =
    async (parameters, body, _user) => {
        const institutionRepository = AppDataSource.getRepository(InstitutionModel)
        const institution = await institutionRepository.findOneBy({
            uuid: parameters.institution_id,
        })
        if (!institution) {
            throw new MissingEntityError(
                `Could not find institution ${parameters.institution_id}`,
                404
            )
        }
        if (body) writeInstitution(institution, body)
        await institutionRepository.save(institution)
        return {
            status: 200,
            body: formatInstitution(institution),
        }
    }

/**
 * This function implements the functionality for handling DELETE requests on /institutions/{institution_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 */
export const deleteInstitutionsByInstitutionId: deleteInstitutionsByInstitutionIdSignature =
    async (parameters, _user) => {
        const institutionRepository = AppDataSource.getRepository(InstitutionModel)
        const result = await institutionRepository.softDelete({
            uuid: parameters.institution_id,
        })

        if (!result.affected) {
            throw new MissingEntityError(
                `Could not find institution ${parameters.institution_id}`,
                404
            )
        }

        if (result.affected > 1) {
            throw new InconsistentDatabaseError(
                `More than one institution with id ${parameters.institution_id} deleted`,
                500
            )
        }

        return {
            status: 204,
        }
    }
