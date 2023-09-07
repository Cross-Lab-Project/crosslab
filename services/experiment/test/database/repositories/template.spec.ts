import { AppDataSource, repositories } from '../../../src/database/dataSource.js';
import { TemplateModel } from '../../../src/database/model.js';
import { TemplateRepository } from '../../../src/database/repositories/template.js';
import { Template, TemplateOverview, TemplateUpdate } from '../../../src/generated/types.js';
import { templateUrlFromId } from '../../../src/methods/url.js';
import { TemplateName } from '../../data/templates/index.spec.js';
import { initTestDatabase } from './index.spec.js';
import { AbstractRepositoryTestSuite } from '@crosslab/service-common/test-helper';
import assert from 'assert';
import { FindOptionsWhere } from 'typeorm';

class TemplateRepositoryTestSuite extends AbstractRepositoryTestSuite<
    TemplateName,
    TemplateRepository
> {
    protected name = 'templates' as const;
    protected repository = repositories.template;
    protected getEntityData = async () => (await initTestDatabase())['templates'];
    protected RepositoryClass = TemplateRepository;

    constructor() {
        super(AppDataSource);
    }

    validateCreate(model: TemplateModel, data?: Template<'request'>): boolean {
        if (!data) return true;

        assert(this.validateWrite(model, data));

        return true;
    }

    validateWrite(model: TemplateModel, data: TemplateUpdate<'request'>): boolean {
        if (data.configuration?.devices)
            assert.strictEqual(
                JSON.stringify(model.configuration.devices),
                JSON.stringify(data.configuration.devices),
            );
        if (data.configuration?.roles)
            assert.strictEqual(
                JSON.stringify(model.configuration.roles),
                JSON.stringify(data.configuration.roles),
            );
        if (data.configuration?.roles)
            assert.strictEqual(
                JSON.stringify(model.configuration.serviceConfigurations),
                JSON.stringify(data.configuration.serviceConfigurations),
            );
        if (data.description) assert.strictEqual(model.description, data.description);
        if (data.name) assert.strictEqual(model.name, data.name);

        return true;
    }

    validateFormat(model: TemplateModel, data: Template<'response'>): boolean {
        assert.strictEqual(
            JSON.stringify(data.configuration),
            JSON.stringify(model.configuration),
        );
        assert.strictEqual(data.description, model.description);
        assert.strictEqual(data.name, model.name);
        assert.strictEqual(data.url, templateUrlFromId(model.uuid));

        return true;
    }

    validateFormatOverview(
        model: TemplateModel,
        data: TemplateOverview<'response'>,
    ): boolean {
        assert.strictEqual(data.description, model.description);
        assert.strictEqual(data.name, model.name);
        assert.strictEqual(data.url, templateUrlFromId(model.uuid));

        return true;
    }

    compareModels(
        firstModel: TemplateModel,
        secondModel: TemplateModel,
        complete?: boolean,
    ): boolean {
        if (!complete) return firstModel.uuid === secondModel.uuid;

        assert.strictEqual(
            JSON.stringify(firstModel.configuration),
            JSON.stringify(secondModel.configuration),
        );
        assert.strictEqual(firstModel.description, secondModel.description);
        assert.strictEqual(firstModel.name, secondModel.name);
        assert.strictEqual(firstModel.uuid, secondModel.uuid);

        return true;
    }

    compareFormatted(first: Template<'response'>, second: Template<'response'>): boolean {
        assert.strictEqual(
            JSON.stringify(first.configuration),
            JSON.stringify(second.configuration),
        );
        assert.strictEqual(first.description, second.description);
        assert.strictEqual(first.name, second.name);
        assert.strictEqual(first.url, second.url);

        return true;
    }

    compareFormattedOverview(
        first: TemplateOverview<'response'>,
        second: TemplateOverview<'response'>,
    ): boolean {
        assert.strictEqual(first.description, second.description);
        assert.strictEqual(first.name, second.name);
        assert.strictEqual(first.url, second.url);

        return true;
    }

    getFindOptionsWhere(model?: TemplateModel): FindOptionsWhere<TemplateModel> {
        return {
            uuid: model ? model.uuid : 'non-existent',
        };
    }
}

export const templateRepositoryTestSuite = new TemplateRepositoryTestSuite();
