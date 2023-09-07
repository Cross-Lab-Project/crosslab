import { Request, Response } from 'express';
import assert from 'node:assert';
import fetch from 'node-fetch';
import { tool_configuration } from './tool_configuration.js';
import { ApplicationDataSource } from '../database/datasource.js';
import { PlatformModel } from '../database/model.js';
import { cross_document_message } from '../helper/html_responses.js';

const platform_repository = ApplicationDataSource.getRepository(PlatformModel)

export async function handle_dynamic_registration_initiation_request(req:  Request, res: Response){
    const openid_configuration_url = req.query.openid_configuration as string;
    const registration_token = req.query.registration_token as string | undefined;

    assert(openid_configuration_url, "openid_configuration_url is required")
    const openid_configuration = await fetch(openid_configuration_url).then(res => res.json()) as any

    const registration = {
        application_type: 'web',
        response_types: ['id_token'],
        grant_types: ['implicit', 'client_credentials'],
        token_endpoint_auth_method: 'private_key_jwt',
        ...tool_configuration
    };

    const registration_response=await fetch(openid_configuration.registration_endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${registration_token}`
        },
        body: JSON.stringify(registration)
    });

    if (registration_response.status!=200){
        throw new Error(`Registration failed with status ${registration_response.status}: ${await registration_response.text()}`)
    }

    const parsed_registration_response = await registration_response.json() as any

    const platform=platform_repository.create({
        iss: openid_configuration.issuer,
        client_id: parsed_registration_response.client_id,
        authentication_request_url: openid_configuration.authorization_endpoint,
        access_token_url: openid_configuration.token_endpoint,
        jwks_url: openid_configuration.jwks_uri
    })
    await platform_repository.save(platform)

    res.send(cross_document_message({subject:'org.imsglobal.lti.close'}))
}