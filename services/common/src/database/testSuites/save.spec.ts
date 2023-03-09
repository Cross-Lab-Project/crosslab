import assert, {fail} from 'assert';
import Mocha from 'mocha';

import {UninitializedRepositoryError} from '../../errors';
import {AbstractRepository} from '../abstractRepository';
import {ModelType, RepositoryTestData} from './types.spec';

export function testSuiteSave<
  K extends string,
  R extends AbstractRepository<{}, unknown, unknown>,
>(repositoryTestData: RepositoryTestData<K, R>) {
  const testSuite = new Mocha.Suite('save');

  for (const key in repositoryTestData.entityData) {
    testSuite.addTest(
      new Mocha.Test(`should save a valid model (${key})`, async function () {
        const model = (await repositoryTestData.repository.create(
          repositoryTestData.entityData[key].request,
        )) as ModelType<R>;
        assert(
          repositoryTestData.validateCreate(
            model,
            repositoryTestData.entityData[key].request,
          ),
        );
        const savedModel = (await repositoryTestData.repository.save(
          model,
        )) as ModelType<R>;
        assert(repositoryTestData.compareModels(model, savedModel));
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
            await unitializedRepository.save(repositoryTestData.entityData[key].model);
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
