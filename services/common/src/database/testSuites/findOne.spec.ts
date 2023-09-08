import assert, { fail } from 'assert';
import Mocha from 'mocha';

import { UninitializedRepositoryError } from '../../errors.js';
import { AbstractRepository } from '../abstractRepository.js';
import { ModelType, RepositoryTestData } from './types.spec.js';

export function testSuiteFindOne<
  K extends string,
  R extends AbstractRepository<object, unknown, unknown, Record<string, object>>,
>(repositoryTestData: RepositoryTestData<K, R>) {
  const testSuite = new Mocha.Suite('findOne');

  for (const key in repositoryTestData.entityData) {
    testSuite.addTest(
      new Mocha.Test(`should find a specific existing model (${key})`, async function () {
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
      }),
    );
  }

  testSuite.addTest(
    new Mocha.Test('should return null when the model does not exist', async function () {
      const model = await repositoryTestData.repository.findOne({
        where: repositoryTestData.getFindOptionsWhere(),
      });
      assert(model === null);
    }),
  );

  testSuite.addTest(
    new Mocha.Test(
      'should throw an UninitializedRepositoryError if the repository has not been initialized',
      async function () {
        const unitializedRepository: R = new repositoryTestData.RepositoryClass();
        try {
          await unitializedRepository.findOne({});
          fail();
        } catch (error) {
          assert(error instanceof UninitializedRepositoryError);
        }
      },
    ),
  );

  return testSuite;
}
