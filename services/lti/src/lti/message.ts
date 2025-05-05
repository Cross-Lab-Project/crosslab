import { JWTPayload, SignJWT, createRemoteJWKSet, jwtVerify } from 'jose';
import fetch, { RequestInfo, RequestInit } from 'node-fetch';

import { kid, privateKey } from '../business/key_management.js';
import '../clients/index.js';
import { ApplicationDataSource } from '../database/datasource.js';
import { LtiMessageModel, PlatformModel } from '../database/model.js';
import { random } from '../helper/generators.js';

//import { tool_configuration } from './tool_configuration.js';

export type RawLtiMessage = {
  'sub': string;
  'https://purl.imsglobal.org/spec/lti/claim/message_type': string;
  'https://purl.imsglobal.org/spec/lti/claim/roles': string[];
  'https://purl.imsglobal.org/spec/lti/claim/resource_link': { id: string };
  "https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice"?: {
    "context_memberships_url": string,
    "service_versions": string[],
  }
  "https://purl.imsglobal.org/spec/lti-ags/claim/endpoint"?: {
    "scope": string[],
    "lineitems": string,
    "lineitem": string
  },
};

function isRawLtiMessage(message: JWTPayload): message is RawLtiMessage {
  if (typeof message.sub !== 'string') {
    return false;
  }
  if (
    typeof message['https://purl.imsglobal.org/spec/lti/claim/message_type'] !== 'string'
  ) {
    return false;
  }

  if (!Array.isArray(message['https://purl.imsglobal.org/spec/lti/claim/roles'])) {
    return false;
  }
  if (
    !message['https://purl.imsglobal.org/spec/lti/claim/roles'].every(
      role => typeof role === 'string',
    )
  ) {
    return false;
  }
  if (
    typeof message['https://purl.imsglobal.org/spec/lti/claim/resource_link'] !==
      'object' ||
    message['https://purl.imsglobal.org/spec/lti/claim/resource_link'] === null ||
    typeof (
      message['https://purl.imsglobal.org/spec/lti/claim/resource_link'] as {
        id: unknown;
      }
    ).id !== 'string'
  ) {
    return false;
  }
  if (message['https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice']){
    if (
      typeof message['https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice'] !== 'object' ||
      message['https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice'] === null ||
      typeof (
        message['https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice'] as {
          context_memberships_url: unknown;
          service_versions: unknown;
        }
      ).context_memberships_url !== 'string' ||
      !Array.isArray((message['https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice'] as {
        context_memberships_url: string;
        service_versions: string[];
      }).service_versions) ||
      !(message['https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice'] as {
        context_memberships_url: string;
        service_versions: string[];
      }).service_versions.every(version => typeof version === 'string')
    ) {
      return false;
    }
  }
  if (message['https://purl.imsglobal.org/spec/lti-ags/claim/endpoint']){
    if (
      typeof message['https://purl.imsglobal.org/spec/lti-ags/claim/endpoint'] !== 'object' ||
      message['https://purl.imsglobal.org/spec/lti-ags/claim/endpoint'] === null ||
      typeof (
        message['https://purl.imsglobal.org/spec/lti-ags/claim/endpoint'] as {
          scope: unknown;
          lineitems: unknown;
          lineitem: unknown;
        }
      ).lineitems !== 'string' ||
      typeof (
        message['https://purl.imsglobal.org/spec/lti-ags/claim/endpoint'] as {
          scope: unknown;
          lineitems: unknown;
          lineitem: unknown;
        }
      ).lineitem !== 'string' ||
      !Array.isArray((message['https://purl.imsglobal.org/spec/lti-ags/claim/endpoint'] as {
        scope: string[];
        lineitems: string;
        lineitem: string;
      }).scope) ||
      !(message['https://purl.imsglobal.org/spec/lti-ags/claim/endpoint'] as {
        scope: string[];
        lineitems: string;
        lineitem: string;
      }).scope.every(scope => typeof scope === 'string')
    ) {
      return false;
    }
  }

  return true;
}

export async function handle_login_request(
  params: { target_link_uri: string; login_hint: string; lti_message_hint: string },
  platform: PlatformModel,
) {
  //if (
  //  params.target_link_uri !==
  //  tool_configuration['https://purl.imsglobal.org/spec/lti-tool-configuration']
  //    .target_link_uri
  //) {
  //  throw new Error(
  //    `target_link_uri does not match: ` +
  //      `expected ${tool_configuration['https://purl.imsglobal.org/spec/lti-tool-configuration'].target_link_uri}, got ${params.target_link_uri}`,
  //  );
  //}

  const nonceParam = random();
  const message = ApplicationDataSource.manager.create(LtiMessageModel, {
    nonce: nonceParam,
    platform: platform,
  });
  await ApplicationDataSource.manager.save(message);
  const stateParam = message.id;
  const queryParams = {
    scope: 'openid',
    response_type: 'id_token',
    client_id: platform.client_id!,
    redirect_uri: params.target_link_uri,
    login_hint: params.login_hint,
    state: stateParam,
    response_mode: 'form_post',
    nonce: nonceParam,
    prompt: 'none',
    lti_message_hint: params.lti_message_hint,
    lti_deployment_id: platform.deployment_id!,
  };

  const authentication_request_url =
    platform.authentication_request_url +
    '?' +
    new URLSearchParams(queryParams).toString();

  return authentication_request_url;
}

async function getPlatfromAccessToken(
  platform: { client_id?: string; iss?: string; access_token_url?: string },
  scopes: string[],
) {
  if (!platform.client_id) {
    throw new Error('client_id is not set');
  }
  if (!platform.iss) {
    throw new Error('iss is not set');
  }
  if (!platform.access_token_url) {
    throw new Error('access_token_url is not set');
  }

  const jwt_fields = {
    iss: platform.client_id,
    aud: platform.iss,
    sub: platform.client_id,
    jti: random(),
  };

  const jwt = await new SignJWT(jwt_fields)
    .setProtectedHeader({ alg: 'ES256', kid: kid })
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(privateKey);

  const result = await fetch(platform.access_token_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion: jwt,
      scope: scopes.join(' '),
    }),
  });

  return (await result.json()) as {
    access_token: string;
    token_type: string;
    expires_in: number;
  };
}

export async function platformFetch(
  url: URL | RequestInfo,
  init: RequestInit & {
    platform: { client_id?: string; iss?: string; access_token_url?: string };
    scopes: string[];
  },
) {
  const { platform, scopes, ..._init } = init;
  const access_token = await getPlatfromAccessToken(platform, scopes);

  return await fetch(url, {
    ..._init,
    headers: {
      Authorization: access_token.token_type + ' ' + access_token.access_token,
      ...(_init?.headers ?? []),
    },
  });
}

export async function verifyMessage(id_token: string, nonce: string, jwks_url?: string) {
  if (!jwks_url) {
    throw new Error('jwks_url is not set');
  }

  const jwks = createRemoteJWKSet(new URL(jwks_url));
  const { payload } = await jwtVerify(id_token, jwks);
  if (payload.nonce !== nonce) {
    throw new Error('nonce does not match');
  }

  if (!isRawLtiMessage(payload)) {
    throw new Error('Malformed LTI Message');
  }

  return payload;
}
