import assert from 'assert';
import Mocha from 'mocha';

import {AbstractRepository} from '../abstractRepository.js';
import {RepositoryTestData, ResponseType} from './types.spec.js';

export function testSuiteFormat<K extends string, R extends AbstractRepository<object, unknown, unknown, Record<string, object>>>(
  repositoryTestData: RepositoryTestData<K, R>,
) {
  const testSuite = new Mocha.Suite('format');

  for (const key in repositoryTestData.entityData) {
    testSuite.addTest(
      new Mocha.Test(`should correctly format a model (${key})`, async function () {
        const formatted = (await repositoryTestData.repository.format(repositoryTestData.entityData[key].model)) as ResponseType<R>;
        assert(repositoryTestData.validateFormat(repositoryTestData.entityData[key].model, formatted));
      }),
    );
  }

  return testSuite;
}
