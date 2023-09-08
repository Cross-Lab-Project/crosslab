import assert from 'assert';
import Mocha from 'mocha';

import { getTemplates } from '../../../src/operations/templates.js';
import { TestData } from '../../data/index.spec.js';
import { templateNames } from '../../data/templates/index.spec.js';
import { templateRepositoryTestSuite } from '../../database/repositories/template.spec.js';
import { addTest, stubbedAuthorization } from '../index.spec.js';

export default function (context: Mocha.Context, testData: TestData) {
  const suite = new Mocha.Suite('GET /templates', context);

  addTest(suite, 'should get all templates', async function () {
    const result = await getTemplates(stubbedAuthorization);
    assert(result.status === 200);

    for (const templateName of templateNames) {
      const searchedTemplate = testData.templates[templateName];
      assert(
        result.body.find(
          template =>
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
