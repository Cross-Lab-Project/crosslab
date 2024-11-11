import { ApplicationDataSource } from '../database/datasource.js';
import { LtiResourceModel } from '../database/model.js';
import { LTIPlatform } from './lti_platform.js';
import { LTIResourceStudent } from './lti_resource_student.js';

type ResourceId = { resource_id: string };

export class LTIResource implements ResourceId {
  public resource_id: string;
  public experiment_template_uri?: string;
  private students_synced: boolean = false;
  public platform_id: string;

  // #region Initializers
  private constructor(private resource_model: LtiResourceModel) {
    this.resource_id = resource_model.id;
    this.experiment_template_uri = resource_model.experiment_template_uri;
    this.platform_id = resource_model.platform.id;
  }

  static async getOrCreate(message: {resource_link_id: string}, platform: LTIPlatform) {
    const resource_init = {
      platform: { id: platform.platform_model.id },
      resource_link_id: message.resource_link_id,
    };

    await ApplicationDataSource.createQueryBuilder(LtiResourceModel, 'resource').insert().values({...resource_init}).orIgnore().execute();
    const resource = await ApplicationDataSource.manager.findOneByOrFail(LtiResourceModel, resource_init, { relations: ['platform'] });

    return new LTIResource(resource as any);
  }

  static async byId({ resource_id }: ResourceId) {
    const resource = await ApplicationDataSource.manager.findOneByOrFail(
      LtiResourceModel,
      { id: resource_id },
      { relations: ['platform'] },
    );
    return new LTIResource(resource);
  }

  static async list() {
    const resources = await ApplicationDataSource.manager.find(LtiResourceModel, {}, { relations: ['platform'] });
    return resources.map(resource => new LTIResource(resource));
  }
  // #endregion

  setNameService(context_memberships_url: string) {
    this.resource_model.namesServiceUrl = context_memberships_url;
    ApplicationDataSource.manager.save(LtiResourceModel, this.resource_model);
  }

  async syncStudents(force: boolean=false) {
    if (this.students_synced && !force) return;
    await LTIResourceStudent.updateStudentsFromLtiResource(this.resource_id);
    this.students_synced = true;
  }

  async getStudent(id: { student_id: string }) {
    await this.syncStudents();
    return LTIResourceStudent.byId({ resource_id: this.resource_id, ...id });
  }

  async getStudents() {
    await this.syncStudents();
    return LTIResourceStudent.list({ resource_id: this.resource_id });
  }

  public async update(data: { experiment_template_uri?: string }) {
    if (data.experiment_template_uri)
      this.resource_model.experiment_template_uri = data.experiment_template_uri;
    await ApplicationDataSource.manager.save(LtiResourceModel, this.resource_model);
  }

  public async delete() {
    await ApplicationDataSource.manager.delete(LtiResourceModel, this.resource_model);
  }
}
