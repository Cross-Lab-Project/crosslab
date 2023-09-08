import Mocha from 'mocha';

import { TestData } from '../../../../data/index.spec';

export default function (context: Mocha.Context, testData: TestData) {
  const suite = new Mocha.Suite('WebSocket-Handling Message');

  return suite;
}
