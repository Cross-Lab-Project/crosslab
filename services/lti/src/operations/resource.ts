import { utils } from '@crosslab/service-common';

import { LTIResource } from '../business/lti_resource.js';
import {
  deleteLtiResourceByResourceIdSignature,
  getLtiResourceByResourceIdSignature,
  getLtiResourceSignature,
  patchLtiResourceByResourceIdSignature,
} from '../generated/signatures.js';
import { Resource as ResourceObject } from '../generated/types.js';
import * as uri from '../helper/uris.js';

function resource_to_wire(resource: LTIResource): ResourceObject<'response'> {
  return utils.removeNullOrUndefined({
    uri: uri.generate_resource(resource),
    students_uri: uri.generate_resource_students(resource),
    experiment_template_uri: resource.experiment_template_uri,
  });
}

export const getLtiResource: getLtiResourceSignature = async req => {
  await req.authorization.check_authorization_or_fail('view', 'lti-resource');

  const resources = await LTIResource.list();
  const filtered_resources = await req.authorization.filter(
    resources,
    'view',
    uri.generate_resource,
  );

  return {
    status: 200,
    body: filtered_resources.map(resource_to_wire),
  };
};

export const getLtiResourceByResourceId: getLtiResourceByResourceIdSignature = async (
  req,
  parameters,
) => {
  await req.authorization.check_authorization_or_fail(
    'view',
    uri.generate_resource(parameters),
  );

  const resource = await LTIResource.byId(parameters);

  return {
    status: 200,
    body: resource_to_wire(resource),
  };
};

export const patchLtiResourceByResourceId: patchLtiResourceByResourceIdSignature = async (
  req,
  parameters,
  body,
) => {
  await req.authorization.check_authorization_or_fail(
    'edit',
    uri.generate_resource(parameters),
  );

  const resource = await LTIResource.byId(parameters);

  resource.update(body);
  return {
    status: 200,
    body: resource_to_wire(resource),
  };
};

export const deleteLtiResourceByResourceId: deleteLtiResourceByResourceIdSignature =
  async (req, parameters) => {
    await req.authorization.check_authorization_or_fail(
      'delete',
      uri.generate_resource(parameters),
    );

    const resource = await LTIResource.byId(parameters);

    await resource.delete();
    return { status: 204 };
  };
