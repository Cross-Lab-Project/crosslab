import assert, { fail } from 'assert';
import Mocha from 'mocha';

import { UninitializedRepositoryError } from '../../errors.js';
import { AbstractRepository } from '../abstractRepository.js';
import { ModelType, RepositoryTestData } from './types.spec.js';

export function testSuiteRemove<
  K extends string,
  R extends AbstractRepository<object, unknown, unknown, Record<string, object>>,
>(repositoryTestData: RepositoryTestData<K, R>) {
  const testSuite = new Mocha.Suite('remove');

  for (const key in repositoryTestData.entityData) {
    testSuite.addTest(
      new Mocha.Test(
        `should remove a specific existing model (${key})`,
        async function () {
          const model = (await repositoryTestData.repository.findOne({
            where: repositoryTestData.getFindOptionsWhere(
              repositoryTestData.entityData[key].model,
            ),
          })) as ModelType<R>;
          assert(model);
          assert(
            repositoryTestData.compareModels(
              model,
              repositoryTestData.entityData[key].model,
              false,
            ),
          );
          await repositoryTestData.repository.remove(model);
          assert(
            (await repositoryTestData.repository.findOne({
              where: repositoryTestData.getFindOptionsWhere(
                repositoryTestData.entityData[key].model,
              ),
            })) === null,
          );
        },
      ),
    );
  }

  testSuite.addTest(
    new Mocha.Test(
      'should throw an UninitializedRepositoryError if the repository has not been initialized',
      async function () {
        for (const key in repositoryTestData.entityData) {
          const unitializedRepository: R = new repositoryTestData.RepositoryClass();
          try {
            await unitializedRepository.remove(repositoryTestData.entityData[key].model);
            fail();
          } catch (error) {
            assert(error instanceof UninitializedRepositoryError);
          }
        }
      },
    ),
  );

  return testSuite;
}
