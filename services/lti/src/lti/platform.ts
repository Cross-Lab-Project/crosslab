import * as DateFun from 'date-fns';
import { LessThan } from 'typeorm';

import { HttpError } from '@crosslab/service-common';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { config } from '../config.js';
import { ApplicationDataSource } from '../database/datasource.js';
import { LtiMessageModel, PlatformModel } from '../database/model.js';
import { Platform as PlatformObject } from '../generated/types.js';
import { handle_login_request, isLtiMessage } from './message.js';
import { getPlatformEndpoints } from './platforms/index.js';

export function removeNullOrUndefined<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(removeNullOrUndefined) as T;
  }
  if (typeof obj === 'object') {
    const newObj = {} as T;
    for (const key in obj) {
      if (obj[key] !== null && obj[key] !== undefined) {
        newObj[key] = removeNullOrUndefined(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}

export class Platform {
  public uri: string;

  public constructor(public platform_model: PlatformModel) {
    this.uri = `${config.API_BASE_URL}/lti/platform/${this.platform_model.id}`;
  }

  private async completeRegistration(params: {
    iss: string;
    client_id: string;
    lti_deployment_id?: string;
    authentication_request_url: string;
    access_token_url: string;
    jwks_url: string;
  }) {
    const _platform={
      id: this.platform_model.id,
      iss: params.iss,
      client_id: params.client_id,
      deployment_id: params.lti_deployment_id,
      authentication_request_url: params.authentication_request_url,
      access_token_url: params.access_token_url,
      jwks_url: params.jwks_url,
      registrated: true,
    }
    this.platform_model=await ApplicationDataSource.manager.save(PlatformModel, _platform)
  }

  public async getAuthUrl(params: {
    iss: string;
    client_id: string;
    lti_deployment_id?: string;
    target_link_uri: string;
    login_hint: string;
    lti_message_hint: string
  }) {
    if (!this.platform_model.registrated) {
      const urls = await getPlatformEndpoints(params);
      await this.completeRegistration({ ...params, ...urls });
    }
    return await handle_login_request(params, this.platform_model)
  }

  public toObject(): PlatformObject<'response'> {
    return removeNullOrUndefined({
      uri: this.uri,
      issuer: this.platform_model.iss,
      client_id: this.platform_model.client_id,
      deployment_id: this.platform_model.deployment_id,
      registration: {
        state: this.platform_model.registrated ? 'complete' : 'pending'
      },
      jwks_uri: `${config.API_BASE_URL}/lti/platform/${this.platform_model.id}/jwks`,
      login_uri: `${config.API_BASE_URL}/lti/platform/${this.platform_model.id}/login`,
      launch_uri: `${config.API_BASE_URL}/lti/platform/${this.platform_model.id}/launch`,
    });
  }

  public async verifyLtiMessage({id_token, state}:{    id_token: string;    state: string;  }) {
    const message = await ApplicationDataSource.manager.findOneOrFail(LtiMessageModel, {
      where: { id: state },
      relations: ['platform'],
    });
    if (message.platform.id !== this.platform_model.id) {
      throw new HttpError(400,'LTI Message is not associated with this platform');
    }
    if (!this.platform_model.jwks_url){
      throw new HttpError(400,'JWKS URL not found');
    }
    const jwks = createRemoteJWKSet(new URL(this.platform_model.jwks_url));
    const { payload } = await jwtVerify(id_token, jwks);
    if (payload.nonce !== message.nonce) {
      throw new Error('nonce does not match');
    }
    // message successfully processed, delete it to prevent replay attacks
    await ApplicationDataSource.manager.delete(LtiMessageModel, message.id);
  
    if (!isLtiMessage(payload)) {
      throw new HttpError(400, 'Malformed LTI Message');
    }
  
    return payload;
  }

  public async delete() {
    await ApplicationDataSource.manager.delete(PlatformModel, this.platform_model);
  }
}

export async function createNewPlatform(associated_user: string) {
  const _platform = ApplicationDataSource.manager.create(PlatformModel, { associated_user });
  await ApplicationDataSource.manager.insert(PlatformModel, _platform);
  return new Platform(_platform);
}

export async function listPlatforms() {
  const _platforms = await ApplicationDataSource.manager.find(PlatformModel, {
    where: { registrated: true },
  });
  return _platforms.map(platform => new Platform(platform));
}

export async function getPlatformById(id: string) {
  const _platform = await ApplicationDataSource.manager.findOneByOrFail(PlatformModel, {
    id,
  });
  return new Platform(_platform);
}

export async function deletePendingPlatforms() {
  const date = DateFun.sub(new Date(), { minutes: 10 });
  console.log(
    await ApplicationDataSource.manager.find(PlatformModel, {
      where: { registrated: false, createdDate: LessThan(date) },
    }),
  );
}
