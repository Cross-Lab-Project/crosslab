import assert from 'assert';
import Mocha from 'mocha';

import {AbstractRepository} from '../abstractRepository';
import {ModelType, RepositoryTestData} from './types.spec';

export function testSuiteWrite<
  K extends string,
  R extends AbstractRepository<{}, unknown, unknown>,
>(repositoryTestData: RepositoryTestData<K, R>) {
  const testSuite = new Mocha.Suite('write');

  for (const key in repositoryTestData.entityData) {
    testSuite.addTest(
      new Mocha.Test(
        `should write valid data to a model correctly (${key})`,
        async function () {
          const model = (await repositoryTestData.repository.create()) as ModelType<R>;
          assert(repositoryTestData.validateCreate(model));
          await repositoryTestData.repository.write(
            model,
            repositoryTestData.entityData[key].request,
          );
          assert(
            repositoryTestData.validateWrite(
              model,
              repositoryTestData.entityData[key].request,
            ),
          );
        },
      ),
    );
  }

  return testSuite;
}