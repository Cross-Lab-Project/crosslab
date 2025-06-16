import { logger } from '@crosslab/service-common';
import { ApplicationDataSource } from '../database/datasource.js';
import { LtiResourceModel, LtiResourceStudent, LtiResourceStudentRoleMapModel } from '../database/model.js';
import { membership } from '../lti/membership.js';

type ResourceStudentId = { student_id: string; resource_id: string };

export class LTIResourceStudent implements ResourceStudentId {
  public student_id: string;
  public external_id: string;

  // #region Initializers
  private constructor(
    public resource_id: string,
    public student_model: LtiResourceStudent,
    public role_mapping_models: LtiResourceStudentRoleMapModel[],
  ) {
    this.student_id = student_model.id;
    this.external_id = student_model.external_id;
  }

  private static async newStudent(resource_id: string, student: LtiResourceStudent) {
    const role_mappings = await ApplicationDataSource.manager.findBy(
      LtiResourceStudentRoleMapModel,
      { student },
    );

    return new LTIResourceStudent(resource_id, student, role_mappings);
  }

  static async byId({ student_id, resource_id }: ResourceStudentId) {
    const student = await ApplicationDataSource.manager.findOneByOrFail(
      LtiResourceStudent,
      {
        id: student_id,
        resource: { id: resource_id },
      },
    );
    return this.newStudent(resource_id, student);
  }

  static async list({ resource_id }: Omit<ResourceStudentId, 'student_id'>) {
    const students = await ApplicationDataSource.manager.findBy(LtiResourceStudent, {
      resource: { id: resource_id },
    });
    return Promise.all(students.map(student => this.newStudent(resource_id, student)));
  }
  // #endregion

  public get email() {
    return this.student_model.email;
  }
  public get name() {
    return this.student_model.name;
  }
  public get role_mappings() {
    return this.role_mapping_models.map(role => ({
      role: role.role,
      device: role.device,
    }));
  }

  public async set_role_mapping(p: { role: string; device: string | 'GROUP' }) {
    if (p.device === 'GROUP') {
      await ApplicationDataSource.manager.delete(LtiResourceStudentRoleMapModel, {
        student: { id: this.student_id },
        role: p.role,
      });
    }else {
      await ApplicationDataSource.manager.upsert(
        LtiResourceStudentRoleMapModel,
        {
          role: p.role,
          student: { id: this.student_id },
          device: p.device,
        },
        ['student', 'role'],
      );
    }
  }

  public static async updateStudentsFromLtiResource(resource_id: string) {
    const resource_model = await ApplicationDataSource.manager.findOneByOrFail(LtiResourceModel, {
      id: resource_id,
    });
    logger.info(`Updating students for resource ${resource_id}`)
    logger.info(resource_model.namesServiceUrl);
    if(!resource_model.namesServiceUrl){
      return; // No name service provided
    }
    const members = await membership(resource_model.platform, resource_model.namesServiceUrl);
    const students = members.map(m=>({
      name: m.name ?? `${m.given_name} ${m.family_name}`,
      external_id: m.user_id,
      resource: { id: resource_id },
    }));
    logger.info(`Updating students for resource ${resource_id}`)
    logger.info(students);
    
    await ApplicationDataSource.createQueryBuilder(LtiResourceStudent, 'student').insert().values(students).orUpdate(['name'], ['resourceId', 'external_id']).execute();
  }
}
