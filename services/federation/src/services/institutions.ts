import { AppDataSource } from "../data_source"
import { Institution } from "../generated/types"
import { InstitutionModel } from "../model"
import { deleteInstitutionsByInstitutionIdSignature, getInstitutionsByInstitutionIdSignature, getInstitutionsSignature, patchInstitutionsByInstitutionIdSignature, postInstitutionsSignature } from "../_types"
import { config } from "../config"

const InstitutionBaseURL=config.BASE_URL+(config.BASE_URL.endsWith('/')?'':'/')+'institutions/'

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


export const getInstitutions: getInstitutionsSignature = async (_parameters, _body, _user) => {
    const InstitutionRepository = AppDataSource.getRepository(InstitutionModel)
    const institutions = await InstitutionRepository.find()
    return {
        status: 200,
        data: institutions.map(formatInstitution)
    }
}

export const postInstitutions: postInstitutionsSignature = async (_parameters, body, _user) => {
    const InstitutionRepository = AppDataSource.getRepository(InstitutionModel)
    const institution = InstitutionRepository.create()
    writeInstitution(institution, body)
    await InstitutionRepository.save(institution)
    return {
        status: 200,
        data: formatInstitution(institution)
    }
}

export const getInstitutionsByInstitutionId: getInstitutionsByInstitutionIdSignature = async (parameters, _body, _user) => {
    const InstitutionRepository = AppDataSource.getRepository(InstitutionModel)
    const institution = await InstitutionRepository.findOneBy({ uuid: parameters.institution_id })
    if (institution == null) {
        return {
            status: 404,
            data: {}
        }
    }
    return {
        status: 200,
        data: formatInstitution(institution)
    }
}

export const patchInstitutionsByInstitutionId: patchInstitutionsByInstitutionIdSignature = async (parameters, body, _user) => {
    const InstitutionRepository = AppDataSource.getRepository(InstitutionModel)
    const institution = await InstitutionRepository.findOneBy({ uuid: parameters.institution_id })
    if (institution == null) {
        return {
            status: 404,
            data: {}
        }
    }
    writeInstitution(institution, body)
    InstitutionRepository.save(institution)
    return {
        status: 200,
        data: formatInstitution(institution)
    }
}

export const deleteInstitutionsByInstitutionId: deleteInstitutionsByInstitutionIdSignature = async (parameters, _body, _user) => {
    const InstitutionRepository = AppDataSource.getRepository(InstitutionModel)
    const result = await InstitutionRepository.softDelete({ uuid: parameters.institution_id })
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