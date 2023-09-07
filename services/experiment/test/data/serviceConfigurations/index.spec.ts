import { ServiceConfigurationModel } from '../../../src/database/model.js';
import { ServiceConfigurationRepository } from '../../../src/database/repositories/serviceConfiguration.js';
import { ServiceConfiguration } from '../../../src/generated/types.js';
import { ExperimentModelWithLinks, ExperimentName } from '../experiments/index.spec.js';
import { ReplaceWithIteratively, TestDataWithLinks } from '../index.spec.js';
import {
    ParticipantModelWithLinks,
    ParticipantName,
    ParticipantWithLinks,
} from '../participants/index.spec.js';
import { example_serviceConfiguration } from './example_serviceConfiguration.spec.js';
import { EntityData } from '@crosslab/service-common/test-helper';

export const serviceConfigurationNames = ['example serviceConfiguration'] as const;
export type ServiceConfigurationName = (typeof serviceConfigurationNames)[number];
export type ServiceConfigurationData = Record<
    ServiceConfigurationName,
    EntityData<ServiceConfigurationRepository>
>;

export type ServiceConfigurationWithLinks<
    T extends 'all' | 'request' | 'response' = 'all',
> = ReplaceWithIteratively<
    ServiceConfiguration<T>,
    ['participants'],
    [ParticipantName[]]
>;
export type ServiceConfigurationModelWithLinks = ReplaceWithIteratively<
    ServiceConfigurationModel,
    ['participants', 'experiment'],
    [ParticipantName[], ExperimentName]
>;
export type ServiceConfigurationEntityDataWithLinks = {
    request: ServiceConfigurationWithLinks<'request'>;
    model: ServiceConfigurationModelWithLinks;
    response: ServiceConfigurationWithLinks<'response'>;
};
export type ServiceConfigurationDataWithLinks = Record<
    ServiceConfigurationName,
    ServiceConfigurationEntityDataWithLinks
>;

export const serviceConfigurationDataWithLinks: ServiceConfigurationDataWithLinks = {
    'example serviceConfiguration': { ...example_serviceConfiguration },
};

export function resolveLinksServiceConfigurationData(testData: TestDataWithLinks) {
    for (const serviceConfigurationName of serviceConfigurationNames) {
        const serviceConfiguration =
            testData.serviceConfigurations[serviceConfigurationName];

        // resolve request.participants
        if (serviceConfiguration.request.participants)
            for (let i = 0; i < serviceConfiguration.request.participants.length; i++) {
                const participantName = serviceConfiguration.request.participants[i];
                (serviceConfiguration.request.participants[
                    i
                ] as unknown as ParticipantWithLinks<'request'>) =
                    testData.participants[participantName].request;
            }

        // resolve model.participants
        if (serviceConfiguration.model.participants)
            for (let i = 0; i < serviceConfiguration.model.participants.length; i++) {
                const participantName = serviceConfiguration.model.participants[i];
                (serviceConfiguration.model.participants[
                    i
                ] as unknown as ParticipantModelWithLinks) =
                    testData.participants[participantName].model;
            }

        // resolve response.participants
        if (serviceConfiguration.response.participants)
            for (let i = 0; i < serviceConfiguration.response.participants.length; i++) {
                const participantName = serviceConfiguration.response.participants[i];
                (serviceConfiguration.response.participants[
                    i
                ] as unknown as ParticipantWithLinks<'response'>) =
                    testData.participants[participantName].response;
            }

        // resolve model.experiment
        const modelExperimentName = serviceConfiguration.model.experiment;
        (serviceConfiguration.model.experiment as unknown as ExperimentModelWithLinks) =
            testData.experiments[modelExperimentName].model;
    }
}
