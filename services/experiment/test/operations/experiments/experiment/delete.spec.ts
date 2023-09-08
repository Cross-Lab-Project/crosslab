import { MissingEntityError } from '@crosslab/service-common';
import assert from 'assert';
import Mocha from 'mocha';

import { repositories } from '../../../../src/database/dataSource.js';
import { deleteExperimentsByExperimentId } from '../../../../src/operations/experiments.js';
import { experimentNames } from '../../../data/experiments/index.spec.js';
import { TestData } from '../../../data/index.spec.js';
import { addTest, stubbedAuthorization } from '../../index.spec.js';

export default function (context: Mocha.Context, testData: TestData) {
  const suite = new Mocha.Suite('DELETE /experiments/{experiment_id}', context);

  addTest(
    suite,
    'should throw a MissingEntityError if experiment is not found',
    async function () {
      await assert.rejects(
        async () => {
          await deleteExperimentsByExperimentId(stubbedAuthorization, {
            experiment_id: 'non-existent',
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

  addTest(suite, 'should delete the experiment', async function () {
    for (const experimentName of experimentNames) {
      const experimentModel = testData.experiments[experimentName].model;

      const result = await deleteExperimentsByExperimentId(stubbedAuthorization, {
        experiment_id: experimentModel.uuid,
      });

      assert.strictEqual(result.status, 204);
      assert(
        (await repositories.experiment.findOne({
          where: {
            uuid: experimentModel.uuid,
          },
        })) === null,
        'Experiment could still be found',
      );
    }
  });

  return suite;
}
