
import { LTISession } from '../business/lti_session.js';
import {
    patchLtiSessionBySessionIdExperimentSignature
} from '../generated/signatures.js';
import * as uri from './uris.js';

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

    return { status: 201 };
  };
