import { LTIPlatform } from '../business/lti_platform.js';
import {
  deleteLtiPlatformByPlatformIdSignature,
  getLtiPlatformByPlatformIdSignature,
  getLtiPlatformSignature,
  patchLtiPlatformByPlatformIdSignature,
  postLtiPlatformSignature,
} from '../generated/signatures.js';
import * as uri from './uris.js';

export const getLtiPlatform: getLtiPlatformSignature = async req => {
  await req.authorization.check_authorization_or_fail('view', 'lti-platform');

  const platforms = await LTIPlatform.list();
  const filtered_platforms = await req.authorization.filter(
    platforms,
    'view',
    p => p.uri,
  );

  return {
    status: 200,
    body: filtered_platforms.map(p => p.toObject()),
  };
};

export const postLtiPlatform: postLtiPlatformSignature = async req => {
  await req.authorization.check_authorization_or_fail('create', 'lti-platform');

  const platform = await LTIPlatform.create(req.authorization.user);
  await req.authorization.relate('owner', platform.uri);

  return {
    status: 201,
    body: platform.toObject(),
    headers: {
      Location: platform.uri,
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
    body: platform.toObject(),
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
    body: platform.toObject(),
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
