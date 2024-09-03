import { HttpError, utils } from '@crosslab/service-common';

import { get_jwks } from '../business/key_management.js';
import { LTIPlatform } from '../business/lti_platform.js';
import { Client as AuthenticationClient } from '../clients/authentication/client.js';
import { Client as DeviceClient } from '../clients/device/client.js';
import { Client as ExperimentClient } from '../clients/experiment/client.js';
import { config } from '../config.js';
import {
  getLtiPlatformByPlatformIdJwksSignature,
  postLtiPlatformByPlatformIdLaunchSignature,
  postLtiPlatformByPlatformIdLoginSignature,
} from '../generated/signatures.js';
import * as uri from './uris.js';

export const postLtiPlatformByPlatformIdLogin: postLtiPlatformByPlatformIdLoginSignature =
  async (_req, parameters, body) => {
    const platform = await LTIPlatform.byId(parameters);
    const authentication_request_url = await platform.getAuthUrl(body);

    return {
      status: 200,
      body: { authentication_request_url: authentication_request_url },
    };
  };

export const postLtiPlatformByPlatformIdLaunch: postLtiPlatformByPlatformIdLaunchSignature =
  async (_req, parameters, body) => {
    const platform = await LTIPlatform.byId(parameters);
    const session = await platform.startSession(body);

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
    // const resource_link_id = getResourceLinkId(message);
    // const resource = ApplicationDataSource.manager.create(LtiResourceModel, { platform, resource_link_id});
    //await ApplicationDataSource.manager.save(resource);
    //const session = ApplicationDataSource.manager.create(LtiSessionModel, {resource, session_id: random(32)});
    //await ApplicationDataSource.manager.insert(LtiSessionModel, session);
    return {
      status: 200,
      body: {
        access_token: await session.createAccessToken(),
        session: utils.removeNullOrUndefined({
          uri: uri.generate_session(session),
          resource_uri: uri.generate_resource(session),
          experiment_uri: await session.get_experiment_uri(),
          roles: Array.from(session.launchMessage.roles),
        }),
      },
    };
  };

export const getLtiPlatformByPlatformIdJwks: getLtiPlatformByPlatformIdJwksSignature =
  async () => {
    return {
      status: 200,
      body: get_jwks() as unknown as { [k: string]: unknown },
    };
  };
