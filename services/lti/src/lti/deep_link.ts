import { logging } from '@crosslab/service-common';
import { randomBytes } from 'crypto';
import { Request, Response } from 'express';
import { JWTPayload, SignJWT } from 'jose';

import {
  /*authentication,*/
  experiment,
} from '../clients/index.js';
import { kid, privateKey } from '../key_management.js';
import { tool_configuration } from './tool_configuration.js';
import { PlatformModel } from '../database/model.js';

function post_form(url: string, message: object): string {
  return `<form action="${url}" method="post">${Object.entries(message)
    .map(([key, value]) => `<input type="hidden" name="${key}" value="${value}">`)
    .join('')}<button type="submit">Select</button></form>`;
}

export async function handle_deep_linking_request(
  _req: Request,
  res: Response,
  payload: JWTPayload,
  _platform: PlatformModel
) {
  const templates = await experiment.listTemplate();

  const deep_linking_settings =
    (payload['https://purl.imsglobal.org/spec/lti-dl/claim/deep_linking_settings'] as {
      data: unknown;
      deep_link_return_url: string;
    }) ?? {};
  const jwt_fields = {
    aud: payload.iss as string,
    iss: payload.aud as string,
    nonce: randomBytes(32).toString('base64url'),
    'https://purl.imsglobal.org/spec/lti/claim/message_type': 'LtiDeepLinkingResponse',
    'https://purl.imsglobal.org/spec/lti/claim/version': '1.3.0',
    'https://purl.imsglobal.org/spec/lti/claim/deployment_id':
      payload['https://purl.imsglobal.org/spec/lti/claim/deployment_id'],
    'https://purl.imsglobal.org/spec/lti-dl/claim/data': deep_linking_settings.data,
  };
  logging.logger.log('trace', 'response_fields', { response_fields: jwt_fields });
  const return_url = deep_linking_settings.deep_link_return_url;

  const template_jwts = await Promise.all(
    templates.map(template => {
      return new SignJWT({
        ...jwt_fields,
        'https://purl.imsglobal.org/spec/lti-dl/claim/content_items': [
          {
            type: 'ltiResourceLink',
            url: tool_configuration.redirect_uris[0],
            custom: { experiment: template.url },
          },
        ],
      })
        .setProtectedHeader({ alg: 'ES256', kid: kid })
        .setIssuedAt()
        .setExpirationTime('5m')
        .sign(privateKey);
    }),
  );

  res.send(
    '<!DOCTYPE html>' +
      '<html>' +
      '<body>' +
      '<h2>Experiment Selection</h2>' +
      '<p>If you want to add a new Experiment Template, please visit the main homepage.</p>' +
      '<table>' +
      '  <tr align="left">' +
      '    <th>Name</th>' +
      '    <th>Description</th>' +
      '    <th>Selection</th>' +
      '  </tr>' +
      templates
        .map(
          (template, idx) =>
            '  <tr>' +
            `    <td>${template.name}</td>` +
            `    <td>${template.description}</td>` +
            `    <td>${post_form(return_url, {
              JWT: template_jwts[idx],
            })}</td>`,
        )
        .join('\n') +
      '</table>' +
      '</body>' +
      '</html>',
  );
}
