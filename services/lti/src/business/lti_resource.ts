import { ApplicationDataSource } from '../database/datasource.js';
import { LtiResourceModel } from '../database/model.js';
import { LTIMessage } from './lti_message.js';
import { LTIPlatform } from './lti_platform.js';
import { LTIResourceStudent } from './lti_resource_student.js';

type ResourceId = { resource_id: string };

export class LTIResource implements ResourceId {
  public resource_id: string;
  public experiment_template_uri?: string;
  // #region Initializers
  private constructor(private resource_model: LtiResourceModel) {
    this.resource_id = resource_model.id;
    this.experiment_template_uri = resource_model.experiment_template_uri;
  }

  static async getOrCreate(message: LTIMessage, platform: LTIPlatform) {
    const resource_init = {
      platform: { id: platform.platform_model.id },
      resource_link_id: message.resource_link_id,
    };

    await ApplicationDataSource.createQueryBuilder(LtiResourceModel, 'resource').insert().values({...resource_init}).orIgnore().execute();
    const resource = await ApplicationDataSource.manager.findOneByOrFail(LtiResourceModel, resource_init);

    return new LTIResource(resource as any);
  }

  static async byId({ resource_id }: ResourceId) {
    const resource = await ApplicationDataSource.manager.findOneByOrFail(
      LtiResourceModel,
      { id: resource_id },
    );
    return new LTIResource(resource);
  }

  static async list() {
    const resources = await ApplicationDataSource.manager.find(LtiResourceModel, {});
    return resources.map(resource => new LTIResource(resource));
  }
  // #endregion

  //private async getTemplateRoles(){
  //  const template = await clients.experiment.getTemplate(this.resource_model.experiment_template_uri!)
  //  const devices = await Promise.all(template.configuration.devices.map(d=>clients.device.getDevice(d.device)))
  //  const roles: {role: string, devices: string[]}[]= []
  //  for(let i=0;i<devices.length;i++){
  //    const device = devices[i];
  //    if (device.type === 'group') {
  //      roles.push({role:template.configuration.devices[i].role, devices:device.devices.map(d=>d.url)});
  //    }
  //  }
  //  return roles;
  //}

  setNameService(context_memberships_url: string) {
    this.resource_model.namesServiceUrl = context_memberships_url;
    ApplicationDataSource.manager.save(LtiResourceModel, this.resource_model);
  }

  async getStudent(id: { student_id: string }) {
    return LTIResourceStudent.byId({ resource_id: this.resource_id, ...id });
  }

  async getStudents() {
    return LTIResourceStudent.list({ resource_id: this.resource_id });
  }

  /*async getStudents(): Promise<Student<'response'>[]> {
    if(!this.resource_model.namesServiceUrl){
      throw new Error("No name service provided");
    }
    const roles = await this.getTemplateRoles();
    const members = membership(this.resource_model.platform, this.resource_model.namesServiceUrl);

    return members.map(m=>({
      name: m.name ?? `${m.given_name} ${m.family_name}`,
      uri: this.uri+'/students/'+m.user_id,
      external_id: m.user_id,
      role_mapping: roles.map(r=>({role: r.role, device: 'GROUP'})),
    }))
  }*/

  public async update(data: { experiment_template_uri?: string }) {
    if (data.experiment_template_uri)
      this.resource_model.experiment_template_uri = data.experiment_template_uri;
    await ApplicationDataSource.manager.save(LtiResourceModel, this.resource_model);
  }

  public async delete() {
    await ApplicationDataSource.manager.delete(LtiResourceModel, this.resource_model);
  }
}
