import { logger } from '@crosslab/service-common';

import { Clients, clients } from '../clients/index.js';
import { ApplicationDataSource } from '../database/datasource.js';
import {
  LtiResourceStudent,
  LtiResourceStudentRoleMapModel,
  LtiSessionModel,
  LtiSessionRoleMapModel
} from '../database/model.js';
import { random } from '../helper/generators.js';
import { LTIMessage } from './lti_message.js';
import { LTIResource } from './lti_resource.js';

type SessionId = { session_id: string };

export class LTISession {
  public session_id: string;
  public resource_id: string;

  public launchMessage: LTIMessage;

  // #region Initializers
  public constructor(
    public session_model: LtiSessionModel,
    public role_mapping_models: LtiSessionRoleMapModel[],
  ) {
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
    session = await ApplicationDataSource.manager.findOneByOrFail(LtiSessionModel, {
      id,
    });

    if (message.context_memberships_url)
      resource.setNameService(message.context_memberships_url);

    const student = await ApplicationDataSource.manager.findOne(LtiResourceStudent, {
      select: ['id'],
      where: { resource: { id: resource.resource_id }, external_id: message.user_id },
    });
    const role_mappings = student
      ? await ApplicationDataSource.manager.findBy(LtiResourceStudentRoleMapModel, {
          student: { id: student.id },
        })
      : [];

    ApplicationDataSource.manager.insert(
      LtiSessionRoleMapModel,
      role_mappings.map(role => ({
        session: { id: session.id },
        role: role.role,
        device: role.device,
      })),
    );

    const role_mappings_models = await ApplicationDataSource.manager.findBy(LtiSessionRoleMapModel, {
      session: { id: session.id },
    });


    return new LTISession(session,role_mappings_models);
  }

  static async byId(id: SessionId) {
    const _session = await ApplicationDataSource.manager.findOneByOrFail(
      LtiSessionModel,
      { id: id.session_id },
    );
    const role_mappings_models = await ApplicationDataSource.manager.findBy(LtiSessionRoleMapModel, {
      session: { id: id.session_id },
    });
    return new LTISession(_session,role_mappings_models);
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
      logger.info('Creating experiment', template.configuration);
      const experiment = template.configuration;
      for (const {role, device} of this.role_mappings) {
        experiment.devices=experiment.devices.map(d=>(d.role===role?{...d, device}:d));
      }
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

  public get role_mappings() {
    return this.role_mapping_models.map(role => ({
      role: role.role,
      device: role.device,
    }));
  }

  public async set_role_mapping(p: { role: string; device: string | 'GROUP' }) {
    if (p.device === 'GROUP') {
      await ApplicationDataSource.manager.delete(LtiSessionRoleMapModel, {
        session: { id: this.session_id },
        role: p.role,
      });
    } else {
      await ApplicationDataSource.manager.upsert(
        LtiSessionRoleMapModel,
        {
          role: p.role,
          session: { id: this.session_id },
          device: p.device,
        },
        ['student', 'role'],
      );
    }
    await this.createOrUpdateExperiment(clients);
  }
}
