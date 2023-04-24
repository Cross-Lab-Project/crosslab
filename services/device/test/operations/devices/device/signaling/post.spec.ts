import { SignalingMessage } from '../../../../../src/generated/types'
import { apiClient } from '../../../../../src/globals'
import { deviceUrlFromId } from '../../../../../src/methods/urlFromId'
import {
    connectedDevices,
    postDevicesByDeviceIdSignaling,
} from '../../../../../src/operations/devices'
import { TestData } from '../../../../data/index.spec'
import { addTest } from '../../../index.spec'
import {
    ImpossibleOperationError,
    MissingEntityError,
    UnrelatedPeerconnectionError,
} from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'
import * as sinon from 'sinon'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('POST /devices/{device_id}/signaling', context)

    const PEERCONNECTION_URL =
        testData.peerconnections['example peerconnection'].response.url
    const INSTANTIABLE_DEVICE_ID =
        testData['instantiable browser devices']['instantiable browser device'].model.uuid
    const CONCRETE_DEVICE_ID = testData['concrete devices']['concrete device'].model.uuid

    const SIGNALING_MESSAGE: SignalingMessage = {
        messageType: 'signaling',
        connectionUrl: PEERCONNECTION_URL,
        signalingType: 'offer',
        content: {},
    }

    const getPeerconnectionStub = sinon.stub(apiClient, 'getPeerconnection')

    suite.afterEach(function () {
        getPeerconnectionStub.reset()
        getPeerconnectionStub.resolves({
            url: 'https://localhost/peerconnections/bf909997-71a7-4d42-8352-99cb3c276f59',
            type: 'webrtc',
            devices: [
                { url: deviceUrlFromId(CONCRETE_DEVICE_ID) },
                { url: 'https://localhost/devices/deviceB' },
            ],
        })
    })

    suite.afterAll(function () {
        getPeerconnectionStub.restore()
        connectedDevices.clear()
    })

    addTest(
        suite,
        'should throw a MissingEntityError if the requested device cannot be found',
        async function () {
            await assert.rejects(
                async () => {
                    await postDevicesByDeviceIdSignaling(
                        {
                            device_id: 'non-existent',
                            peerconnection_url: PEERCONNECTION_URL,
                        },
                        SIGNALING_MESSAGE,
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

    addTest(
        suite,
        "should throw a ImpossibleOperationError if type of requested device is not 'device'",
        async function () {
            await assert.rejects(
                async () => {
                    await postDevicesByDeviceIdSignaling(
                        {
                            device_id: INSTANTIABLE_DEVICE_ID,
                            peerconnection_url: PEERCONNECTION_URL,
                        },
                        SIGNALING_MESSAGE,
                        testData.userData
                    )
                },
                (error) => {
                    assert(error instanceof ImpossibleOperationError)
                    assert.strictEqual(error.status, 400)
                    return true
                }
            )
        }
    )

    addTest(
        suite,
        'should throw an UnrelatedPeerconnectionError if the device is not taking part in the peerconnection',
        async function () {
            getPeerconnectionStub.resolves({
                url: 'https://localhost/peerconnections/bf909997-71a7-4d42-8352-99cb3c276f59',
                type: 'webrtc',
                devices: [
                    { url: 'https://localhost/devices/deviceA' },
                    { url: 'https://localhost/devices/deviceB' },
                ],
            })
            await assert.rejects(
                async () => {
                    await postDevicesByDeviceIdSignaling(
                        {
                            device_id: CONCRETE_DEVICE_ID,
                            peerconnection_url: PEERCONNECTION_URL,
                        },
                        SIGNALING_MESSAGE,
                        testData.userData
                    )
                },
                (error) => {
                    assert(error instanceof UnrelatedPeerconnectionError)
                    assert.strictEqual(error.status, 400)
                    return true
                }
            )
        }
    )

    addTest(
        suite,
        'should throw a MissingEntityError if the device does not have a websocket connection',
        async function () {
            await assert.rejects(
                async () => {
                    await postDevicesByDeviceIdSignaling(
                        {
                            device_id: CONCRETE_DEVICE_ID,
                            peerconnection_url: PEERCONNECTION_URL,
                        },
                        SIGNALING_MESSAGE,
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

    addTest(suite, 'should successfully send the signaling message', async function () {
        connectedDevices.set(CONCRETE_DEVICE_ID, { send: () => undefined } as any)
        const result = await postDevicesByDeviceIdSignaling(
            {
                device_id: CONCRETE_DEVICE_ID,
                peerconnection_url: PEERCONNECTION_URL,
            },
            SIGNALING_MESSAGE,
            testData.userData
        )
        assert.strictEqual(result.status, 200)
    })

    return suite
}
