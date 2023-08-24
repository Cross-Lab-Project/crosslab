import { AppDataSource, repositories } from '../../../../src/database/dataSource';
import { InstantiableCloudDeviceModel } from '../../../../src/database/model';
import { InstantiableCloudDeviceRepository } from '../../../../src/database/repositories/device/instantiableCloudDevice';
import {
    InstantiableCloudDevice,
    InstantiableCloudDeviceUpdate,
} from '../../../../src/generated/types';
import { InstantiableCloudDeviceName } from '../../../data/devices/instantiableCloudDevices/index.spec';
import { initTestDatabase } from '../index.spec';
import { DeviceOverviewRepositoryTestSuite } from './deviceOverview.spec';
import { AbstractRepositoryTestSuite } from '@crosslab/service-common/test-helper';
import assert from 'assert';
import { FindOptionsWhere } from 'typeorm';

class InstantiableCloudDeviceRepositoryTestSuite extends AbstractRepositoryTestSuite<
    InstantiableCloudDeviceName,
    InstantiableCloudDeviceRepository
> {
    protected name = 'instantiable cloud devices' as const;
    protected repository = repositories.instantiableCloudDevice;
    protected getEntityData = async () =>
        (await initTestDatabase())['instantiable cloud devices'];
    protected RepositoryClass = InstantiableCloudDeviceRepository;

    constructor() {
        super(AppDataSource);
    }

    validateCreate(
        model: InstantiableCloudDeviceModel,
        data?: InstantiableCloudDevice<'request'>,
    ): boolean {
        if (!data) return true;

        assert(DeviceOverviewRepositoryTestSuite.validateCreate(model, data));
        assert(this.validateWrite(model, data));

        return true;
    }

    validateWrite(
        model: InstantiableCloudDeviceModel,
        data: InstantiableCloudDeviceUpdate<'request'>,
    ): boolean {
        assert(DeviceOverviewRepositoryTestSuite.validateWrite(model, data));
        if (data.codeUrl) assert(model.instantiateUrl === data.codeUrl);
        if (data.services)
            assert(JSON.stringify(model.services) === JSON.stringify(data.services));

        return true;
    }

    validateFormat(
        model: InstantiableCloudDeviceModel,
        data: InstantiableCloudDevice<'response'>,
    ): boolean {
        assert(DeviceOverviewRepositoryTestSuite.validateFormat(model, data));
        assert(data.instantiateUrl === model.instantiateUrl);
        assert(
            JSON.stringify(data.services) === JSON.stringify(model.services ?? undefined),
        );

        return true;
    }

    compareModels(
        firstModel: InstantiableCloudDeviceModel,
        secondModel: InstantiableCloudDeviceModel,
        complete?: boolean,
    ): boolean {
        const sameId = firstModel.uuid === secondModel.uuid;

        if (!complete) return sameId;

        assert(DeviceOverviewRepositoryTestSuite.compareModels(firstModel, secondModel));
        assert(firstModel.instantiateUrl === secondModel.instantiateUrl);
        assert(
            JSON.stringify(firstModel.instances) ===
                JSON.stringify(secondModel.instances),
        );
        assert(
            JSON.stringify(firstModel.services) === JSON.stringify(secondModel.services),
        );

        return true;
    }

    compareFormatted(
        first: InstantiableCloudDevice<'response'>,
        second: InstantiableCloudDevice<'response'>,
    ): boolean {
        let isEqual = true;

        isEqual &&= DeviceOverviewRepositoryTestSuite.compareFormatted(first, second);
        isEqual &&= first.instantiateUrl === second.instantiateUrl;
        isEqual &&= JSON.stringify(first.services) === JSON.stringify(second.services);

        return isEqual;
    }

    getFindOptionsWhere(
        model?: InstantiableCloudDeviceModel,
    ): FindOptionsWhere<InstantiableCloudDeviceModel> {
        return {
            uuid: model ? model.uuid : 'non-existent',
        };
    }
}

export const instantiableCloudDeviceRepositoryTestSuite =
    new InstantiableCloudDeviceRepositoryTestSuite();
