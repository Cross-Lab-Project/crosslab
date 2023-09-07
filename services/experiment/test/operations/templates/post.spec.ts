import { repositories } from '../../../src/database/dataSource.js';
import { postTemplates } from '../../../src/operations/templates.js';
import { TestData } from '../../data/index.spec.js';
import { templateNames } from '../../data/templates/index.spec.js';
import { templateRepositoryTestSuite } from '../../database/repositories/template.spec.js';
import { addTest, stubbedAuthorization } from '../index.spec.js';
import assert from 'assert';
import Mocha from 'mocha';

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('POST /templates', context);

    addTest(suite, 'should create a new template correctly', async function () {
        for (const templateName of templateNames) {
            const template = testData.templates[templateName];

            const result = await postTemplates(stubbedAuthorization, template.request);

            const templateModel = await repositories.template.findOneOrFail({
                where: {
                    uuid: result.body?.url.split('/').at(-1),
                },
            });

            assert.strictEqual(result.status, 201);
            assert(
                templateRepositoryTestSuite.validateWrite(
                    templateModel,
                    template.request,
                ),
            );
            assert(
                templateRepositoryTestSuite.validateFormat(templateModel, result.body),
            );
        }
    });

    return suite;
}
