import { RoleModel } from '../../../src/database/model';
import { RoleRepository } from '../../../src/database/repositories/role';
import { Role } from '../../../src/generated/types';
import { ExperimentModelWithLinks, ExperimentName } from '../experiments/index.spec';
import { ReplaceWithIteratively, TestDataWithLinks } from '../index.spec';
import { example_role } from './example_role.spec';
import { EntityData } from '@crosslab/service-common/test-helper';

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
