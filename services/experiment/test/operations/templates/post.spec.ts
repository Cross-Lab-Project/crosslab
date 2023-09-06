import { repositories } from '../../../src/database/dataSource';
import { postTemplates } from '../../../src/operations/templates';
import { TestData } from '../../data/index.spec';
import { templateNames } from '../../data/templates/index.spec';
import { templateRepositoryTestSuite } from '../../database/repositories/template.spec';
import { addTest, stubbedAuthorization } from '../index.spec';
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
