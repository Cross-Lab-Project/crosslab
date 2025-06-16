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

export type ResourceMember = {
  user_id: string;
  name?: string;
  given_name?: string;
  family_name?: string;
};

function isResourceMember(obj: unknown): obj is ResourceMember {
  return (
    !!obj &&
    (obj as ResourceMember).user_id !== undefined &&
    typeof (obj as ResourceMember).user_id === 'string' &&
    ((obj as ResourceMember).name === undefined ||
      typeof (obj as ResourceMember).name === 'string') &&
    ((obj as ResourceMember).given_name === undefined ||
      typeof (obj as ResourceMember).given_name === 'string') &&
    ((obj as ResourceMember).family_name === undefined ||
      typeof (obj as ResourceMember).family_name === 'string')
  );
}

function isResourceMemberResponse(obj: unknown): obj is { members: ResourceMember[] } {
  return (
    !!obj &&
    (obj as { members: unknown }).members !== undefined &&
    Array.isArray((obj as { members: unknown }).members) &&
    (obj as { members: unknown[] }).members.every(isResourceMember)
  );
}

export async function membership(
  platform: { client_id?: string; iss?: string; access_token_url?: string },
  namesServiceUrl: string,
) {
  const res = await platformFetch(namesServiceUrl, {
    headers: { Accept: 'application/vnd.ims.lti-nrps.v2.membershipcontainer+json' },
    platform,
    scopes: ['https://purl.imsglobal.org/spec/lti-nrps/scope/contextmembership.readonly'],
  });

  const raw = await res.json();
  if (!isResourceMemberResponse(raw)) {
    throw new Error('Invalid response');
  }

  return raw.members;
}
