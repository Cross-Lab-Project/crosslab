import { ApplicationDataSource } from '../database/datasource.js';
import {
  LtiResourceStudent,
  LtiResourceStudentRoleMapModel
} from '../database/model.js';

type ResourceStudentId = { student_id: string; resource_id: string };

export class LTIResourceStudent implements ResourceStudentId{
  public student_id: string;

  // #region Initializers
  private constructor(public resource_id: string, public student_model: LtiResourceStudent, public role_mapping_models: LtiResourceStudentRoleMapModel[]) {
    this.student_id = student_model.id;
  }

  private static async newStudent(resource_id: string, student: LtiResourceStudent) {
    const role_mappings = await ApplicationDataSource.manager.findBy(LtiResourceStudentRoleMapModel,{ student });

    return new LTIResourceStudent( resource_id, student, role_mappings);
  }

  static async byId({ student_id, resource_id }: ResourceStudentId) {
    const student = await ApplicationDataSource.manager.findOneByOrFail(LtiResourceStudent, {
      resource: { id: resource_id },
      external_id: student_id,
    });
    return this.newStudent( resource_id, student);
  }

  static async list({ resource_id }: Omit<ResourceStudentId, 'student_id'>) {
    const students = await ApplicationDataSource.manager.findBy(LtiResourceStudent, {
      resource: { id: resource_id },
    });
    return Promise.all(students.map(student => this.newStudent( resource_id, student)));
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
    }))
  }

  public async set_role_mapping(p: {
    role: string;
    device: string | 'GROUP';
  }) {
    if (p.device === 'GROUP') {
      await ApplicationDataSource.manager.delete(LtiResourceStudentRoleMapModel, {
        student: { id: this.student_id },
        role: p.role,
      });
    }
    {
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
}
