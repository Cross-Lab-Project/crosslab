import { EntityData } from '@crosslab/service-common/test-helper';

import { RoleModel } from '../../../src/database/model.js';
import { RoleRepository } from '../../../src/database/repositories/role.js';
import { Role } from '../../../src/generated/types.js';
import { ExperimentModelWithLinks, ExperimentName } from '../experiments/index.spec.js';
import { ReplaceWithIteratively, TestDataWithLinks } from '../index.spec.js';
import { example_role } from './example_role.spec.js';

export const roleNames = ['example role'] as const;
export type RoleName = (typeof roleNames)[number];
export type RoleData = Record<RoleName, EntityData<RoleRepository>>;

export type RoleModelWithLinks = ReplaceWithIteratively<
  RoleModel,
  ['experiment'],
  [ExperimentName]
>;
export type RoleEntityDataWithLinks = {
  request: Role<'request'>;
  model: RoleModelWithLinks;
  response: Role<'response'>;
};
export type RoleDataWithLinks = Record<RoleName, RoleEntityDataWithLinks>;

export const roleDataWithLinks: RoleDataWithLinks = {
  'example role': { ...example_role },
};

export function resolveLinksRoleData(testData: TestDataWithLinks) {
  for (const roleName of roleNames) {
    const role = testData.roles[roleName];

    // resolve model.experiment
    const modelExperimentName = role.model.experiment;
    (role.model.experiment as unknown as ExperimentModelWithLinks) =
      testData.experiments[modelExperimentName].model;
  }
}
