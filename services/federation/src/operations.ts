import { MissingEntityError, InconsistentDatabaseError, InvalidValueError, MissingParameterError } from "@crosslab/service-common"
import fetch, { HeadersInit } from "node-fetch"
import { AppDataSource } from "./data_source"
import { getInstitutionsSignature, postInstitutionsSignature, getInstitutionsByInstitutionIdSignature, patchInstitutionsByInstitutionIdSignature, deleteInstitutionsByInstitutionIdSignature, deleteProxySignature, getProxySignature, headProxySignature, optionsProxySignature, patchProxySignature, postProxySignature, putProxySignature, traceProxySignature } from "./generated/signatures"
import { formatInstitution } from "./methods/format"
import { writeInstitution } from "./methods/write"
import { InstitutionModel } from "./model"

type HttpMethod = "get" | "post" | "patch" | "delete" | "options" | "head" | "trace" | "put"
type proxySignature = getProxySignature
    | postProxySignature
    | patchProxySignature
    | deleteProxySignature
    | optionsProxySignature
    | headProxySignature
    | traceProxySignature
    | putProxySignature

/**
 * This function implements the functionality for handling $method requests on /proxy endpoint.
 * @param method The http method to be used.
 */
const proxy: (method: HttpMethod) => proxySignature =
    (method: HttpMethod) => async (parameters, body, _user) => {
        if (!parameters.URL) throw new MissingParameterError(`Missing URL Parameter`, 400)

        const basePathMatch = parameters.URL.match(/.*?:\/\/.*?(?=\/|$)/gm)

        let headers: HeadersInit = { 'Content-Type': 'application/json' }
        if (basePathMatch) {
            const basePath = basePathMatch[0]
            const InstitutionRepository = AppDataSource.getRepository(InstitutionModel)
            const institution = await InstitutionRepository.findOneBy({ api: basePath })

            if (institution) {
                headers['Authorization'] = 'Bearer ' + institution.apiToken
            }
        }

        const response = await fetch(parameters.URL, {
            headers,
            method: method,
            body: Object.keys(body).length > 0 ? body : undefined,
        })

        if (response.status < 100 || response.status >= 600) {
            throw new InvalidValueError(
                `Response has invalid status of ${response.status}`,
                500
            ) // TODO: maybe find better error
        }

        try {
            const text = await response.text()

            return {
                status: response.status as any, // cast to any to resolve type error, check is done by if-clause above TODO: cleaner solution
                body: text,
            }
        } catch (error) {
            console.log(error)

            return {
                status: response.status as any, // cast to any to resolve type error, check is done by if-clause above TODO: cleaner solution
                body: undefined,
            }
        }
    }

export const getProxy = proxy('get')
export const postProxy = proxy('post')
export const patchProxy = proxy('patch')
export const deleteProxy = proxy('delete')
export const optionsProxy = proxy('options')
export const headProxy = proxy('head')
export const traceProxy = proxy('trace')
export const putProxy = proxy('put')

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