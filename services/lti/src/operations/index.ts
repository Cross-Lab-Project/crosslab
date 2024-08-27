import * as message from './lti_request.js';
import * as platform from './platform.js';
import * as resource from './resource.js';
import * as student from './resource_student.js';

export default {
  ...platform,
  ...resource,
  ...message,
  ...student,
};
