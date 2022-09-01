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

/**
 * This function implements the functionality for handling GET requests on /institutions endpoint.
 * @param _user The user submitting the request.
 */
export const getInstitutions: getInstitutionsSignature = async (_user) => {
    const InstitutionRepository = AppDataSource.getRepository(InstitutionModel)
    const institutions = await InstitutionRepository.find()
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
    const InstitutionRepository = AppDataSource.getRepository(InstitutionModel)
    const institution = InstitutionRepository.create()
    writeInstitution(institution, body)
    await InstitutionRepository.save(institution)
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
        const InstitutionRepository = AppDataSource.getRepository(InstitutionModel)
        const institution = await InstitutionRepository.findOneBy({
            uuid: parameters.institution_id,
        })
        if (institution == null) {
            return {
                status: 404,
            }
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
        const InstitutionRepository = AppDataSource.getRepository(InstitutionModel)
        const institution = await InstitutionRepository.findOneBy({
            uuid: parameters.institution_id,
        })
        if (institution == null) {
            return {
                status: 404,
            }
        }
        if (body) writeInstitution(institution, body)
        InstitutionRepository.save(institution)
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
        const InstitutionRepository = AppDataSource.getRepository(InstitutionModel)
        const result = await InstitutionRepository.softDelete({
            uuid: parameters.institution_id,
        })

        if (!result.affected) {
            return {
                status: 404,
            }
        }

        if (result.affected > 1) {
            // TBD
        }

        return {
            status: 204,
        }
    }
