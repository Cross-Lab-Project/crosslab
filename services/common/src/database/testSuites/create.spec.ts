import assert, {fail} from 'assert';
import Mocha from 'mocha';

import {UninitializedRepositoryError} from '../../errors';
import {AbstractRepository} from '../abstractRepository';
import {ModelType, RepositoryTestData} from './types.spec';

export function testSuiteCreate<
  K extends string,
  R extends AbstractRepository<object, unknown, unknown>,
>(repositoryTestData: RepositoryTestData<K, R>) {
  const testSuite = new Mocha.Suite('create');

  testSuite.addTest(
    new Mocha.Test('should create a model from empty data', async function () {
      const model = (await repositoryTestData.repository.create()) as ModelType<R>;

      assert(repositoryTestData.validateCreate(model));
    }),
  );

  for (const key in repositoryTestData.entityData) {
    testSuite.addTest(
      new Mocha.Test(`should create a model from valid data (${key})`, async function () {
        const model = (await repositoryTestData.repository.create(
          repositoryTestData.entityData[key].request,
        )) as ModelType<R>;
        assert(
          repositoryTestData.validateCreate(
            model,
            repositoryTestData.entityData[key].request,
          ),
        );
      }),
    );
  }

  testSuite.addTest(
    new Mocha.Test(
      'should throw an UninitializedRepositoryError if the repository has not been initialized',
      async function () {
        for (const key in repositoryTestData.entityData) {
          const unitializedRepository: R = new repositoryTestData.RepositoryClass();
          try {
            await unitializedRepository.create(
              repositoryTestData.entityData[key].request,
            );
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
