import { DeviceRepository } from '../../src/database/repositories/device';
import { ExperimentRepository } from '../../src/database/repositories/experiment';
import { InstanceRepository } from '../../src/database/repositories/instance';
import { ParticipantRepository } from '../../src/database/repositories/participant';
import { PeerconnectionRepository } from '../../src/database/repositories/peerconnection';
import { RoleRepository } from '../../src/database/repositories/role';
import { ServiceConfigurationRepository } from '../../src/database/repositories/serviceConfiguration';
import { TemplateRepository } from '../../src/database/repositories/template';
import {
    DeviceDataWithLinks,
    DeviceName,
    deviceDataWithLinks,
    resolveLinksDeviceData,
} from './devices/index.spec';
import {
    ExperimentDataWithLinks,
    ExperimentName,
    experimentDataWithLinks,
    resolveLinksExperimentData,
} from './experiments/index.spec';
import { InstanceName, instanceData } from './instances/index.spec';
import {
    ParticipantDataWithLinks,
    ParticipantName,
    participantDataWithLinks,
    resolveLinksParticipantData,
} from './participants/index.spec';
import {
    PeerconnectionDataWithLinks,
    PeerconnectionName,
    peerconnectionDataWithLinks,
    resolveLinksPeerconnectionData,
} from './peerconnections/index.spec';
import {
    RoleDataWithLinks,
    RoleName,
    resolveLinksRoleData,
    roleDataWithLinks,
} from './roles/index.spec';
import {
    ServiceConfigurationDataWithLinks,
    ServiceConfigurationName,
    resolveLinksServiceConfigurationData,
    serviceConfigurationDataWithLinks,
} from './serviceConfigurations/index.spec';
import { TemplateName, templateData } from './templates/index.spec';
import { RemoveIndex, ReplaceWith } from '@crosslab/service-common';
import { GenericTestData } from '@crosslab/service-common/test-helper';

export type TestData = GenericTestData<
    [
        ['devices', DeviceName, DeviceRepository],
        ['experiments', ExperimentName, ExperimentRepository],
        ['instances', InstanceName, InstanceRepository],
        ['participants', ParticipantName, ParticipantRepository],
        ['peerconnections', PeerconnectionName, PeerconnectionRepository],
        ['roles', RoleName, RoleRepository],
        [
            'serviceConfigurations',
            ServiceConfigurationName,
            ServiceConfigurationRepository,
        ],
        ['templates', TemplateName, TemplateRepository],
    ]
>;

export type TestDataWithLinks = {
    devices: DeviceDataWithLinks;
    experiments: ExperimentDataWithLinks;
    instances: TestData['instances'];
    participants: ParticipantDataWithLinks;
    peerconnections: PeerconnectionDataWithLinks;
    roles: RoleDataWithLinks;
    serviceConfigurations: ServiceConfigurationDataWithLinks;
    templates: TestData['templates'];
};

export function prepareTestData(): TestData {
    const testDataWithLinks: TestDataWithLinks = {
        devices: structuredClone(deviceDataWithLinks),
        experiments: structuredClone(experimentDataWithLinks),
        instances: structuredClone(instanceData),
        participants: structuredClone(participantDataWithLinks),
        peerconnections: structuredClone(peerconnectionDataWithLinks),
        roles: structuredClone(roleDataWithLinks),
        serviceConfigurations: structuredClone(serviceConfigurationDataWithLinks),
        templates: structuredClone(templateData),
    };

    resolveLinksDeviceData(testDataWithLinks);
    resolveLinksExperimentData(testDataWithLinks);
    resolveLinksParticipantData(testDataWithLinks);
    resolveLinksPeerconnectionData(testDataWithLinks);
    resolveLinksRoleData(testDataWithLinks);
    resolveLinksServiceConfigurationData(testDataWithLinks);

    return testDataWithLinks as TestData;
}

export type ReplaceWithIteratively<
    T,
    P extends (keyof RemoveIndex<T>)[],
    R extends unknown[],
> = P extends [infer PH extends keyof RemoveIndex<T>]
    ? R extends [infer RH]
        ? ReplaceWith<T, PH, RH>
        : never
    : P extends [infer PH extends keyof RemoveIndex<T>, ...infer PT]
    ? R extends [infer RH, ...infer RT]
        ? PT extends (keyof RemoveIndex<ReplaceWith<T, PH, RH>>)[]
            ? ReplaceWithIteratively<ReplaceWith<T, PH, RH>, PT, RT>
            : never
        : never
    : never;
