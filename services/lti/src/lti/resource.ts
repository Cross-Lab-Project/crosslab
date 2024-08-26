import { clients } from '../clients/index.js';
import { config } from '../config.js';
import { ApplicationDataSource } from '../database/datasource.js';
import { LtiResourceModel, LtiResourceStudentRoleMapModel } from '../database/model.js';
import { patchLtiResourceByResourceIdRequestBodyType } from '../generated/signatures.js';
import { Resource as ResourceObject, Student } from '../generated/types.js';
import { LtiMessage, platformFetch } from './message.js';
import { Platform, removeNullOrUndefined } from './platform.js';

export class Resource {
  public uri: string;
  
  public constructor(public resource_model: LtiResourceModel) {
    this.uri = `${config.API_BASE_URL}/lti/resource/${this.resource_model.id}`;
  }

  private async getTemplateRoles(){
    const template = await clients.experiment.getTemplate(this.resource_model.experiment_template_uri!)
    const devices = await Promise.all(template.configuration.devices.map(d=>clients.device.getDevice(d.device)))
    const roles: {role: string, devices: string[]}[]= []
    for(let i=0;i<devices.length;i++){
      const device = devices[i];
      if (device.type === 'group') {
        roles.push({role:template.configuration.devices[i].role, devices:device.devices.map(d=>d.url)});
      }
    }
    return roles;
  }
  
  setNameService(context_memberships_url: string) {
    this.resource_model.namesServiceUrl = context_memberships_url;
    ApplicationDataSource.manager.save(LtiResourceModel, this.resource_model);
  }
  
  async getStudents(): Promise<Student<'response'>[]> {
    if(!this.resource_model.namesServiceUrl){
      throw new Error("No name service provided");
    }

    const resp = await (await platformFetch(this.resource_model.namesServiceUrl, {
      headers: { Accept: 'application/vnd.ims.lti-nrps.v2.membershipcontainer+json' },
      platform: this.resource_model.platform,
      scopes: ['https://purl.imsglobal.org/spec/lti-nrps/scope/contextmembership.readonly'],
    })).json();

    const members = (resp as {members: {user_id: string, name?: string, given_name?: string, family_name?:string}[]}).members;
    const roles = await this.getTemplateRoles();

    return members.map(m=>({
      name: m.name ?? `${m.given_name} ${m.family_name}`,
      uri: this.uri+'/students/'+m.user_id,
      external_id: m.user_id,
      role_mapping: roles.map(r=>({role: r.role, device: 'GROUP'})),
    }))
  }

  async updateStudent(p:{role: string, external_id: string, device: string | 'GROUP'}) {
    if (p.device === 'GROUP') {
      await ApplicationDataSource.manager.delete(LtiResourceStudentRoleMapModel, {resource: this.resource_model, external_id: p.external_id, role: p.role});
    }{
      await ApplicationDataSource.manager.upsert(LtiResourceStudentRoleMapModel, {role: p.role, resource: this.resource_model, external_id: p.external_id, device: p.device}, ["resource", "external_id", "role"]);
    }
  }

  toObject(): ResourceObject<'response'> {
    return removeNullOrUndefined({
      uri: this.uri,
      students_uri: `${this.uri}/students`,
      experiment_template_uri: this.resource_model.experiment_template_uri,
    });
  }

  update(body: patchLtiResourceByResourceIdRequestBodyType) {
    if(body.experiment_template_uri) this.resource_model.experiment_template_uri = body.experiment_template_uri;
    ApplicationDataSource.manager.save(LtiResourceModel, this.resource_model);
  }

  public async delete() {
    await ApplicationDataSource.manager.delete(LtiResourceModel, this.resource_model);
  }
}

export async function getOrCreateResource(message: LtiMessage, platform: Platform) {
  const _resource = await ApplicationDataSource.manager.findOne(LtiResourceModel, {
    where: {
      platform: {id: platform.platform_model.id},
      resource_link_id:
        message['https://purl.imsglobal.org/spec/lti/claim/resource_link'].id,
    },
  });
  const resource =
    _resource ??
    ApplicationDataSource.manager.create(LtiResourceModel, {
      platform: platform.platform_model,
      resource_link_id:
        message['https://purl.imsglobal.org/spec/lti/claim/resource_link'].id,
    });
  await ApplicationDataSource.manager.save(resource);
  return new Resource(resource);
}

export async function getResourceById(id: string) {
  const _resource = await ApplicationDataSource.manager.findOneByOrFail(
    LtiResourceModel,
    { id },
  );
  return new Resource(_resource);
}

export async function listResources() {
  const _resources = await ApplicationDataSource.manager.find(LtiResourceModel, {});
  return _resources.map(resource => new Resource(resource));
}
