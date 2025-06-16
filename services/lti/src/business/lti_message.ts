import { RawLtiMessage } from '../lti/message.js';
import { roleMap } from '../lti/util.js';

export class LTIMessage {
  resource_link_id: string;
  user_id: string;
  roles: Set<'instructor' | 'student'>;
  context_memberships_url?: string;

  constructor(public raw: RawLtiMessage) {
    this.resource_link_id =
      raw['https://purl.imsglobal.org/spec/lti/claim/resource_link'].id;
    this.roles = new Set(roleMap(raw['https://purl.imsglobal.org/spec/lti/claim/roles']));
    this.context_memberships_url = raw['https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice']?.context_memberships_url;
    this.user_id = raw.sub;
  }
}
