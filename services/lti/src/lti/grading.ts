import { randomBytes } from 'crypto';
import { SignJWT } from 'jose';
import fetch from 'node-fetch';

import { ApplicationDataSource } from '../database/datasource.js';
import { PlatformModel } from '../database/model.js';
import { kid, privateKey } from '../key_management.js';

export async function grading({
  iss,
  client_id,
  grade,
  userId,
  lineitem,
}: {
  iss: string;
  client_id: string;
  lineitem: string;
  grade: number;
  userId: string;
}) {
  const platform = await ApplicationDataSource.manager.findOneOrFail(PlatformModel, {
    where: { iss, client_id },
  });

  console.log(platform);

  const jwt_fields = {
    iss: platform.client_id,
    aud: platform.iss,
    sub: platform.client_id,
    jti: randomBytes(32).toString('base64url'),
  };

  const jwt = await new SignJWT(jwt_fields)
    .setProtectedHeader({ alg: 'ES256', kid: kid })
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(privateKey);

  console.log(jwt);

  const result = await fetch(platform.access_token_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion: jwt,
      scope: [
        'https://purl.imsglobal.org/spec/lti-ags/scope/lineitem',
        'https://purl.imsglobal.org/spec/lti-ags/scope/lineitem.readonly',
        'https://purl.imsglobal.org/spec/lti-ags/scope/result.readonly',
        'https://purl.imsglobal.org/spec/lti-ags/scope/score',
      ].join(' '),
    }),
  });

  const access_token = (await result.json()) as {
    access_token: string;
    token_type: string;
    expires_in: number;
  };
  console.log(access_token);

  const grade_url = new URL(lineitem);
  grade_url.pathname = grade_url.pathname + '/scores';

  const res = await fetch(grade_url, {
    method: 'POST',
    headers: {
      Authorization: access_token.token_type + ' ' + access_token.access_token,
      'Content-Type': 'application/vnd.ims.lis.v1.score+json',
    },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      scoreGiven: grade,
      scoreMaximum: 100,
      activityProgress: 'Completed',
      gradingProgress: 'FullyGraded',
      userId: userId,
    }),
  });

  //const res = await fetch(lineitems_url, {method: 'GET', headers: {Authorization: access_token.token_type + ' ' + access_token.access_token}});
  return `${res.status}: ${await res.text()}`;
}
