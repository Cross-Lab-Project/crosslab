import fetch from 'node-fetch';
import { AppDataSource } from '../data_source';
import { InstitutionModel } from '../model';

import { deleteProxySignature, getProxySignature, headProxySignature, optionsProxySignature, patchProxySignature, postProxySignature, putProxySignature, traceProxySignature } from "../_types"

type proxySignature = 
getProxySignature |
postProxySignature |
patchProxySignature |
deleteProxySignature |
optionsProxySignature |
headProxySignature |
traceProxySignature |
putProxySignature

const proxy: proxySignature = async (parameters, _body, _user)=> {
    const basePathMatch=parameters.URL.match(/.*?:\/\/.*?(?=\/|$)/gm)

    let headers: HeadersInit={}
    if (basePathMatch){
        const basePath=basePathMatch[0]
        const InstitutionRepository = AppDataSource.getRepository(InstitutionModel)
        const institution = await InstitutionRepository.findOneBy({api: basePath})
        
        if(institution){
            headers["Authorization"]="Bearer " + institution.apiToken
        }
    }
    
    const response=await fetch(parameters.URL, {headers})
    return {
        status: response.status,
        data: await response.text(),
    }
}

export const getProxy = proxy
export const postProxy = proxy
export const patchProxy = proxy
export const deleteProxy = proxy
export const optionsProxy = proxy
export const headProxy = proxy
export const traceProxy = proxy
export const putProxy = proxy