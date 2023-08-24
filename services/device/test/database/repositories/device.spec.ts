import { AppDataSource, repositories } from '../../../src/database/dataSource';
import { DeviceModel } from '../../../src/database/model';
import { DeviceRepository } from '../../../src/database/repositories/device';
import { Device, DeviceUpdate } from '../../../src/generated/types';
import { deviceData, DeviceName, deviceNames } from '../../data/devices/index.spec';
import { concreteDeviceRepositoryTestSuite } from './device/concreteDevice.spec';
import { deviceGroupRepositoryTestSuite } from './device/deviceGroup.spec';
import { instantiableBrowserDeviceRepositoryTestSuite } from './device/instantiableBrowserDevice.spec';
import { instantiableCloudDeviceRepositoryTestSuite } from './device/instantiableCloudDevice.spec';
import { initTestDatabase } from './index.spec';
import { AbstractRepositoryTestSuite } from '@crosslab/service-common/test-helper';
import assert from 'assert';
import Mocha from 'mocha';
import { FindOptionsWhere } from 'typeorm';

class DeviceRepositoryTestSuite extends AbstractRepositoryTestSuite<
    DeviceName,
    DeviceRepository
> {
    protected name = 'devices' as const;
    protected repository = repositories.device;
    protected getEntityData = async () => (await initTestDatabase()).devices;
    protected RepositoryClass = DeviceRepository;

    constructor() {
        super(AppDataSource);
    }

    public async initialize(): Promise<void> {
        await super.initialize();
        if (!this.testSuites) throw new Error('Test suites have not been initialized!');

        this.removeSuite('write');
        this.addSuite('write', (data) => {
            const testSuite = new Mocha.Suite('write');

            for (const key of deviceNames) {
                testSuite.addTest(
                    new Mocha.Test(
                        `should write valid data to a model correctly (${key})`,
                        async function () {
                            const name = deviceData[key].request.name;
                            const type = deviceData[key].request.type;
                            const isPublic = deviceData[key].request.isPublic;
                            const model =
                                type === 'group'
                                    ? await data.repository.create({
                                          name,
                                          type,
                                          devices: [],
                                          isPublic,
                                      })
                                    : await data.repository.create({
                                          name,
                                          type,
                                          isPublic,
                                      });
                            assert(data.validateCreate(model));
                            await data.repository.write(
                                model,
                                data.entityData[key].request,
                            );
                            assert(
                                data.validateWrite(model, data.entityData[key].request),
                            );
                        },
                    ),
                );
            }

            return testSuite;
        });

        // remove this test since input is needed for this repository's create function
        this.testSuites.create.tests = this.testSuites.create.tests.filter(
            (test) => test.title !== 'should create a model from empty data',
        );
    }

    validateCreate(model: DeviceModel, data?: Device<'request'> | undefined): boolean {
        if (!data) return true;

        switch (model.type) {
            case 'cloud instantiable':
                assert(data?.type === model.type);
                return instantiableCloudDeviceRepositoryTestSuite.validateCreate(
                    model,
                    data,
                );
            case 'device':
                assert(data?.type === model.type);
                return concreteDeviceRepositoryTestSuite.validateCreate(model, data);
            case 'edge instantiable':
                assert(data?.type === model.type);
                return instantiableBrowserDeviceRepositoryTestSuite.validateCreate(
                    model,
                    data,
                );
            case 'group':
                assert(data?.type === model.type);
                return deviceGroupRepositoryTestSuite.validateCreate(model, data);
        }
    }

    validateWrite(model: DeviceModel, data: DeviceUpdate<'request'>): boolean {
        switch (model.type) {
            case 'cloud instantiable':
                assert(data?.type === model.type);
                return instantiableCloudDeviceRepositoryTestSuite.validateWrite(
                    model,
                    data,
                );
            case 'device':
                assert(data?.type === model.type);
                return concreteDeviceRepositoryTestSuite.validateWrite(model, data);
            case 'edge instantiable':
                assert(data?.type === model.type);
                return instantiableBrowserDeviceRepositoryTestSuite.validateWrite(
                    model,
                    data,
                );
            case 'group':
                assert(data?.type === model.type);
                return deviceGroupRepositoryTestSuite.validateWrite(model, data);
        }
    }

    validateFormat(
        model: DeviceModel,
        data: Device<'response'>,
        options?: { flatten?: boolean },
    ): boolean {
        switch (model.type) {
            case 'cloud instantiable':
                assert(data?.type === model.type);
                return instantiableCloudDeviceRepositoryTestSuite.validateFormat(
                    model,
                    data,
                );
            case 'device':
                assert(data?.type === model.type);
                return concreteDeviceRepositoryTestSuite.validateFormat(model, data);
            case 'edge instantiable':
                assert(data?.type === model.type);
                return instantiableBrowserDeviceRepositoryTestSuite.validateFormat(
                    model,
                    data,
                );
            case 'group':
                assert(data?.type === model.type);
                return deviceGroupRepositoryTestSuite.validateFormat(
                    model,
                    data,
                    options?.flatten,
                );
        }
    }

    compareModels(
        firstModel: DeviceModel,
        secondModel: DeviceModel,
        complete?: boolean,
    ): boolean {
        const sameId = firstModel.uuid === secondModel.uuid;

        if (!complete) return sameId;

        switch (firstModel.type) {
            case 'cloud instantiable':
                assert(firstModel.type === secondModel.type);
                return instantiableCloudDeviceRepositoryTestSuite.compareModels(
                    firstModel,
                    secondModel,
                );
            case 'device':
                assert(firstModel.type === secondModel.type);
                return concreteDeviceRepositoryTestSuite.compareModels(
                    firstModel,
                    secondModel,
                );
            case 'edge instantiable':
                assert(firstModel.type === secondModel.type);
                return instantiableBrowserDeviceRepositoryTestSuite.compareModels(
                    firstModel,
                    secondModel,
                );
            case 'group':
                assert(firstModel.type === secondModel.type);
                return deviceGroupRepositoryTestSuite.compareModels(
                    firstModel,
                    secondModel,
                );
        }
    }

    compareFormatted(first: Device<'response'>, second: Device<'response'>): boolean {
        switch (first.type) {
            case 'cloud instantiable':
                if (!(first.type === second.type)) return false;
                return instantiableCloudDeviceRepositoryTestSuite.compareFormatted(
                    first,
                    second,
                );
            case 'device':
                if (!(first.type === second.type)) return false;
                return concreteDeviceRepositoryTestSuite.compareFormatted(first, second);
            case 'edge instantiable':
                if (!(first.type === second.type)) return false;
                return instantiableBrowserDeviceRepositoryTestSuite.compareFormatted(
                    first,
                    second,
                );
            case 'group':
                if (!(first.type === second.type)) return false;
                return deviceGroupRepositoryTestSuite.compareFormatted(first, second);
        }
    }

    getFindOptionsWhere(model?: DeviceModel): FindOptionsWhere<DeviceModel> {
        return {
            uuid: model ? model.uuid : 'non-existent',
        };
    }
}

export const deviceRepositoryTestSuite = new DeviceRepositoryTestSuite();
