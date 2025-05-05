import { utils } from '@crosslab/service-common';

import { LTIResource } from '../business/lti_resource.js';
import { LTIResourceStudent } from '../business/lti_resource_student.js';
import {
  getLtiResourceByResourceIdStudentsByStudentIdSignature,
  getLtiResourceByResourceIdStudentsSignature,
  patchLtiResourceByResourceIdStudentsByStudentIdSignature,
  patchLtiResourceByResourceIdStudentsSignature,
} from '../generated/signatures.js';
import { Student as StudentObject } from '../generated/types.js';
import * as uri from '../helper/uris.js';

function to_wire(student: LTIResourceStudent): StudentObject<'response'> {
  return utils.removeNullOrUndefined({
    uri: uri.generate_resource_student(student),
    external_id: student.external_id,
    email: student.email,
    name: student.name,
    role_mapping: student.role_mappings,
  });
}

export const getLtiResourceByResourceIdStudents: getLtiResourceByResourceIdStudentsSignature =
  async (req, parameters) => {
    await req.authorization.check_authorization_or_fail(
      'view',
      uri.generate_resource(parameters),
    );

    const resource = await LTIResource.byId(parameters);
    const students = await resource.getStudents();

    return {
      status: 200,
      body: students.map(to_wire),
    };
  };

export const getLtiResourceByResourceIdStudentsByStudentId: getLtiResourceByResourceIdStudentsByStudentIdSignature =
  async (req, parameters) => {
    await req.authorization.check_authorization_or_fail(
      'view',
      uri.generate_resource(parameters),
    );

    const resource = await LTIResource.byId(parameters);
    const student = await resource.getStudent(parameters);

    return {
      status: 200,
      body: to_wire(student),
    };
  };

export const patchLtiResourceByResourceIdStudents: patchLtiResourceByResourceIdStudentsSignature =
  async (req, parameters, body) => {
    await req.authorization.check_authorization_or_fail(
      'view',
      uri.generate_resource(parameters),
    );

    const resource = await LTIResource.byId(parameters);

    for (const item of body) {
      const student = await resource.getStudent(uri.parse_resource_student(item.uri));

      for (const role of item.data.role_mapping) {
        await student.set_role_mapping(role);
      }
    }

    const students = await resource.getStudents();

    return {
      status: 200,
      body: students.map(to_wire),
    };
  };

export const patchLtiResourceByResourceIdStudentsByStudentId: patchLtiResourceByResourceIdStudentsByStudentIdSignature =
  async (req, parameters, body) => {
    await req.authorization.check_authorization_or_fail(
      'view',
      uri.generate_resource(parameters),
    );

    const resource = await LTIResource.byId(parameters);
    const student = await resource.getStudent(parameters);

    for (const role of body.role_mapping) {
      await student.set_role_mapping(role);
    }

    return {
      status: 200,
      body: to_wire(student),
    };
  };
