import { repositories } from '../../../../src/database/dataSource'
import { apiClient } from '../../../../src/globals'
import * as callbackFunctions from '../../../../src/methods/callbacks'
import { deletePeerconnectionsByPeerconnectionId } from '../../../../src/operations/peerconnections'
import { TestData } from '../../../data/index.spec'
// import { peerconnectionNames } from '../../../data/peerconnections/index.spec'
import { addTest } from '../../index.spec'
import { MissingEntityError } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'
import * as sinon from 'sinon'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('DELETE /peerconnections/{peerconnection_id}', context)

    const peerconnectionRepositoryFindOneOrFailOriginal =
        repositories.peerconnection.findOneOrFail
    let peerconnectionRepositoryFindOneOrFailStub: sinon.SinonStub<
        Parameters<typeof repositories.peerconnection.findOneOrFail>,
        ReturnType<typeof repositories.peerconnection.findOneOrFail>
    >
    let sendSignalingMessageStub: sinon.SinonStub<
        Parameters<typeof apiClient.sendSignalingMessage>,
        ReturnType<typeof apiClient.sendSignalingMessage>
    >
    let sendClosedCallbackStub: sinon.SinonStub<
        Parameters<typeof callbackFunctions.sendClosedCallback>,
        ReturnType<typeof callbackFunctions.sendClosedCallback>
    >
    let sendStatusChangedCallbackStub: sinon.SinonStub<
        Parameters<typeof callbackFunctions.sendStatusChangedCallback>,
        ReturnType<typeof callbackFunctions.sendStatusChangedCallback>
    >

    suite.beforeAll(function () {
        peerconnectionRepositoryFindOneOrFailStub = sinon.stub(
            repositories.peerconnection,
            'findOneOrFail'
        )
        sendSignalingMessageStub = sinon.stub(apiClient, 'sendSignalingMessage')
        sendClosedCallbackStub = sinon.stub(callbackFunctions, 'sendClosedCallback')
        sendStatusChangedCallbackStub = sinon.stub(
            callbackFunctions,
            'sendStatusChangedCallback'
        )
    })

    suite.beforeEach(function () {
        peerconnectionRepositoryFindOneOrFailStub.callsFake(
            peerconnectionRepositoryFindOneOrFailOriginal
        )
    })

    suite.afterAll(function () {
        peerconnectionRepositoryFindOneOrFailStub.restore()
        sendSignalingMessageStub.restore()
        sendClosedCallbackStub.restore()
        sendStatusChangedCallbackStub.restore()
    })

    // addTest(suite, 'should delete the peerconnection', async function () {
    //     for (const peerconnectionName of peerconnectionNames) {
    //         const peerconnectionModel = testData.peerconnections[peerconnectionName].model
    //         const result = await deletePeerconnectionsByPeerconnectionId(
    //             { peerconnection_id: peerconnectionModel.uuid },
    //             testData.userData
    //         )
    //         assert.strictEqual(result.status, 202)
    //         assert(
    //             (await peerconnectionRepository.findOne({
    //                 where: {
    //                     uuid: peerconnectionModel.uuid,
    //                 },
    //             })) === null
    //         )
    //     }
    // })

    addTest(
        suite,
        'should throw a MissingEntityError if peerconnection is not found',
        async function () {
            await assert.rejects(
                async () => {
                    await deletePeerconnectionsByPeerconnectionId(
                        { peerconnection_id: 'non-existent' },
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

    return suite
}
