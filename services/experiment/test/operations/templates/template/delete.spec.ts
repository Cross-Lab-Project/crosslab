import { MissingEntityError } from '@crosslab/service-common';
import assert from 'assert';
import Mocha from 'mocha';

import { repositories } from '../../../../src/database/dataSource.js';
import { deleteTemplatesByTemplateId } from '../../../../src/operations/templates.js';
import { TestData } from '../../../data/index.spec.js';
import { templateNames } from '../../../data/templates/index.spec.js';
import { addTest, stubbedAuthorization } from '../../index.spec.js';

export default function (context: Mocha.Context, testData: TestData) {
  const suite = new Mocha.Suite('DELETE /templates/{template_id}', context);

  addTest(
    suite,
    'should throw a MissingEntityError if template is not found',
    async function () {
      await assert.rejects(
        async () => {
          await deleteTemplatesByTemplateId(stubbedAuthorization, {
            template_id: 'non-existent',
          });
        },
        error => {
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

  addTest(suite, 'should delete the template', async function () {
    for (const templateName of templateNames) {
      const templateModel = testData.templates[templateName].model;

      const result = await deleteTemplatesByTemplateId(stubbedAuthorization, {
        template_id: templateModel.uuid,
      });

      assert.strictEqual(result.status, 204);
      assert(
        (await repositories.template.findOne({
          where: {
            uuid: templateModel.uuid,
          },
        })) === null,
        'Template could still be found',
      );
    }
  });

  return suite;
}
