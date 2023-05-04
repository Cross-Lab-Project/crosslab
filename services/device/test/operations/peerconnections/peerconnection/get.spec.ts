import { getPeerconnectionsByPeerconnectionId } from '../../../../src/operations/peerconnections'
import { TestData } from '../../../data/index.spec'
import { peerconnectionNames } from '../../../data/peerconnections/index.spec'
import { peerconnectionRepositoryTestSuite } from '../../../database/repositories/peerconnection.spec'
import { addTest } from '../../index.spec'
import { MissingEntityError } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('GET /peerconnections/{peerconnection_id}', context)

    addTest(
        suite,
        'should throw a MissingEntityError if the requested peerconnection cannot be found',
        async function () {
            await assert.rejects(
                async () => {
                    await getPeerconnectionsByPeerconnectionId(
                        {
                            peerconnection_id: 'non-existent',
                        },
                        testData.userData
                    )
                },
                (error) => {
                    assert(error instanceof MissingEntityError)
                    assert.strictEqual(error.status, 404)
                    return true
                }
            )
        }
    )

    addTest(suite, 'should return the requested peerconnection', async function () {
        for (const peerconnectionName of peerconnectionNames) {
            const peerconnection = testData.peerconnections[peerconnectionName]
            const result = await getPeerconnectionsByPeerconnectionId(
                {
                    peerconnection_id: peerconnection.model.uuid,
                },
                testData.userData
            )
            assert.strictEqual(result.status, 200)
            assert(
                peerconnectionRepositoryTestSuite.validateFormat(
                    peerconnection.model,
                    result.body
                )
            )
        }
    })

    return suite
}
