import { logger } from "@crosslab/service-common";
import { clients, Clients } from "../clients/index.js";
import { config } from "../config.js";
import { ApplicationDataSource } from "../database/datasource.js";
import { LtiSessionModel } from "../database/model.js";
import { Session as SessionObject } from '../generated/types.js';
import { random } from "../helper/generators.js";
import { hasNameServiceClaims } from "./membership.js";
import { LtiMessage } from "./message.js";
import { removeNullOrUndefined } from "./platform.js";
import { Resource } from "./resource.js";
import { roleMap } from "./util.js";

export class Session {
  public uri: string;

  public constructor(public session_model: LtiSessionModel) {
    this.uri = `${config.API_BASE_URL}/lti/session/${this.session_model.id}`;
  }

  public async createAccessToken() {
    if (!this.session_model.resource.platform.associated_user){
      throw new Error("The platform does not have an associated user")
    }
    return await clients.authentication.createToken({user: this.session_model.resource.platform.associated_user, claims: {lti_token: true}})
  }

  public toObject(): SessionObject<'response'> {
    const roles = new Set(roleMap((this.session_model.launchMessage as LtiMessage)["https://purl.imsglobal.org/spec/lti/claim/roles"]))

    return removeNullOrUndefined({
      uri: this.uri,
      resource_uri: new Resource(this.session_model.resource).uri,
      experiment_uri: this.session_model.experiment_uri,
      roles: Array.from(roles),
    });
  }

  public async createOrUpdateExperiment({experiment: experimentClient}: Clients){
    experimentClient = clients.experiment
    try{
      if(!this.session_model.resource.experiment_template_uri){
        throw new Error("The resource does not have an experiment template")
      }
      const template=await experimentClient.getTemplate(this.session_model.resource.experiment_template_uri)
      const experiment=template.configuration
      if(this.session_model.experiment_uri){
        await experimentClient.updateExperiment(this.session_model.experiment_uri, experiment)
      }else{
        this.session_model.experiment_uri=(await experimentClient.createExperiment({status: 'created', ...experiment})).url
        ApplicationDataSource.manager.save(LtiSessionModel, this.session_model)
      }
    }catch(e){
      logger.warn(e)
      this.session_model.experiment_uri=undefined
      ApplicationDataSource.manager.save(LtiSessionModel, this.session_model)
    } 
  }
}

export async function createSession(_message: LtiMessage, resource: Resource){
  const id=random()
  const _session = ApplicationDataSource.manager.create(LtiSessionModel, { id, resource: resource.resource_model, launchMessage: _message });
  await ApplicationDataSource.manager.insert(LtiSessionModel, _session);

  /* gather lti service infos */
  if (hasNameServiceClaims(_message)) {
    resource.setNameService(_message['https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice'].context_memberships_url);
  }

  return new Session(_session)
}

export async function getSessionbyId(id: string){
  const _session = await ApplicationDataSource.manager.findOneByOrFail(LtiSessionModel, { id });
  return new Session(_session);
}