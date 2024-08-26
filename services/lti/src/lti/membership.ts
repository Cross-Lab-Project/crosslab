
import { PlatformModel } from '../database/model.js';
import { platformFetch } from './message.js';

export type nameServiceClaim = {
  'https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice': {
    context_memberships_url: string;
    service_versions: string[];
  };
};

export function hasNameServiceClaims(obj: unknown): obj is unknown & nameServiceClaim {
  return (
    !!obj &&
    (obj as nameServiceClaim)[
      'https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice'
    ] !== undefined &&
    (obj as nameServiceClaim)[
      'https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice'
    ].context_memberships_url !== undefined &&
    typeof (obj as nameServiceClaim)[
      'https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice'
    ].context_memberships_url === 'string' &&
    (obj as nameServiceClaim)[
      'https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice'
    ].service_versions !== undefined &&
    Array.isArray(
      (obj as nameServiceClaim)[
        'https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice'
      ].service_versions,
    )
  );
}

export async function membership(platform: PlatformModel, claims: unknown) {
  if (!hasNameServiceClaims(claims)) {
    throw new Error('No name service claims');
  }
  const namesServiceUrl =
    claims['https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice']
      .context_memberships_url;

  const res = await platformFetch(namesServiceUrl, {
    headers: { Accept: 'application/vnd.ims.lti-nrps.v2.membershipcontainer+json' },
    platform,
    scopes: ['https://purl.imsglobal.org/spec/lti-nrps/scope/contextmembership.readonly'],
  });

  return res.json();
}
