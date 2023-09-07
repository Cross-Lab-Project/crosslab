import { getPeerconnections } from '../../../src/operations/peerconnections.js.ts";
import { TestData } from '../../data/index.spec.js.ts";
import { peerconnectionNames } from '../../data/peerconnections/index.spec.js.ts";
import { peerconnectionRepositoryTestSuite } from '../../database/repositories/peerconnection.spec.js.ts";
import { addTest, stubbedAuthorization } from '../index.spec.js.ts";
import assert from 'assert';
import Mocha from 'mocha';

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('GET /peerconnections', context);

    addTest(suite, 'should get all peerconnections', async function () {
        const result = await getPeerconnections(stubbedAuthorization);
        assert(result.status === 200);

        for (const peerconnectionName of peerconnectionNames) {
            const searchedPeerconnection =
                testData.peerconnections[peerconnectionName].response;
            assert(
                result.body.find((peerconnection) =>
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
