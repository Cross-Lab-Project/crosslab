import Mocha from 'mocha';

import { TestData } from '../../../../data/index.spec';
import { addTest } from '../../../index.spec';

export default function (context: Mocha.Context, testData: TestData) {
  const suite = new Mocha.Suite('WebSocket-Handling Disconnect');

  addTest(suite, 'should add a disconnect timeout correctly', async function () {
    throw new Error('not implemented!');
  });

  addTest(
    suite,
    'should not overwrite an existing disconnect timeout',
    async function () {
      throw new Error('not implemented!');
    },
  );

  addTest(suite, 'should remove a disconnect timeout correctly', async function () {
    throw new Error('not implemented!');
  });

  return suite;
}
