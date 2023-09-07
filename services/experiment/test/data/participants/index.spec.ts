import { ParticipantModel } from '../../../src/database/model.js';
import { ParticipantRepository } from '../../../src/database/repositories/participant.js';
import { Participant } from '../../../src/generated/types.js';
import { ReplaceWithIteratively, TestDataWithLinks } from '../index.spec.js';
import { RoleName } from '../roles/index.spec.js';
import {
    ServiceConfigurationModelWithLinks,
    ServiceConfigurationName,
} from '../serviceConfigurations/index.spec.js';
import { example_participant } from './example_participant.spec.js';
import { EntityData } from '@crosslab/service-common/test-helper';

export const participantNames = ['example participant'] as const;
export type ParticipantName = (typeof participantNames)[number];
export type ParticipantData = Record<ParticipantName, EntityData<ParticipantRepository>>;

export type ParticipantWithLinks<T extends 'all' | 'request' | 'response' = 'all'> =
    ReplaceWithIteratively<Participant<T>, ['role'], [RoleName]>;
export type ParticipantModelWithLinks = ReplaceWithIteratively<
    ParticipantModel,
    ['role', 'serviceConfiguration'],
    [RoleName, ServiceConfigurationName]
>;
export type ParticipantEntityDataWithLinks = {
    request: ParticipantWithLinks<'request'>;
    model: ParticipantModelWithLinks;
    response: ParticipantWithLinks<'response'>;
};
export type ParticipantDataWithLinks = Record<
    ParticipantName,
    ParticipantEntityDataWithLinks
>;

export const participantDataWithLinks: ParticipantDataWithLinks = {
    'example participant': { ...example_participant },
};

export function resolveLinksParticipantData(testData: TestDataWithLinks) {
    for (const participantName of participantNames) {
        const participant = testData.participants[participantName];

        // resolve request.role
        const requestRoleName = participant.request.role;
        if (requestRoleName)
            (participant.request.role as Participant<'request'>['role']) =
                testData.roles[requestRoleName].request.name;

        // resolve model.role
        const modelRoleName = participant.model.role;
        (participant.model.role as unknown as ParticipantModel['role']) =
            testData.roles[modelRoleName].model.name;

        // resolve response.role
        const responseRoleName = participant.response.role;
        if (responseRoleName)
            (participant.response.role as Participant<'response'>['role']) =
                testData.roles[responseRoleName].response.name;

        // resolve model.serviceConfiguration
        const modelServiceConfigurationName = participant.model.serviceConfiguration;
        (participant.model
            .serviceConfiguration as unknown as ServiceConfigurationModelWithLinks) =
            testData.serviceConfigurations[modelServiceConfigurationName].model;
    }
}
