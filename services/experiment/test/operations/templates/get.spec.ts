import { getTemplates } from '../../../src/operations/templates';
import { TestData } from '../../data/index.spec';
import { templateNames } from '../../data/templates/index.spec';
import { templateRepositoryTestSuite } from '../../database/repositories/template.spec';
import { addTest, stubbedAuthorization } from '../index.spec';
import assert from 'assert';
import Mocha from 'mocha';

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('GET /templates', context);

    addTest(suite, 'should get all templates', async function () {
        const result = await getTemplates(stubbedAuthorization);
        assert(result.status === 200);

        for (const templateName of templateNames) {
            const searchedTemplate = testData.templates[templateName];
            assert(
                result.body.find(
                    (template) =>
                        templateRepositoryTestSuite.validateFormatOverview(
                            searchedTemplate.model,
                            template,
                        ) &&
                        templateRepositoryTestSuite.compareFormattedOverview(
                            template,
                            searchedTemplate.response,
                        ),
                ),
            );
        }
    });

    return suite;
}
