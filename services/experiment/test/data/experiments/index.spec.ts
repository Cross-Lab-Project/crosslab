import { ExperimentModel } from '../../../src/database/model.js';
import { ExperimentRepository } from '../../../src/database/repositories/experiment.js';
import { Experiment, Role } from '../../../src/generated/types.js';
import { DeviceModelWithLinks, DeviceName, DeviceWithLinks } from '../devices/index.spec.js';
import { ReplaceWithIteratively, TestDataWithLinks } from '../index.spec.js';
import {
    PeerconnectionModelWithLinks,
    PeerconnectionName,
} from '../peerconnections/index.spec.js';
import { RoleModelWithLinks, RoleName } from '../roles/index.spec.js';
import {
    ServiceConfigurationModelWithLinks,
    ServiceConfigurationName,
    ServiceConfigurationWithLinks,
} from '../serviceConfigurations/index.spec.js';
import { example_experiment } from './example_experiment.spec.js';
import { EntityData } from '@crosslab/service-common/test-helper';

export const experimentNames = ['example experiment'] as const;
export type ExperimentName = (typeof experimentNames)[number];
export type ExperimentData = Record<ExperimentName, EntityData<ExperimentRepository>>;

type ExperimentWithLinks<T extends 'all' | 'request' | 'response' = 'all'> =
    ReplaceWithIteratively<
        Experiment<T>,
        ['roles', 'devices', 'serviceConfigurations', 'connections'],
        [RoleName[], DeviceName[], ServiceConfigurationName[], PeerconnectionName[]]
    >;
export type ExperimentModelWithLinks = ReplaceWithIteratively<
    ExperimentModel,
    ['roles', 'devices', 'serviceConfigurations', 'connections'],
    [RoleName[], DeviceName[], ServiceConfigurationName[], PeerconnectionName[]]
>;
export type ExperimentEntityDataWithLinks = {
    request: ExperimentWithLinks<'request'>;
    model: ExperimentModelWithLinks;
    response: ExperimentWithLinks<'response'>;
};
export type ExperimentDataWithLinks = Record<
    ExperimentName,
    ExperimentEntityDataWithLinks
>;

export const experimentDataWithLinks: ExperimentDataWithLinks = {
    'example experiment': { ...example_experiment },
};

export function resolveLinksExperimentData(testData: TestDataWithLinks) {
    for (const experimentName of experimentNames) {
        const experiment = testData.experiments[experimentName];

        // resolve request.roles
        for (let i = 0; i < experiment.request.roles.length; i++) {
            const roleName = experiment.request.roles[i];
            (experiment.request.roles[i] as unknown as Role<'request'>) =
                testData.roles[roleName].request;
        }

        // resolve model.roles
        if (experiment.model.roles)
            for (let i = 0; i < experiment.model.roles.length; i++) {
                const roleName = experiment.model.roles[i];
                (experiment.model.roles[i] as unknown as RoleModelWithLinks) =
                    testData.roles[roleName].model;
            }

        // resolve response.roles
        for (let i = 0; i < experiment.response.roles.length; i++) {
            const roleName = experiment.response.roles[i];
            (experiment.response.roles[i] as unknown as Role<'response'>) =
                testData.roles[roleName].response;
        }

        // resolve request.devices
        for (let i = 0; i < experiment.request.devices.length; i++) {
            const deviceName = experiment.request.devices[i];
            (experiment.request.devices[i] as unknown as DeviceWithLinks<'request'>) =
                testData.devices[deviceName].request;
        }

        // resolve model.devices
        if (experiment.model.devices)
            for (let i = 0; i < experiment.model.devices.length; i++) {
                const deviceName = experiment.model.devices[i];
                (experiment.model.devices[i] as unknown as DeviceModelWithLinks) =
                    testData.devices[deviceName].model;
            }

        // resolve response.devices
        for (let i = 0; i < experiment.response.devices.length; i++) {
            const deviceName = experiment.response.devices[i];
            (experiment.response.devices[i] as unknown as DeviceWithLinks<'response'>) =
                testData.devices[deviceName].response;
        }

        // resolve request.serviceConfigurations
        for (let i = 0; i < experiment.request.serviceConfigurations.length; i++) {
            const serviceConfigurationName = experiment.request.serviceConfigurations[i];
            (experiment.request.serviceConfigurations[
                i
            ] as unknown as ServiceConfigurationWithLinks<'request'>) =
                testData.serviceConfigurations[serviceConfigurationName].request;
        }

        // resolve model.serviceConfigurations
        if (experiment.model.serviceConfigurations)
            for (let i = 0; i < experiment.model.serviceConfigurations.length; i++) {
                const serviceConfigurationName =
                    experiment.model.serviceConfigurations[i];
                (experiment.model.serviceConfigurations[
                    i
                ] as unknown as ServiceConfigurationModelWithLinks) =
                    testData.serviceConfigurations[serviceConfigurationName].model;
            }

        // resolve response.serviceConfigurations
        for (let i = 0; i < experiment.response.serviceConfigurations.length; i++) {
            const serviceConfigurationName = experiment.response.serviceConfigurations[i];
            (experiment.response.serviceConfigurations[
                i
            ] as unknown as ServiceConfigurationWithLinks<'response'>) =
                testData.serviceConfigurations[serviceConfigurationName].response;
        }

        // resolve model.connections
        if (experiment.model.connections)
            for (let i = 0; i < experiment.model.connections.length; i++) {
                const connectionName = experiment.model.connections[i];
                (experiment.model.connections[
                    i
                ] as unknown as PeerconnectionModelWithLinks) =
                    testData.peerconnections[connectionName].model;
            }

        // resolve response.connections
        for (let i = 0; i < experiment.response.connections.length; i++) {
            const connectionName = experiment.response.connections[i];
            (experiment.response.connections[i] as Experiment['connections'][number]) =
                testData.peerconnections[connectionName].response;
        }
    }
}
