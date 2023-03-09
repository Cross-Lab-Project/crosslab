import assert from 'assert';
import Mocha from 'mocha';

import {AbstractRepository} from '../abstractRepository';
import {RepositoryTestData, ResponseType} from './types.spec';

export function testSuiteFormat<
  K extends string,
  R extends AbstractRepository<{}, unknown, unknown>,
>(repositoryTestData: RepositoryTestData<K, R>) {
  const testSuite = new Mocha.Suite('format');

  for (const key in repositoryTestData.entityData) {
    testSuite.addTest(
      new Mocha.Test(`should correctly format a model (${key})`, async function () {
        const formatted = (await repositoryTestData.repository.format(
          repositoryTestData.entityData[key].model,
        )) as ResponseType<R>;
        assert(
          repositoryTestData.validateFormat(
            repositoryTestData.entityData[key].model,
            formatted,
          ),
        );
      }),
    );
  }

  return testSuite;
}
