
import { LTISession } from '../business/lti_session.js';
import {
  patchLtiSessionBySessionIdExperimentSignature,
  postLtiSessionBySessionIdExperimentCallbackSignature
} from '../generated/signatures.js';
import * as uri from '../helper/uris.js';

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

export const postLtiSessionBySessionIdExperimentCallback: postLtiSessionBySessionIdExperimentCallbackSignature =
  async (req, parameters, _body) => {
    await req.authorization.check_authorization_or_fail(
      'edit',
      uri.generate_session(parameters),
    );

    const session = await LTISession.byId(parameters);
    await session.update();
    return { status: 201 };
  };