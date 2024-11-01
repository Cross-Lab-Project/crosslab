import { utils } from '@crosslab/service-common';
import { LTIPlatform } from '../business/lti_platform.js';
import {
  deleteLtiPlatformByPlatformIdSignature,
  getLtiPlatformByPlatformIdSignature,
  getLtiPlatformSignature,
  patchLtiPlatformByPlatformIdSignature,
  postLtiPlatformSignature,
} from '../generated/signatures.js';
import * as uri from './uris.js';

import { Platform as PlatformObject } from '../generated/types.js';
function platform_to_wire(platform: LTIPlatform): PlatformObject<'response'> {
  return utils.removeNullOrUndefined({
    uri: uri.generate_platform(platform),
    issuer: platform.platform_model.iss,
    client_id: platform.platform_model.client_id,
    deployment_id: platform.platform_model.deployment_id,
    registration: {
      state: platform.platform_model.registrated ? 'complete' : 'pending',
    },
    jwks_uri: uri.generate_platform_jwks(platform),
    login_uri: uri.generate_platform_login(platform),
    launch_uri: uri.generate_platform_launch(platform),
  });
}

export const getLtiPlatform: getLtiPlatformSignature = async req => {
  await req.authorization.check_authorization_or_fail('view', 'lti-platform');

  const platforms = await LTIPlatform.list();
  const filtered_platforms = await req.authorization.filter(
    platforms,
    'view',
    uri.generate_platform,
  );

  return {
    status: 200,
    body: filtered_platforms.map(platform_to_wire),
  };
};

export const postLtiPlatform: postLtiPlatformSignature = async req => {
  await req.authorization.check_authorization_or_fail('create', 'lti-platform');

  const platform = await LTIPlatform.create(req.authorization.user);
  await req.authorization.relate('owner', uri.generate_platform(platform));

  return {
    status: 201,
    body: platform_to_wire(platform),
    headers: {
      Location: uri.generate_platform(platform),
    },
  };
};

export const getLtiPlatformByPlatformId: getLtiPlatformByPlatformIdSignature = async (
  req,
  parameters,
) => {
  await req.authorization.check_authorization_or_fail(
    'view',
    uri.generate_platform(parameters),
  );

  const platform = await LTIPlatform.byId(parameters);
  return {
    status: 200,
    body: platform_to_wire(platform),
  };
};

export const patchLtiPlatformByPlatformId: patchLtiPlatformByPlatformIdSignature = async (
  req,
  parameters,
) => {
  await req.authorization.check_authorization_or_fail(
    'edit',
    uri.generate_platform(parameters),
  );

  const platform = await LTIPlatform.byId(parameters);
  return {
    status: 200,
    body: platform_to_wire(platform),
  };
};

export const deleteLtiPlatformByPlatformId: deleteLtiPlatformByPlatformIdSignature =
  async (req, parameters) => {
    await req.authorization.check_authorization_or_fail(
      'delete',
      uri.generate_platform(parameters),
    );

    const platform = await LTIPlatform.byId(parameters);
    await platform.delete();
    return { status: 204 };
  };
