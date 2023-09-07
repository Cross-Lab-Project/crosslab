import { repositories } from '../../../../src/database/dataSource.js';
import { TemplateUpdate } from '../../../../src/generated/types.js';
import { patchTemplatesByTemplateId } from '../../../../src/operations/templates.js';
import { TestData } from '../../../data/index.spec.js';
import { templateNames } from '../../../data/templates/index.spec.js';
import { templateRepositoryTestSuite } from '../../../database/repositories/template.spec.js';
import { addTest, stubbedAuthorization } from '../../index.spec.js';
import { MissingEntityError } from '@crosslab/service-common';
import assert from 'assert';
import Mocha from 'mocha';

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('PATCH /templates/{template_id}', context);

    addTest(
        suite,
        'should throw a MissingEntityError if template is not found',
        async function () {
            await assert.rejects(
                async () => {
                    await patchTemplatesByTemplateId(
                        stubbedAuthorization,
                        {
                            template_id: 'non-existent',
                        },
                        {},
                    );
                },
                (error) => {
                    assert(
                        error instanceof MissingEntityError,
                        'Error is not an instance of MissingEntityError',
                    );
                    assert.strictEqual(error.status, 404);

                    return true;
                },
            );
        },
    );

    addTest(suite, 'should update a template correctly', async function () {
        for (const templateName of templateNames) {
            const template = testData.templates[templateName];
            const templateUpdate: TemplateUpdate<'request'> = {
                name: template.request.name + ' (new)',
                description: template.request.description + ' (new)',
                configuration: {
                    devices: [],
                    roles: [],
                    serviceConfigurations: [],
                },
            };

            const result = await patchTemplatesByTemplateId(
                stubbedAuthorization,
                {
                    template_id: template.model.uuid,
                },
                templateUpdate,
            );

            const templateModel = await repositories.template.findOneOrFail({
                where: {
                    uuid: template.model.uuid,
                },
            });

            assert.strictEqual(result.status, 200);
            assert(
                templateRepositoryTestSuite.validateWrite(templateModel, templateUpdate),
            );
            assert(
                templateRepositoryTestSuite.validateFormat(templateModel, result.body),
            );
        }
    });

    return suite;
}
