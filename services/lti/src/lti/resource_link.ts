import { HttpError, logging } from '@crosslab/service-common';
import { randomBytes } from 'crypto';
import { Request, Response } from 'express';
import { JWTPayload } from 'jose';

import { Client as ExperimentClient } from '../clients/experiment/client.js';
import { authentication, experiment } from '../clients/index.js';
import { config } from '../config.js';
import { PlatformModel } from '../database/model.js';
import { post_form_message } from '../helper/html_responses.js';

export async function handle_resource_link_request(
  _req: Request,
  res: Response,
  payload: JWTPayload,
  platform: PlatformModel,
) {
  const custom = payload['https://purl.imsglobal.org/spec/lti/claim/custom'];
  const template_url =
    typeof custom === 'object' &&
    custom !== null &&
    'experiment' in custom &&
    typeof custom['experiment'] === 'string'
      ? custom.experiment
      : undefined;

  const ags = payload['https://purl.imsglobal.org/spec/lti-ags/claim/endpoint'];
  const lineitem =
    typeof ags === 'object' && ags !== null && 'lineitem' in ags
      ? ags.lineitem
      : undefined;

  if (!template_url) {
    throw new HttpError(400, 'no experiment specified');
  }

  const template = await experiment.getTemplate(template_url);

  const username = `LTI-${platform.iss}-${payload.sub}`;
  const users = await authentication.listUsers({ username });
  let user_url: string;
  if (users.length === 0) {
    const user = await authentication.createUser({
      username,
      password: randomBytes(32).toString('base64url'),
    });
    user_url = user.url;
  } else {
    user_url = users[0].url;
  }
  const token = await authentication.createToken({ user: user_url });

  const experimentClient = new ExperimentClient(config.API_BASE_URL, {
    accessToken: token,
  });

  const exp = await experimentClient.createExperiment(
    {
      ...template.configuration,
      status: 'running',
      lti_platform_reference: lineitem && {
        iss: platform.iss,
        client_id: platform.client_id,
        lineitem,
        userId: payload.sub as string,
      },
    },
    {
      changedURL: new URL('/grading', config.BASE_URL).toString(),
    },
  );
  //await experiment.updateExperiment( // Times out ;(
  //  exp.url,
  //  {},
  //  { changedURL: new URL('/grading', config.BASE_URL).toString() },
  //);

  const instances: {
    codeUrl: string;
    instanceUrl: string;
    deviceToken: string;
  }[] = [];
  for (const device of exp.instantiatedDevices ?? []) {
    if (device.url && device.token && device.codeUrl) {
      instances.push({
        codeUrl: device.codeUrl,
        instanceUrl: device.url,
        deviceToken: device.token,
      });
    }
  }

  const response = `<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0">
    <style>
      html, body, iframe {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    </style>
</head>
<body>
  ${instances
    .map(
      i =>
        `<iframe src="${i.codeUrl}?instanceUrl=${i.instanceUrl}&deviceToken=${i.deviceToken}"></iframe>`,
    )
    .join('\n')}
</body>
</html>`;

  res.send(response);
}
