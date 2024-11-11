
import { HttpError } from '@crosslab/service-common';

import { LTIPlatform } from '../business/lti_platform.js';
import { LTIResource } from '../business/lti_resource.js';
import { LTISession } from '../business/lti_session.js';
import {
  patchLtiSessionBySessionIdExperimentSignature
} from '../generated/signatures.js';
import * as uri from './uris.js';

import { Client as AuthenticationClient } from '../clients/authentication/client.js';
import { Client as DeviceClient } from '../clients/device/client.js';
import { Client as ExperimentClient } from '../clients/experiment/client.js';
import { config } from '../config.js';

//function session_to_wire(resource: LTIResource): ResourceObject<'response'> {
//  return utils.removeNullOrUndefined({
//    uri: uri.generate_resource(resource),
//    students_uri: uri.generate_resource_students(resource),
//    experiment_template_uri: resource.experiment_template_uri,
//  });
//}

export const patchLtiSessionBySessionIdExperiment: patchLtiSessionBySessionIdExperimentSignature =
  async (req, parameters, body) => {
    await req.authorization.check_authorization_or_fail(
      'edit',
      uri.generate_session(parameters),
    );

    const session = await LTISession.byId(parameters);
    for (const role of body.role_mapping??[]) {
        await session.set_role_mapping(role);
    }

    const resource = await LTIResource.byId({resource_id: session.resource_id}) 
    const platform = await LTIPlatform.byId({platform_id: resource.platform_id});

    if (!platform.platform_model.associated_user) {
      throw new HttpError(401, 'The platform does not have an associated');
    }
    const experiment = new ExperimentClient(config.BASE_URL, {
      serviceUrl: config.EXPERIMENT_SERVICE_URL,
      fixedHeaders: [
        ['x-request-authentication', platform.platform_model.associated_user],
      ],
    });
    const authentication = new AuthenticationClient(config.BASE_URL, {
      serviceUrl: config.AUTH_SERVICE_URL,
      fixedHeaders: [
        ['x-request-authentication', platform.platform_model.associated_user],
      ],
    });
    const device = new DeviceClient(config.BASE_URL, {
      serviceUrl: config.AUTH_SERVICE_URL,
      fixedHeaders: [
        ['x-request-authentication', platform.platform_model.associated_user],
      ],
    });
    const clients = { experiment, authentication, device };
    await session.createOrUpdateExperiment(clients);

    return { status: 201 };
  };
