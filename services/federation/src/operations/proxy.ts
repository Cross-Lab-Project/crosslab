import fetch from 'node-fetch'
import { AppDataSource } from '../data_source'
import { InstitutionModel } from '../model'

import {
    deleteProxySignature,
    getProxySignature,
    headProxySignature,
    optionsProxySignature,
    patchProxySignature,
    postProxySignature,
    putProxySignature,
    traceProxySignature,
} from '../generated/signatures/proxy'
import { MissingParameterError } from '../generated/types'
import { InvalidValueError } from '../types/errors'

type proxySignature =
    | getProxySignature
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
const proxy: (method: string) => proxySignature =
    (method: string) => async (parameters, body, _user) => {
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
