import { repositories } from '../../src/database/dataSource'
import { DeviceModel, PeerconnectionModel } from '../../src/database/model'
import {
    changedCallbacks,
    closedCallbacks,
    sendChangedCallback,
    sendClosedCallback,
    sendStatusChangedCallback,
    statusChangedCallbacks,
} from '../../src/methods/callbacks'
import assert from 'assert'
import * as fetchModule from 'node-fetch'
import * as sinon from 'sinon'

export default () =>
    describe('callbacks methods', function () {
        let CALLBACK_URLS: string[]
        let TEST_DEVICE_MODEL: DeviceModel
        let TEST_PEERCONNECTION_MODEL: PeerconnectionModel
        let fetchStub: sinon.SinonStub<
            Parameters<typeof fetchModule.default>,
            Partial<ReturnType<typeof fetchModule.default>>
        >

        this.beforeAll(function () {
            CALLBACK_URLS = [
                'http://localhost/callback/1',
                'http://localhost/callback/2',
                'http://localhost/callback/3',
            ]
            TEST_DEVICE_MODEL = {
                type: 'device',
                uuid: 'ea2a852d-b16c-45e0-819f-0af793bb596e',
                name: 'Test Device',
                owner: 'http://localhost',
                announcedAvailability: [],
                availabilityRules: [],
                connected: false,
                services: [],
            }
            TEST_PEERCONNECTION_MODEL = {
                uuid: 'ea2a852d-b16c-45e0-819f-0af793bb596e',
                type: 'webrtc',
                status: 'new',
                deviceA: { url: 'http://localhost/devices/a', status: 'new' },
                deviceB: { url: 'http://localhost/devices/b', status: 'new' },
            }
            fetchStub = sinon.stub(fetchModule, 'default')
        })

        this.afterEach(function () {
            fetchStub.reset()
        })

        this.afterAll(function () {
            fetchStub.restore()
        })

        async function checkArgsDevice() {
            for (let i = 0; i < fetchStub.callCount; i++) {
                assert(fetchStub.args[i][0] === CALLBACK_URLS[i])
                assert(fetchStub.args[i][1]?.method === 'POST')
                assert(
                    fetchStub.args[i][1]?.body ===
                        JSON.stringify({
                            callbackType: 'event',
                            eventType: 'device-changed',
                            device: await repositories.device.format(TEST_DEVICE_MODEL),
                        })
                )
                const headers = fetchStub.args[i][1]?.headers
                await checkHeaders(headers)
            }
        }

        async function checkArgsPeerconnection(
            eventType: 'peerconnection-closed' | 'peerconnection-status-changed'
        ) {
            for (let i = 0; i < fetchStub.callCount; i++) {
                assert(fetchStub.args[i][0] === CALLBACK_URLS[i])
                assert(fetchStub.args[i][1]?.method === 'POST')
                assert(
                    fetchStub.args[i][1]?.body ===
                        JSON.stringify({
                            callbackType: 'event',
                            eventType,
                            peerconnection: await repositories.peerconnection.format(
                                TEST_PEERCONNECTION_MODEL
                            ),
                        })
                )
                const headers = fetchStub.args[i][1]?.headers
                await checkHeaders(headers)
            }
        }

        async function checkHeaders(headers?: fetchModule.HeadersInit | undefined) {
            assert(headers)
            assert(typeof headers.values !== 'string')
            const headersValues = headers.values()

            const firstHeader = headersValues.next()
            assert(Array.isArray(firstHeader.value))
            assert(!firstHeader.done)
            assert(firstHeader.value.length === 2)
            assert(firstHeader.value[0] === 'Content-Type')
            assert(firstHeader.value[1] === 'application/json')

            const secondHeader = headersValues.next()
            assert(secondHeader.done && secondHeader.value === undefined)
        }

        describe('sendChangedCallback', function () {
            it('should not send anything if no callback urls are registered', async function () {
                assert(!changedCallbacks.get(TEST_DEVICE_MODEL.uuid))

                await sendChangedCallback(TEST_DEVICE_MODEL)

                assert(!fetchStub.called)
            })

            it('should send callback message to each registered callback url', async function () {
                changedCallbacks.set(TEST_DEVICE_MODEL.uuid, CALLBACK_URLS)

                fetchStub.resolves({
                    status: 200,
                })

                await sendChangedCallback(TEST_DEVICE_MODEL)

                assert.strictEqual(fetchStub.callCount, CALLBACK_URLS.length)
                assert(
                    JSON.stringify(changedCallbacks.get(TEST_DEVICE_MODEL.uuid)) ===
                        JSON.stringify(CALLBACK_URLS)
                )
                await checkArgsDevice()
            })

            it('should remove callback url on 410 response', async function () {
                changedCallbacks.set(TEST_DEVICE_MODEL.uuid, CALLBACK_URLS)

                fetchStub.onFirstCall().resolves({
                    status: 410,
                })

                fetchStub.onSecondCall().resolves({
                    status: 200,
                })

                fetchStub.onThirdCall().resolves({
                    status: 410,
                })

                await sendChangedCallback(TEST_DEVICE_MODEL)

                assert.strictEqual(fetchStub.callCount, CALLBACK_URLS.length)
                assert(
                    JSON.stringify(changedCallbacks.get(TEST_DEVICE_MODEL.uuid)) ===
                        JSON.stringify([CALLBACK_URLS[1]])
                )
                await checkArgsDevice()
            })
        })

        describe('sendClosedCallback', function () {
            it('should not send anything if no callback urls are registered', async function () {
                assert(!closedCallbacks.get(TEST_PEERCONNECTION_MODEL.uuid))

                await sendClosedCallback(TEST_PEERCONNECTION_MODEL)

                assert(!fetchStub.called)
            })

            it('should send callback message to each registered callback url', async function () {
                closedCallbacks.set(TEST_PEERCONNECTION_MODEL.uuid, CALLBACK_URLS)

                fetchStub.resolves({
                    status: 200,
                })

                await sendClosedCallback(TEST_PEERCONNECTION_MODEL)

                assert(fetchStub.callCount === CALLBACK_URLS.length)
                assert(
                    JSON.stringify(
                        closedCallbacks.get(TEST_PEERCONNECTION_MODEL.uuid)
                    ) === JSON.stringify(CALLBACK_URLS)
                )
                await checkArgsPeerconnection('peerconnection-closed')
            })

            it('should remove callback url on 410 response', async function () {
                closedCallbacks.set(TEST_PEERCONNECTION_MODEL.uuid, CALLBACK_URLS)

                fetchStub.onFirstCall().resolves({
                    status: 410,
                })

                fetchStub.onSecondCall().resolves({
                    status: 200,
                })

                fetchStub.onThirdCall().resolves({
                    status: 410,
                })

                await sendClosedCallback(TEST_PEERCONNECTION_MODEL)

                assert(fetchStub.callCount === CALLBACK_URLS.length)
                assert(
                    JSON.stringify(
                        closedCallbacks.get(TEST_PEERCONNECTION_MODEL.uuid)
                    ) === JSON.stringify([CALLBACK_URLS[1]])
                )
                await checkArgsPeerconnection('peerconnection-closed')
            })
        })

        describe('sendStatusChangedCallback', function () {
            it('should not send anything if no callback urls are registered', async function () {
                assert(!statusChangedCallbacks.get(TEST_PEERCONNECTION_MODEL.uuid))

                await sendStatusChangedCallback(TEST_PEERCONNECTION_MODEL)

                assert(!fetchStub.called)
            })

            it('should send callback message to each registered callback url', async function () {
                statusChangedCallbacks.set(TEST_PEERCONNECTION_MODEL.uuid, CALLBACK_URLS)

                fetchStub.resolves({
                    status: 200,
                })

                await sendStatusChangedCallback(TEST_PEERCONNECTION_MODEL)

                assert(fetchStub.callCount === CALLBACK_URLS.length)
                assert(
                    JSON.stringify(
                        statusChangedCallbacks.get(TEST_PEERCONNECTION_MODEL.uuid)
                    ) === JSON.stringify(CALLBACK_URLS)
                )
                await checkArgsPeerconnection('peerconnection-status-changed')
            })

            it('should remove callback url on 410 response', async function () {
                statusChangedCallbacks.set(TEST_PEERCONNECTION_MODEL.uuid, CALLBACK_URLS)

                fetchStub.onFirstCall().resolves({
                    status: 410,
                })

                fetchStub.onSecondCall().resolves({
                    status: 200,
                })

                fetchStub.onThirdCall().resolves({
                    status: 410,
                })

                await sendStatusChangedCallback(TEST_PEERCONNECTION_MODEL)

                assert(fetchStub.callCount === CALLBACK_URLS.length)
                assert(
                    JSON.stringify(
                        statusChangedCallbacks.get(TEST_PEERCONNECTION_MODEL.uuid)
                    ) === JSON.stringify([CALLBACK_URLS[1]])
                )
                await checkArgsPeerconnection('peerconnection-status-changed')
            })
        })
    })
