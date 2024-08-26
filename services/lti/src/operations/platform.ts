import { logger } from '@crosslab/service-common';
import {
  deleteLtiPlatformByPlatformIdSignature,
  getLtiPlatformByPlatformIdSignature,
  getLtiPlatformSignature,
  patchLtiPlatformByPlatformIdSignature,
  postLtiPlatformSignature
} from '../generated/signatures.js';
import { createNewPlatform, getPlatformById, listPlatforms } from '../lti/platform.js';

export const getLtiPlatform: getLtiPlatformSignature = async req => {
    logger.info(req.authorization.user)
  await req.authorization.check_authorization_or_fail('view', 'lti-platform');
  const platforms = await listPlatforms();
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
  const platform = await createNewPlatform(req.authorization.user);
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
  const platform = await getPlatformById(parameters.platform_id);
  await req.authorization.check_authorization_or_fail('view', platform.uri);
  return {
    status: 200,
    body: platform.toObject(),
  };
};

export const patchLtiPlatformByPlatformId: patchLtiPlatformByPlatformIdSignature = async (
  req,
  parameters,
) => {
  const platform = await getPlatformById(parameters.platform_id);
  await req.authorization.check_authorization_or_fail('edit', platform.uri);
  return {
    status: 200,
    body: platform.toObject(),
  };
};

export const deleteLtiPlatformByPlatformId: deleteLtiPlatformByPlatformIdSignature =
  async (req, parameters) => {
    const platform = await getPlatformById(parameters.platform_id);
    await req.authorization.check_authorization_or_fail('delete', platform.uri);
    await platform.delete();
    return { status: 204 };
  };
