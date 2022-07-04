import { AppDataSource } from "../data_source"
import { Institution } from "../generated/types"
import { InstitutionModel } from "../model"
import { deleteInstitutionsByInstitutionIdSignature, getInstitutionsByInstitutionIdSignature, getInstitutionsSignature, patchInstitutionsByInstitutionIdSignature, postInstitutionsSignature } from "../generated/signatures/institutions"
import { config } from "../config"

const InstitutionBaseURL = config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + 'institutions/'

function formatInstitution(i: InstitutionModel){
    return { name: i.name, api: i.api, url: InstitutionBaseURL+i.uuid }
}

function writeInstitution(institution: InstitutionModel, object: Partial<Institution>) {
    if (object.name)
        institution.name = object.name
    if (object.api)
        institution.api = object.api
    if (object.apiToken)
        institution.apiToken = object.apiToken
}


export const getInstitutions: getInstitutionsSignature = async (_user) => {
    const InstitutionRepository = AppDataSource.getRepository(InstitutionModel)
    const institutions = await InstitutionRepository.find()
    return {
        status: 200,
        body: institutions.map(formatInstitution)
    }
}

export const postInstitutions: postInstitutionsSignature = async (body, _user) => {
    const InstitutionRepository = AppDataSource.getRepository(InstitutionModel)
    const institution = InstitutionRepository.create()
    writeInstitution(institution, body)
    await InstitutionRepository.save(institution)
    return {
        status: 201,
        body: formatInstitution(institution)
    }
}

export const getInstitutionsByInstitutionId: getInstitutionsByInstitutionIdSignature = async (parameters, _user) => {
    const InstitutionRepository = AppDataSource.getRepository(InstitutionModel)
    const institution = await InstitutionRepository.findOneBy({ uuid: parameters.path.institution_id })
    if (institution == null) {
        return {
            status: 404
        }
    }
    return {
        status: 200,
        body: formatInstitution(institution)
    }
}

export const patchInstitutionsByInstitutionId: patchInstitutionsByInstitutionIdSignature = async (parameters, body, _user) => {
    const InstitutionRepository = AppDataSource.getRepository(InstitutionModel)
    const institution = await InstitutionRepository.findOneBy({ uuid: parameters.path.institution_id })
    if (institution == null) {
        return {
            status: 404
        }
    }
    writeInstitution(institution, body)
    InstitutionRepository.save(institution)
    return {
        status: 200,
        body: formatInstitution(institution)
    }
}

export const deleteInstitutionsByInstitutionId: deleteInstitutionsByInstitutionIdSignature = async (parameters, _user) => {
    const InstitutionRepository = AppDataSource.getRepository(InstitutionModel)
    const result = await InstitutionRepository.softDelete({ uuid: parameters.path.institution_id })
    if (result.affected == 0) {
        return {
            status: 404
        }
    }
    //if (result.affected > 1) {
        // CRITICAL ERROR
    //}
    return {
        status: 204,
    }
}