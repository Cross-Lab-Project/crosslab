import { config } from '../config.js';

const base = `${config.API_BASE_URL}/lti`;
function parse(template: string, uri: string) {
  const match = uri.match(template);
  if (!match) {
    throw new Error('Invalid resource uri');
  }
  return match;
}

export const generate_platform = (id: { platform_id: string }) => {
  return base + `/platform/${id.platform_id}`;
};
export const parse_platform = (uri: string) => {
  const match = parse(`${base}/platform/(.*)`, uri);
  return { platform_id: match[1] };
}

export const generate_resource = (id: { resource_id: string }) => {
  return base + `/resource/${id.resource_id}`;
};
export const parse_resource = (uri: string) => {
  const match = parse(`${base}/resource/(.*)`, uri);
  return { resource_id: match[1] };
};

export const generate_resource_students = (id: { resource_id: string }) => {
    return base + `/resource/${id.resource_id}/students`;
  };
  export const parse_resource_students = (uri: string) => {
    const match = parse(`${base}/resource/(.*)/students`, uri);
    return { resource_id: match[1] };
  };

export const generate_resource_student = (id: {
  resource_id: string;
  student_id: string;
}) => base + `/resource/${id.resource_id}/student/${id.student_id}`;
export const parse_resource_student = (uri: string) => {
  const match = parse(`${base}/resource/(.*)/student/(.*)`, uri);
  return { resource_id: match[1], student_id: match[2] };
};

export const generate_session = (id: { session_id: string }) =>
  base + `/session/${id.session_id}`;
export const parse_session = (uri: string) => {
  const match = parse(`${base}/session/(.*)`, uri);
  return { session_id: match[1] };
};