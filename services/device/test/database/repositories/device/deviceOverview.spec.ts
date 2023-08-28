import { DeviceOverviewModel } from '../../../../src/database/model';
import { DeviceOverviewRepository } from '../../../../src/database/repositories/device/deviceOverview';
import {
    Device,
    DeviceOverview,
    DeviceOverviewUpdate,
} from '../../../../src/generated/types';
import { deviceUrlFromId } from '../../../../src/methods/urlFromId';
import { DeviceName } from '../../../data/devices/index.spec';
import { AbstractRepositoryTestSuite } from '@crosslab/service-common/test-helper';
import assert from 'assert';

export abstract class DeviceOverviewRepositoryTestSuite extends AbstractRepositoryTestSuite<
    DeviceName,
    DeviceOverviewRepository
> {
    static validateCreate(model: DeviceOverviewModel, data?: Device<'request'>): boolean {
        if (!data) return true;

        assert(model.type === data.type);
        assert(this.validateWrite(model, data));

        return true;
    }

    static validateWrite(
        model: DeviceOverviewModel,
        data: DeviceOverviewUpdate<'request'>,
    ): boolean {
        if (data.name) assert(model.name === data.name);
        if (data.description) assert(model.description === data.description);

        return true;
    }

    static validateFormat(
        model: DeviceOverviewModel,
        data: DeviceOverview<'response'>,
    ): boolean {
        assert(data.description === (model.description ?? undefined));
        assert(data.name === model.name);
        // TODO: remove or add back if owner becomes usable again
        // assert(data.owner === model.owner);
        assert(data.type === model.type);
        assert(data.url === deviceUrlFromId(model.uuid));

        return true;
    }

    static compareModels(
        firstModel: DeviceOverviewModel,
        secondModel: DeviceOverviewModel,
        complete?: boolean,
    ): boolean {
        const sameId = firstModel.uuid === secondModel.uuid;

        if (!complete) return sameId;

        assert(firstModel.deletedAt === secondModel.deletedAt);
        assert(firstModel.description === secondModel.description);
        assert(firstModel.name === secondModel.name);
        assert(firstModel.owner === secondModel.owner);
        assert(firstModel.type === secondModel.type);

        return true;
    }

    static compareFormatted(
        first: DeviceOverview<'response'>,
        second: DeviceOverview<'response'>,
    ): boolean {
        let isEqual = true;

        isEqual &&= first.description === second.description;
        isEqual &&= first.name === second.name;
        // TODO: remove or add back if owner becomes usable again
        // isEqual &&= first.owner === second.owner;
        isEqual &&= first.type === second.type;
        isEqual &&= first.url === second.url;

        return isEqual;
    }
}
