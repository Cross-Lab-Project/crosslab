import { AppDataSource, repositories } from '../../../src/database/dataSource';
import { InstanceModel } from '../../../src/database/model';
import { InstanceRepository } from '../../../src/database/repositories/instance';
import { Instance } from '../../../src/types/types';
import { InstanceName } from '../../data/instances/index.spec';
import { initTestDatabase } from './index.spec';
import { AbstractRepositoryTestSuite } from '@crosslab/service-common/test-helper';
import assert from 'assert';
import { FindOptionsWhere } from 'typeorm';

class InstanceRepositoryTestSuite extends AbstractRepositoryTestSuite<
    InstanceName,
    InstanceRepository
> {
    protected name = 'instances' as const;
    protected repository = repositories.instance;
    protected getEntityData = async () => (await initTestDatabase())['instances'];
    protected RepositoryClass = InstanceRepository;

    constructor() {
        super(AppDataSource);
    }

    validateCreate(model: InstanceModel, data?: Instance): boolean {
        if (!data) return true;

        assert(this.validateWrite(model, data));

        return true;
    }

    validateWrite(model: InstanceModel, data: Partial<Instance>): boolean {
        if (data.codeUrl) assert.strictEqual(model.codeUrl, data.codeUrl);
        if (data.token) assert.strictEqual(model.token, data.token);
        if (data.url) assert.strictEqual(model.url, data.url);

        return true;
    }

    validateFormat(model: InstanceModel, data: Instance): boolean {
        assert.strictEqual(data.codeUrl, model.codeUrl);
        assert.strictEqual(data.token, model.token);
        assert.strictEqual(data.url, model.url);

        return true;
    }

    compareModels(
        firstModel: InstanceModel,
        secondModel: InstanceModel,
        complete?: boolean,
    ): boolean {
        if (!complete) return firstModel.uuid === secondModel.uuid;

        assert.strictEqual(firstModel.codeUrl, secondModel.codeUrl);
        assert.strictEqual(firstModel.token, secondModel.token);
        assert.strictEqual(firstModel.url, secondModel.url);
        assert.strictEqual(firstModel.uuid, secondModel.uuid);

        return true;
    }

    compareFormatted(first: Instance, second: Instance): boolean {
        assert.strictEqual(first.codeUrl, second.codeUrl);
        assert.strictEqual(first.token, second.token);
        assert.strictEqual(first.url, second.url);

        return true;
    }

    getFindOptionsWhere(model?: InstanceModel): FindOptionsWhere<InstanceModel> {
        return {
            uuid: model ? model.uuid : 'non-existent',
        };
    }
}

export const instanceRepositoryTestSuite = new InstanceRepositoryTestSuite();
