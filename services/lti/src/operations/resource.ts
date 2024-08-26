import { HttpError, logger } from '@crosslab/service-common';
import {
  deleteLtiResourceByResourceIdSignature,
  getLtiResourceByResourceIdSignature,
  getLtiResourceByResourceIdStudentsByStudentIdSignature,
  getLtiResourceByResourceIdStudentsSignature,
  getLtiResourceSignature,
  patchLtiResourceByResourceIdSignature,
  patchLtiResourceByResourceIdStudentsByStudentIdSignature,
  patchLtiResourceByResourceIdStudentsSignature
} from '../generated/signatures.js';
import { getResourceById, listResources } from '../lti/resource.js';

export const getLtiResource: getLtiResourceSignature = async req => {
    logger.info(req.authorization.user)
  await req.authorization.check_authorization_or_fail('view', 'lti-resource');
  const resources = await listResources();
  const filtered_resources = await req.authorization.filter(
    resources,
    'view',
    p => p.uri,
  );
  return {
    status: 200,
    body: filtered_resources.map(p => p.toObject()),
  };
};


export const getLtiResourceByResourceId: getLtiResourceByResourceIdSignature = async (
  req,
  parameters,
) => {
  const resource = await getResourceById(parameters.resource_id);
  await req.authorization.check_authorization_or_fail('view', resource.uri);
  return {
    status: 200,
    body: resource.toObject(),
  };
};

export const patchLtiResourceByResourceId: patchLtiResourceByResourceIdSignature = async (
  req,
  parameters,
  body
) => {
  const resource = await getResourceById(parameters.resource_id);
  await req.authorization.check_authorization_or_fail('edit', resource.uri);
  resource.update(body)
  return {
    status: 200,
    body: resource.toObject(),
  };
};

export const deleteLtiResourceByResourceId: deleteLtiResourceByResourceIdSignature =
  async (req, parameters) => {
    const resource = await getResourceById(parameters.resource_id);
    await req.authorization.check_authorization_or_fail('delete', resource.uri);
    await resource.delete();
    return { status: 204 };
  };

export const getLtiResourceByResourceIdStudents: getLtiResourceByResourceIdStudentsSignature = async (req, parameters) => {
  const resource = await getResourceById(parameters.resource_id);
  await req.authorization.check_authorization_or_fail('view', resource.uri);

  return {
    status: 200,
    body: await resource.getStudents(),
  };
}

export const getLtiResourceByResourceIdStudentsByStudentId: getLtiResourceByResourceIdStudentsByStudentIdSignature = async (req, parameters) => {
  const resource = await getResourceById(parameters.resource_id);
  await req.authorization.check_authorization_or_fail('view', resource.uri);

  const students = await resource.getStudents()
  const student = students.find(s => s.external_id === parameters.student_id)
  if (!student) {
    throw new HttpError(404, 'Student not found');
  }

  return {
    status: 200,
    body: student,
  };
}

export const patchLtiResourceByResourceIdStudents: patchLtiResourceByResourceIdStudentsSignature = async (req, parameters, body) => {
  const resource = await getResourceById(parameters.resource_id);
  await req.authorization.check_authorization_or_fail('view', resource.uri);

  for (const student of body){
    const external_id = student.uri.split('/').pop()
    if (!external_id) {
      throw new HttpError(400, 'Invalid student URI');
    }
    for (const role of student.data.role_mapping){
      await resource.updateStudent({external_id, role: role.role, device: role.device})
    }
  }

  return {
    status: 200,
    body: await resource.getStudents(),
  };
}

export const patchLtiResourceByResourceIdStudentsByStudentId: patchLtiResourceByResourceIdStudentsByStudentIdSignature = async (req, parameters, body) => {
  const resource = await getResourceById(parameters.resource_id);
  await req.authorization.check_authorization_or_fail('view', resource.uri);

  for (const role of body.role_mapping){
    resource.updateStudent({external_id:parameters.student_id, role: role.role, device: role.device})
  }

  const students = await resource.getStudents()
  const student = students.find(s => s.external_id === parameters.student_id)
  if (!student) {
    throw new HttpError(404, 'Student not found');
  }

  return {
    status: 200,
    body: student,
  };
}