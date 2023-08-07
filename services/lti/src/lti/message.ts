import { Request, Response } from 'express';
import { tool_configuration } from './tool_configuration';
import { ApplicationDataSource } from '../database/datasource';
import { PlatformModel } from '../database/model';
import * as generators from '../helper/generators';
import { nonce_store } from '../helper/nonce';
import {JWTPayload, createRemoteJWKSet, jwtVerify} from 'jose'
import { post_form_message } from '../helper/html_responses';

const platform_repository = ApplicationDataSource.getRepository(PlatformModel)

function handle_deep_linking_request(_req: Request, _res: Response, _payload: JWTPayload) {
    throw new Error('Function not implemented.');
}


async function handle_authentication_response(req:  Request, res: Response){
    res.clearCookie('state', {httpOnly: true, sameSite: 'none', secure: true})
    res.clearCookie('nonce', {httpOnly: true, sameSite: 'none', secure: true})

    if (req.body.state!==req.signedCookies.state){
        throw new Error("state does not match")
    }
    const jwks_url=decodeURIComponent(req.body.state.split(":")[1])
    const jwt=req.body.id_token
    const jwks = createRemoteJWKSet(new URL(jwks_url))
    const {payload} = await jwtVerify(jwt, jwks)
    if (payload.nonce!==req.signedCookies.nonce){
        throw new Error("nonce does not match")
    }
    if (!nonce_store.check(payload.nonce as string)){
        throw new Error("nonce has already been used")
    }



    if (payload['https://purl.imsglobal.org/spec/lti/claim/message_type']==='LtiResourceLinkRequest'){
        res.send(post_form_message("https://api.goldi-labs.de/login?redirect=google.de", {subject:'org.imsglobal.lti.close'}))
    }
    if (payload['"https://purl.imsglobal.org/spec/lti/claim/message_type']==='LtiDeepLinkingRequest'){
        await handle_deep_linking_request(req, res, payload)
    }
    res.send(payload)
}

export async function handle_login_request(req:  Request, res: Response){
    if (req.body.id_token){
        return handle_authentication_response(req, res);
    }
    if (req.body.target_link_uri !== tool_configuration['https://purl.imsglobal.org/spec/lti-tool-configuration'].target_link_uri){
        throw new Error("target_link_uri does not match")
    }

    let platform: PlatformModel
    if (req.body.client_id){
        platform=await platform_repository.findOneByOrFail({iss: req.body.iss, client_id: req.body.client_id})
    }else{
        platform=await platform_repository.findOneByOrFail({iss: req.body.iss})
    }

    const stateParam=generators.random()+":"+encodeURIComponent(platform.jwks_url)
    res.cookie('state', stateParam, {httpOnly: true, signed: true, maxAge: 5*60*1000, sameSite: 'none', secure: true})
    const nonceParam=nonce_store.get()
    res.cookie('nonce', nonceParam, {httpOnly: true, signed: true, maxAge: 5*60*1000, sameSite: 'none', secure: true})

    const queryParams = {
        scope: 'openid',
        response_type: 'id_token',
        client_id: platform.client_id,
        redirect_uri: req.body.target_link_uri,
        login_hint: req.body.login_hint,
        state: stateParam,
        response_mode: 'form_post',
        nonce: nonceParam,
        prompt: 'none',
        lti_message_hint: req.body.lti_message_hint
    }

    const authentication_request_url = platform.authentication_request_url + '?' + new URLSearchParams(queryParams).toString()


    res.setHeader('Location', authentication_request_url)
    res.status(302).send()
}