import * as message from './lti_request.js';
import * as platform from './platform.js';
import * as resource from './resource.js';
export default {
  ...platform,
  ...resource,
  ...message
};
