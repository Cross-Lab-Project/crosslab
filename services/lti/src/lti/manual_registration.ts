import { Request, Response } from 'express';

import { config } from '../config.js';
import { ApplicationDataSource } from '../database/datasource.js';
import { PlatformModel, PlatformProvisionModel } from '../database/model.js';
import { tool_configuration } from './tool_configuration.js';

export async function handle_manual_registration(_req: Request, res: Response) {
  const settings = [
    { name: 'Tool Name', value: tool_configuration.client_name },
    { name: 'Tool URL', value: config.BASE_URL },
    {
      name: 'Tool Description',
      value:
        tool_configuration['https://purl.imsglobal.org/spec/lti-tool-configuration']
          .description,
    },
    { name: 'LTI Version', value: 'LTI 1.3' },
    { name: 'Public key type', value: 'Keyset URL' },
    { name: 'Public keyset', value: tool_configuration.jwks_uri },
    {
      name: 'Initiate login URL',
      value:
        tool_configuration['https://purl.imsglobal.org/spec/lti-tool-configuration']
          .target_link_uri,
    },
    { name: 'Redirect URL', value: tool_configuration.redirect_uris.join('<br>') },
    { name: 'Supports Deep Linking (Content-Item Message)', value: 'Yes' },
    {
      name: 'Content Selection URL',
      value:
        tool_configuration['https://purl.imsglobal.org/spec/lti-tool-configuration']
          .target_link_uri,
    },
    { name: 'Icon URL', value: tool_configuration.logo_uri },
  ];

  res.send(
    '<!DOCTYPE html>' +
      '<html>' +
      '<body>' +
      '<h2>LTI 1.3 Tool Registration</h2>' +
      '<p>To integrate CrossLab into your Learning Managment System, please enter' +
      ' the following tool configuration in you Learning Mangement system:</p>' +
      '<table>' +
      '  <tr align="left">' +
      '    <th>Property</th>' +
      '    <th>Value</th>' +
      '  </tr>' +
      settings
        .map(
          setting =>
            '<tr><td>' + setting.name + '</td><td>' + setting.value + '</td></tr>',
        )
        .join('\n') +
      '</table>' +
      '<p>After you have entered the above configuration to your Learning Management System,' +
      ' please enter the following Informations to complete the registration process:</p>' +
      '<p>You can leave out any Information you dont have. The tool then will try to match ' +
      'the next request made to the tool and query missing informations if possible.</p>' +
      '<form action="/register" method="post">' +
      '  <label for="iss">Platform ID</label><br>' +
      '  <input type="text" id="iss" name="iss" value=""><br>' +
      '  <label for="client_id">Client ID</label><br>' +
      '  <input type="text" id="client_id" name="client_id" value=""><br>' +
      '  <label for="deployment_id">Deployment ID</label><br>' +
      '  <input type="text" id="deployment_id" name="deployment_id" value=""><br>' +
      '  <label for="jwks_url">Keyset URL</label><br>' +
      '  <input type="text" id="jwks_url" name="jwks_url" value=""><br>' +
      '  <label for="access_token_url">Token URL</label><br>' +
      '  <input type="text" id="access_token_url" name="access_token_url" value=""><br>' +
      '  <label for="authentication_request_url">Authentication URL</label><br>' +
      '  <input type="text" id="authentication_request_url" name="authentication_request_url" value=""><br>' +
      '  <button type="submit">Submit</button>' +
      '</form>' +
      '<p>Alternatively, if your Learning Management Platform supports Dynamic Registration,' +
      ' you may use this url to start the registration process from your Learning Mangement System:</p>' +
      '<code>' +
      config.BASE_URL +
      '</code>' +
      '</body>' +
      '</html>',
  );
}

export async function complete_manual_registration(req: Request, res: Response) {
  const iss = req.body.iss as string;
  const client_id = req.body.client_id as string;
  //const deployment_id = req.body.deployment_id as string;
  const jwks_url = req.body.jwks_url as string;
  const access_token_url = req.body.access_token_url as string;
  const authentication_request_url = req.body.authentication_request_url as string;

  const provisioned =
    !iss || !client_id || !jwks_url || !access_token_url || !authentication_request_url;

  if (provisioned) {
    const platform = ApplicationDataSource.manager.create(PlatformProvisionModel, {
      iss: iss ? iss : undefined,
      client_id: client_id ? client_id : undefined,
      authentication_request_url: authentication_request_url
        ? authentication_request_url
        : undefined,
      access_token_url: access_token_url ? access_token_url : undefined,
      jwks_url: jwks_url ? jwks_url : undefined,
    });
    await ApplicationDataSource.manager.save(platform);

    res.send(
      '<!DOCTYPE html>' +
        '<html>' +
        '<body>' +
        '  <h2>Platform is set to be provisioned on the next request.</h2>' +
        '  <p>Registration will be completet once the request was made. You may now close this window.</p>' +
        '</body>' +
        '</html>',
    );
  } else {
    const platform = ApplicationDataSource.manager.create(PlatformModel, {
      iss,
      client_id,
      authentication_request_url,
      access_token_url,
      jwks_url,
    });
    await ApplicationDataSource.manager.save(platform);

    res.send(
      '<!DOCTYPE html>' +
        '<html>' +
        '<body>' +
        '  <h2>Registration completed</h2>' +
        '  <p>Registration completed successfully. You may now close this window.</p>' +
        '</body>' +
        '</html>',
    );
  }
}
