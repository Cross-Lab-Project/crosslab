import { MissingEntityError } from '@crosslab/service-common';
import assert from 'assert';

import { patchExperimentsByExperimentId } from '../../../../src/operations/experiments.js';
import { TestData } from '../../../data/index.spec.js';
import { addTest, stubbedAuthorization } from '../../index.spec.js';

export default function (context: Mocha.Context, _testData: TestData) {
  const suite = new Mocha.Suite('PATCH /experiments/{experiment_id}', context);

  addTest(
    suite,
    'should throw a MissingEntityError if device is not found',
    async function () {
      await assert.rejects(
        async () => {
          await patchExperimentsByExperimentId(
            stubbedAuthorization,
            { experiment_id: 'non-existent' },
            {},
          );
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

  return suite;
}
