import fetch from 'node-fetch';
import { AppDataSource } from '../data_source';
import { InstitutionModel } from '../model';

import { deleteProxySignature, getProxySignature, headProxySignature, optionsProxySignature, patchProxySignature, postProxySignature, putProxySignature, traceProxySignature } from "../generated/signatures/proxy"

type proxySignature = 
getProxySignature |
postProxySignature |
patchProxySignature |
deleteProxySignature |
optionsProxySignature |
headProxySignature |
traceProxySignature |
putProxySignature

const proxy: (method: string) => proxySignature = (method: string) => async (parameters, _user) => {
    const basePathMatch=parameters.query.URL.match(/.*?:\/\/.*?(?=\/|$)/gm)

    let headers: HeadersInit={}
    if (basePathMatch){
        const basePath=basePathMatch[0]
        const InstitutionRepository = AppDataSource.getRepository(InstitutionModel)
        const institution = await InstitutionRepository.findOneBy({api: basePath})
        
        if(institution){
            headers["Authorization"]="Bearer " + institution.apiToken
        }
    }
    
    const response = await fetch(parameters.query.URL, { headers, method: method })

    if (response.status < 100 || response.status >= 600) {
        return {
            status: 500,
            body: "Server Error"
        }
    }

    return {
        status: response.status as any, // cast to any to resolve type error, check is done by if-clause above TODO: cleaner solution
        body: await response.text(),
    }
}

export const getProxy = proxy("get")
export const postProxy = proxy("post")
export const patchProxy = proxy("patch")
export const deleteProxy = proxy("delete")
export const optionsProxy = proxy("options")
export const headProxy = proxy("head")
export const traceProxy = proxy("trace")
export const putProxy = proxy("put")