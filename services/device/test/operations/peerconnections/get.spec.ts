import assert from 'assert';
import Mocha from 'mocha';

import { getPeerconnections } from '../../../src/operations/peerconnections';
import { TestData } from '../../data/index.spec';
import { peerconnectionNames } from '../../data/peerconnections/index.spec';
import { peerconnectionRepositoryTestSuite } from '../../database/repositories/peerconnection.spec';
import { addTest, stubbedAuthorization } from '../index.spec';

export default function (context: Mocha.Context, testData: TestData) {
  const suite = new Mocha.Suite('GET /peerconnections', context);

  addTest(suite, 'should get all peerconnections', async function () {
    const result = await getPeerconnections(stubbedAuthorization);
    assert(result.status === 200);

    for (const peerconnectionName of peerconnectionNames) {
      const searchedPeerconnection =
        testData.peerconnections[peerconnectionName].response;
      assert(
        result.body.find(peerconnection =>
          peerconnectionRepositoryTestSuite.compareFormatted(
            peerconnection,
            searchedPeerconnection,
          ),
        ),
      );
    }
  });

  return suite;
}
