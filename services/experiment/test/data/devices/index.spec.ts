import { DeviceModel, InstanceModel } from '../../../src/database/model.js';
import { DeviceRepository } from '../../../src/database/repositories/device.js';
import { Device } from '../../../src/generated/types.js';
import { ExperimentModelWithLinks, ExperimentName } from '../experiments/index.spec.js';
import { ReplaceWithIteratively, TestDataWithLinks } from '../index.spec.js';
import { InstanceName } from '../instances/index.spec.js';
import { RoleName } from '../roles/index.spec.js';
import { example_device } from './example_device.spec.js';
import { EntityData } from '@crosslab/service-common/test-helper';

export const deviceNames = ['example device'] as const;
export type DeviceName = (typeof deviceNames)[number];
export type DeviceData = Record<DeviceName, EntityData<DeviceRepository>>;

export type DeviceWithLinks<T extends 'all' | 'request' | 'response' = 'all'> =
    ReplaceWithIteratively<Device<T>, ['role'], [RoleName]>;
export type DeviceModelWithLinks = ReplaceWithIteratively<
    DeviceModel,
    ['role', 'experiment', 'instance'],
    [RoleName, ExperimentName, InstanceName]
>;
export type DeviceEntityDataWithLinks = {
    request: DeviceWithLinks<'request'>;
    model: DeviceModelWithLinks;
    response: DeviceWithLinks<'response'>;
};
export type DeviceDataWithLinks = Record<DeviceName, DeviceEntityDataWithLinks>;

export const deviceDataWithLinks: DeviceDataWithLinks = {
    'example device': { ...example_device },
};

export function resolveLinksDeviceData(testData: TestDataWithLinks) {
    for (const deviceName of deviceNames) {
        const device = testData.devices[deviceName];

        // resolve request.role
        const requestRoleName = device.request.role;
        if (requestRoleName)
            (device.request.role as Device<'request'>['role']) =
                testData.roles[requestRoleName].request.name;

        // resolve model.role
        const modelRoleName = device.model.role;
        if (modelRoleName)
            (device.model.role as DeviceModel['role']) =
                testData.roles[modelRoleName].model.name;

        // resolve response.role
        const responseRoleName = device.response.role;
        if (responseRoleName)
            (device.response.role as Device<'response'>['role']) =
                testData.roles[responseRoleName].response.name;

        // resolve model.experiment
        const modelExperimentName = device.model.experiment;
        (device.model.experiment as unknown as ExperimentModelWithLinks) =
            testData.experiments[modelExperimentName].model;

        // resolve model.instance
        const modelInstanceName = device.model.instance;
        if (modelInstanceName)
            (device.model.instance as unknown as InstanceModel) =
                testData.instances[modelInstanceName].model;
    }
}
