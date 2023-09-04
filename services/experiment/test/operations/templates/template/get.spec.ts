import { getTemplatesByTemplateId } from '../../../../src/operations/templates';
import { TestData } from '../../../data/index.spec';
import { templateNames } from '../../../data/templates/index.spec';
import { templateRepositoryTestSuite } from '../../../database/repositories/template.spec';
import { addTest, stubbedAuthorization } from '../../index.spec';
import { MissingEntityError } from '@crosslab/service-common';
import assert from 'assert';
import Mocha from 'mocha';

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('GET /templates/{template_id}', context);

    addTest(
        suite,
        'should throw a MissingEntityError if template is not found',
        async function () {
            await assert.rejects(
                async () => {
                    await getTemplatesByTemplateId(stubbedAuthorization, {
                        template_id: 'non-existent',
                    });
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

    addTest(suite, 'should return the formatted template', async function () {
        for (const templateName of templateNames) {
            const template = testData.templates[templateName];
            const result = await getTemplatesByTemplateId(stubbedAuthorization, {
                template_id: template.model.uuid,
            });

            assert(result.status === 200);
            assert(
                templateRepositoryTestSuite.validateFormat(template.model, result.body),
            );
            assert(
                templateRepositoryTestSuite.compareFormatted(
                    template.response,
                    result.body,
                ),
            );
        }
    });

    return suite;
}
