import { CookieOptions, Request, Response } from 'express';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import fetch from 'node-fetch';

import '../clients/index.js';
import { ApplicationDataSource } from '../database/datasource.js';
import { PlatformModel, PlatformProvisionModel } from '../database/model.js';
import * as generators from '../helper/generators.js';
import { nonce_store } from '../helper/nonce.js';
import { handle_deep_linking_request } from './deep_link.js';
import { handle_resource_link_request } from './resource_link.js';
import { tool_configuration } from './tool_configuration.js';

async function handle_authentication_response(req: Request, res: Response) {
  res.clearCookie('state', { httpOnly: true, sameSite: 'none', secure: true });
  res.clearCookie('nonce', { httpOnly: true, sameSite: 'none', secure: true });

  if (req.body.state !== req.signedCookies.state) {
    throw new Error('state does not match');
  }
  const [_, encoded_iss, encoded_client_id] = req.body.state.split(':');
  const iss = decodeURIComponent(encoded_iss);
  const client_id = decodeURIComponent(encoded_client_id);
  const platform = await ApplicationDataSource.manager.findOneByOrFail(PlatformModel, {
    iss: iss,
    client_id: client_id,
  });
  const jwks_url = platform.jwks_url;
  const jwt = req.body.id_token;
  const jwks = createRemoteJWKSet(new URL(jwks_url));
  const { payload } = await jwtVerify(jwt, jwks);
  if (payload.nonce !== req.signedCookies.nonce) {
    throw new Error('nonce does not match');
  }
  if (!nonce_store.check(payload.nonce as string)) {
    throw new Error('nonce has already been used');
  }

  const message_type = payload['https://purl.imsglobal.org/spec/lti/claim/message_type'];

  switch (message_type) {
    case 'LtiResourceLinkRequest':
      await handle_resource_link_request(req, res, payload, platform);
      break;
    case 'LtiDeepLinkingRequest':
      await handle_deep_linking_request(req, res, payload, platform);
      break;
    default:
      res.send(payload);
  }
}

export async function handle_login_request(req: Request, res: Response) {
  if (req.body.id_token) {
    return await handle_authentication_response(req, res);
  }
  if (
    req.body.target_link_uri !==
    tool_configuration['https://purl.imsglobal.org/spec/lti-tool-configuration']
      .target_link_uri
  ) {
    throw new Error(
      `target_link_uri does not match: ` +
        `expected ${tool_configuration['https://purl.imsglobal.org/spec/lti-tool-configuration'].target_link_uri}, got ${req.body.target_link_uri}`,
    );
  }

  let platform: PlatformModel | undefined = undefined;
  try {
    platform = await ApplicationDataSource.manager.findOneByOrFail(PlatformModel, {
      iss: req.body.iss,
      client_id: req.body.client_id,
    });
  } catch (e) {
    const _platform = await ApplicationDataSource.manager
      .getRepository(PlatformProvisionModel)
      .createQueryBuilder()
      .where(
        '(PlatformProvisionModel.iss = :iss OR PlatformProvisionModel.iss IS NULL) ' +
          'AND (PlatformProvisionModel.client_id = :client_id OR PlatformProvisionModel.client_id IS NULL)',
        {
          iss: req.body.iss,
          client_id: req.body.client_id,
        },
      )
      .getOneOrFail();
    console.log(_platform);
    await ApplicationDataSource.manager.delete(PlatformProvisionModel, _platform.id);

    // check possilbe urls:
    const possible_urls = [
      {
        authentication_request_url: req.body.iss + '/mod/lti/auth.php',
        access_token_url: req.body.iss + '/mod/lti/token.php',
        jwks_url: req.body.iss + '/mod/lti/certs.php',
      },
    ];

    for (const urls of possible_urls) {
      const auth_result = await fetch(urls.authentication_request_url);
      const token_result = await fetch(urls.access_token_url);
      const jwks_result = await fetch(urls.jwks_url);

      if (
        [200, 400].includes(auth_result.status) &&
        [200, 400].includes(token_result.status) &&
        [200].includes(jwks_result.status)
      ) {
        platform = ApplicationDataSource.manager.create(PlatformModel, {
          iss: _platform.iss ?? req.body.iss,
          client_id: _platform.client_id ?? req.body.client_id,
          authentication_request_url:
            _platform.authentication_request_url ?? urls.authentication_request_url,
          access_token_url: _platform.access_token_url ?? urls.access_token_url,
          jwks_url: _platform.jwks_url ?? urls.jwks_url,
        });
        await ApplicationDataSource.manager.save(platform);
      }
    }

    if (platform === undefined) {
      throw new Error('platform not found');
    }
  }

  const stateParam =
    generators.random() +
    ':' +
    encodeURIComponent(platform.iss) +
    ':' +
    encodeURIComponent(platform.client_id ?? '');
  res.cookie('state', stateParam, {
    httpOnly: true,
    signed: true,
    maxAge: 5 * 60 * 1000,
    sameSite: 'none',
    secure: true,
    partitioned: true,
  } as CookieOptions);
  const nonceParam = nonce_store.get();
  res.cookie('nonce', nonceParam, {
    httpOnly: true,
    signed: true,
    maxAge: 5 * 60 * 1000,
    sameSite: 'none',
    secure: true,
    partitioned: true,
  } as CookieOptions);

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
    lti_message_hint: req.body.lti_message_hint,
  };

  const authentication_request_url =
    platform.authentication_request_url +
    '?' +
    new URLSearchParams(queryParams).toString();

  res.setHeader('Location', authentication_request_url);
  res.status(302).send();
}
