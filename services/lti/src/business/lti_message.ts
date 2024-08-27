import { RawLtiMessage } from "../lti/message.js";
import { roleMap } from "../lti/util.js";

export class LTIMessage{
  resource_link_id: string;
  roles: Set<"instructor" | "student">;

  constructor(public raw: RawLtiMessage){
    this.resource_link_id = raw['https://purl.imsglobal.org/spec/lti/claim/resource_link'].id;
    this.roles = new Set(roleMap(raw["https://purl.imsglobal.org/spec/lti/claim/roles"]))
  }
}