import assert, { fail } from 'assert';
import Mocha from 'mocha';

import { UninitializedRepositoryError } from '../../errors.js';
import { AbstractRepository } from '../abstractRepository.js';
import { ModelType, RepositoryTestData } from './types.spec.js';

export function testSuiteFind<
  K extends string,
  R extends AbstractRepository<object, unknown, unknown, Record<string, object>>,
>(repositoryTestData: RepositoryTestData<K, R>) {
  const testSuite = new Mocha.Suite('find');

  testSuite.addTest(
    new Mocha.Test('should find all models', async function () {
      const models = (await repositoryTestData.repository.find()) as ModelType<R>[];
      for (const key in repositoryTestData.entityData) {
        assert(
          models.find(model =>
            repositoryTestData.compareModels(
              model,
              repositoryTestData.entityData[key].model,
              false,
            ),
          ),
          `Did not find model for entity data "${key}"`,
        );
      }
    }),
  );

  testSuite.addTest(
    new Mocha.Test(
      'should throw an UninitializedRepositoryError if the repository has not been initialized',
      async function () {
        const unitializedRepository: R = new repositoryTestData.RepositoryClass();
        try {
          await unitializedRepository.find();
          fail();
        } catch (error) {
          assert(error instanceof UninitializedRepositoryError);
        }
      },
    ),
  );

  return testSuite;
}
