import { logger } from '@crosslab/service-common';

import { Clients, clients } from '../clients/index.js';
import { ApplicationDataSource } from '../database/datasource.js';
import { LtiSessionModel } from '../database/model.js';
import { random } from '../helper/generators.js';
import { LTIMessage } from './lti_message.js';
import { LTIResource } from './lti_resource.js';

export class LTISession {
  public session_id: string;
  public resource_id: string;

  public launchMessage: LTIMessage;

  // #region Initializers
  public constructor(public session_model: LtiSessionModel) {
    this.session_id = session_model.id;
    this.resource_id = session_model.resource.id;
    this.launchMessage = new LTIMessage(session_model.launchMessage);
  }

  static async createSession(message: LTIMessage, resource: LTIResource) {
    const id = random();
    let session = ApplicationDataSource.manager.create(LtiSessionModel, {
      id,
      resource: { id: resource.resource_id },
      launchMessage: message.raw,
    });
    await ApplicationDataSource.manager.insert(LtiSessionModel, session);
    session = await ApplicationDataSource.manager.findOneByOrFail(LtiSessionModel, { id });

    /* gather lti service infos */
    //if (hasNameServiceClaims(message)) {
    //  resource.setNameService(message['https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice'].context_memberships_url);
    //}
    return new LTISession(session);
  }

  static async getSessionbyId(id: string) {
    const _session = await ApplicationDataSource.manager.findOneByOrFail(
      LtiSessionModel,
      { id },
    );
    return new LTISession(_session);
  }

  // #endregion

  public async createAccessToken() {
    if (!this.session_model.resource.platform.associated_user) {
      throw new Error('The platform does not have an associated user');
    }
    return await clients.authentication.createToken({
      user: this.session_model.resource.platform.associated_user,
      claims: { lti_token: true },
    });
  }

  public async get_experiment_uri() {
    return this.session_model.experiment_uri;
  }

  public async createOrUpdateExperiment({ experiment: experimentClient }: Clients) {
    experimentClient = clients.experiment;
    try {
      if (!this.session_model.resource.experiment_template_uri) {
        throw new Error('The resource does not have an experiment template');
      }
      const template = await experimentClient.getTemplate(
        this.session_model.resource.experiment_template_uri,
      );
      const experiment = template.configuration;
      if (this.session_model.experiment_uri) {
        await experimentClient.updateExperiment(
          this.session_model.experiment_uri,
          experiment,
        );
      } else {
        this.session_model.experiment_uri = (
          await experimentClient.createExperiment({ status: 'created', ...experiment })
        ).url;
        ApplicationDataSource.manager.save(LtiSessionModel, this.session_model);
      }
    } catch (e) {
      logger.warn(e);
      this.session_model.experiment_uri = undefined;
      ApplicationDataSource.manager.save(LtiSessionModel, this.session_model);
    }
  }
}
