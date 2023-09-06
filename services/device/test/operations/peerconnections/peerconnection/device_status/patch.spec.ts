import { repositories } from '../../../../../src/database/dataSource';
import { PeerconnectionModel } from '../../../../../src/database/model';
import { ConnectionStatus } from '../../../../../src/generated/types';
import * as callbackMethods from '../../../../../src/methods/callbacks';
import { patchPeerconnectionsByPeerconnectionIdDeviceStatus } from '../../../../../src/operations/peerconnections';
import { TestData } from '../../../../data/index.spec';
import { addTest, stubbedAuthorization } from '../../../index.spec';
import {
    MissingEntityError,
    UnrelatedPeerconnectionError,
} from '@crosslab/service-common';
import assert, { AssertionError } from 'assert';
import Mocha from 'mocha';
import * as sinon from 'sinon';

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite(
        'PATCH /peerconnections/{peerconnection_id}/device_status',
        context,
    );

    const PEERCONNECTION = testData.peerconnections['example peerconnection'];
    const PEERCONNECTION_ID = PEERCONNECTION.model.uuid;
    const DEVICE_A_URL = PEERCONNECTION.model.deviceA.url;
    const DEVICE_B_URL = PEERCONNECTION.model.deviceB.url;

    let sendClosedCallbackStub: sinon.SinonStub<
        Parameters<typeof callbackMethods.sendClosedCallback>,
        ReturnType<typeof callbackMethods.sendClosedCallback>
    >;
    let sendStatusChangedCallbackStub: sinon.SinonStub<
        Parameters<typeof callbackMethods.sendStatusChangedCallback>,
        ReturnType<typeof callbackMethods.sendStatusChangedCallback>
    >;
    let peerconnectionRepositoryFindOneOrFailStub: sinon.SinonStub<
        Parameters<typeof repositories.peerconnection.findOneOrFail>,
        ReturnType<typeof repositories.peerconnection.findOneOrFail>
    >;
    let clock: sinon.SinonFakeTimers;
    const peerconnectionRepositoryFindOneOrFailOriginal =
        repositories.peerconnection.findOneOrFail;

    suite.beforeAll(function () {
        sendClosedCallbackStub = sinon.stub(callbackMethods, 'sendClosedCallback');
        sendStatusChangedCallbackStub = sinon.stub(
            callbackMethods,
            'sendStatusChangedCallback',
        );
        peerconnectionRepositoryFindOneOrFailStub = sinon.stub(
            repositories.peerconnection,
            'findOneOrFail',
        );
    });

    suite.beforeEach(function () {
        sendClosedCallbackStub.reset();
        sendStatusChangedCallbackStub.reset();
        peerconnectionRepositoryFindOneOrFailStub.callsFake(
            peerconnectionRepositoryFindOneOrFailOriginal,
        );
    });

    suite.afterAll(function () {
        sendClosedCallbackStub.restore();
        sendStatusChangedCallbackStub.restore();
        peerconnectionRepositoryFindOneOrFailStub.restore();
    });

    suite.afterEach(function () {
        if (clock) clock.restore();
    });

    addTest(
        suite,
        'should throw a MissingEntityError if the requested peerconnection cannot be found',
        async function () {
            await assert.rejects(
                async () => {
                    await patchPeerconnectionsByPeerconnectionIdDeviceStatus(
                        stubbedAuthorization,
                        {
                            peerconnection_id: 'non-existent',
                            device_url: DEVICE_A_URL,
                        },
                        { status: 'closed' },
                    );
                },
                (error) => {
                    assert(error instanceof MissingEntityError);
                    assert.strictEqual(error.status, 404);
                    return true;
                },
            );
        },
    );

    addTest(
        suite,
        'should throw an UnrelatedPeerconnectionError if the device is not part of the peerconnection',
        async function () {
            await assert.rejects(
                async () => {
                    await patchPeerconnectionsByPeerconnectionIdDeviceStatus(
                        stubbedAuthorization,
                        {
                            peerconnection_id: PEERCONNECTION_ID,
                            device_url: 'https://localhost/devices/unrelated',
                        },
                        { status: 'new' },
                    );
                },
                (error) => {
                    assert(error instanceof UnrelatedPeerconnectionError);
                    assert.strictEqual(error.status, 400);
                    return true;
                },
            );
        },
    );

    const possibleStates: ConnectionStatus[] = [
        'closed',
        'connected',
        'connecting',
        'disconnected',
        'failed',
        'new',
    ];
    const testCases: {
        deviceUrl: string;
        newStatus: ConnectionStatus;
        statusDeviceA: ConnectionStatus;
        statusDeviceB: ConnectionStatus;
        statusPeerconnection: ConnectionStatus;
        expectedStatusPeerconnection: ConnectionStatus;
        shouldSendCallback: boolean;
    }[] = [];

    function getExpectedStatusPeerconnection(
        statusPeerconnection: ConnectionStatus,
        statusDeviceA: ConnectionStatus,
        statusDeviceB: ConnectionStatus,
    ): ConnectionStatus {
        return statusPeerconnection === 'closed' ||
            statusDeviceA === 'closed' ||
            statusDeviceB === 'closed'
            ? 'closed'
            : statusDeviceA === 'failed' || statusDeviceB === 'failed'
            ? 'failed'
            : statusDeviceA === 'disconnected' || statusDeviceB === 'disconnected'
            ? 'disconnected'
            : statusDeviceA === 'connecting' || statusDeviceB === 'connecting'
            ? 'connecting'
            : statusDeviceA === 'connected' && statusDeviceB === 'connected'
            ? 'connected'
            : 'new';
    }

    for (const deviceUrl of [DEVICE_A_URL, DEVICE_B_URL]) {
        for (const newStatus of possibleStates) {
            for (const statusDeviceA of possibleStates) {
                for (const statusDeviceB of possibleStates) {
                    for (const statusPeerconnection of possibleStates) {
                        const expectedStatusPeerconnection =
                            deviceUrl === DEVICE_A_URL
                                ? getExpectedStatusPeerconnection(
                                      statusPeerconnection,
                                      newStatus,
                                      statusDeviceB,
                                  )
                                : getExpectedStatusPeerconnection(
                                      statusPeerconnection,
                                      statusDeviceA,
                                      newStatus,
                                  );

                        testCases.push({
                            deviceUrl,
                            newStatus,
                            statusDeviceA,
                            statusDeviceB,
                            statusPeerconnection,
                            expectedStatusPeerconnection,
                            shouldSendCallback:
                                statusPeerconnection !== expectedStatusPeerconnection,
                        });
                    }
                }
            }
        }
    }

    addTest(
        suite,
        `should successfully change status of device and peerconnection`,
        async function (this: Mocha.Context) {
            this.timeout(testCases.length * 100);
            this.slow(testCases.length * 20);

            for (const testCase of testCases) {
                try {
                    const PEERCONNECTION_MODEL: PeerconnectionModel = {
                        uuid: PEERCONNECTION_ID,
                        type: 'webrtc',
                        status: testCase.statusPeerconnection,
                        deviceA: {
                            url: DEVICE_A_URL,
                            status: testCase.statusDeviceA,
                        },
                        deviceB: {
                            url: DEVICE_B_URL,
                            status: testCase.statusDeviceB,
                        },
                    };
                    peerconnectionRepositoryFindOneOrFailStub.resolves(
                        PEERCONNECTION_MODEL,
                    );

                    const result =
                        await patchPeerconnectionsByPeerconnectionIdDeviceStatus(
                            stubbedAuthorization,
                            {
                                device_url: testCase.deviceUrl,
                                peerconnection_id: PEERCONNECTION_ID,
                            },
                            { status: testCase.newStatus },
                        );

                    assert.strictEqual(result.status, 204);
                    assert.strictEqual(
                        PEERCONNECTION_MODEL.status,
                        testCase.expectedStatusPeerconnection,
                    );
                    if (testCase.deviceUrl === DEVICE_A_URL)
                        assert.strictEqual(
                            PEERCONNECTION_MODEL.deviceA.status,
                            testCase.newStatus,
                        );
                    else
                        assert.strictEqual(
                            PEERCONNECTION_MODEL.deviceB.status,
                            testCase.newStatus,
                        );
                    if (testCase.shouldSendCallback)
                        assert(sendStatusChangedCallbackStub.calledOnce);
                    else assert(sendStatusChangedCallbackStub.callCount === 0);

                    sendStatusChangedCallbackStub.resetHistory();
                } catch (error) {
                    assert(error instanceof AssertionError);
                    error.message = JSON.stringify(testCase, null, 4).replaceAll(
                        '\n',
                        '\n\t',
                    );
                    throw error;
                }
            }
        },
    );

    addTest(suite, 'should not wait for callbacks to return', async function () {
        clock = sinon.useFakeTimers({ shouldAdvanceTime: true });

        sendClosedCallbackStub.callsFake(async () => {
            await new Promise<void>((resolve) => setTimeout(resolve, 10000));
        });

        sendStatusChangedCallbackStub.callsFake(async () => {
            await new Promise<void>((resolve) => setTimeout(resolve, 10000));
        });

        const peerconnection = testData.peerconnections['example peerconnection'];

        const result = await patchPeerconnectionsByPeerconnectionIdDeviceStatus(
            stubbedAuthorization,
            {
                device_url: peerconnection.model.deviceA.url,
                peerconnection_id: peerconnection.model.uuid,
            },
            { status: 'closed' },
        );

        assert((result.status = 204));
    });

    return suite;
}
