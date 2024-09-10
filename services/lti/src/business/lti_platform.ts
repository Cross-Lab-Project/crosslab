
import { ApplicationDataSource } from '../database/datasource.js';
import { LtiMessageModel, PlatformModel } from '../database/model.js';
import { handle_login_request, verifyMessage } from '../lti/message.js';
import { getPlatformEndpoints } from '../lti/platforms/index.js';
import { LTIMessage } from './lti_message.js';
import { LTIResource } from './lti_resource.js';
import { LTISession } from './lti_session.js';

export class LTIPlatform {
  public platform_id: string;

  // #region Initializers
  public constructor(public platform_model: PlatformModel) {
    this.platform_id = this.platform_model.id;
  }
  static async create(associated_user: string) {
    const _platform = ApplicationDataSource.manager.create(PlatformModel, {
      associated_user,
    });
    await ApplicationDataSource.manager.insert(PlatformModel, _platform);
    return new LTIPlatform(_platform);
  }

  static async list() {
    const _platforms = await ApplicationDataSource.manager.find(PlatformModel, {
      where: { registrated: true },
    });
    return _platforms.map(platform => new LTIPlatform(platform));
  }

  static async byId({ platform_id }: { platform_id: string }) {
    const platform = await ApplicationDataSource.manager.findOneByOrFail(PlatformModel, {
      id: platform_id,
    });
    return new LTIPlatform(platform);
  }

  // #endregion

  private async completeRegistration(params: {
    iss: string;
    client_id: string;
    lti_deployment_id?: string;
    authentication_request_url: string;
    access_token_url: string;
    jwks_url: string;
  }) {
    const _platform = {
      id: this.platform_model.id,
      iss: params.iss,
      client_id: params.client_id,
      deployment_id: params.lti_deployment_id,
      authentication_request_url: params.authentication_request_url,
      access_token_url: params.access_token_url,
      jwks_url: params.jwks_url,
      registrated: true,
    };
    this.platform_model = await ApplicationDataSource.manager.save(
      PlatformModel,
      _platform,
    );
  }

  public async getAuthUrl(params: {
    iss: string;
    client_id: string;
    lti_deployment_id?: string;
    target_link_uri: string;
    login_hint: string;
    lti_message_hint: string;
  }) {
    if (!this.platform_model.registrated) {
      const urls = await getPlatformEndpoints(params);
      await this.completeRegistration({ ...params, ...urls });
    }
    return await handle_login_request(params, this.platform_model);
  }
  
  private async verifyLtiMessage(params: { id_token: string; state: string }) {
    // Get the messageModel from the database (needed for jwks_url and nonce)
    const message = await ApplicationDataSource.manager.findOneOrFail(LtiMessageModel, {
      where: { id: params.state },
      relations: ['platform'],
    });

    try {
      // Verify the message
      const payload = await verifyMessage(
        params.id_token,
        message.nonce,
        this.platform_model.jwks_url,
      );

      // Return the verified message
      return new LTIMessage(payload);
    } finally {
      // delete it to prevent replay attacks
      await ApplicationDataSource.manager.delete(LtiMessageModel, message.id);
    }
  }

  public async startSession(params: { state: string; id_token: string }) {
    const payload = await this.verifyLtiMessage(params);
    const resource = await LTIResource.getOrCreate(payload, this);
    return await LTISession.createSession(payload, resource);
  }

  public async delete() {
    await ApplicationDataSource.manager.delete(PlatformModel, this.platform_model);
  }
}
