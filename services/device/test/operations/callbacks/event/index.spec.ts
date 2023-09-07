import { handleEventCallback } from '../../../../src/operations/callbacks/event.js.ts";
import * as deviceChangedEventCallbackHandling from '../../../../src/operations/callbacks/event/deviceChanged.js.ts";
import { TestData } from '../../../data/index.spec.js.ts";
import { addTest } from '../../index.spec.js.ts";
import { deviceChangedEventCallbackTest } from './deviceChanged.spec.js';
import { InvalidValueError, MalformedBodyError } from '@crosslab/service-common';
import assert from 'assert';
import Mocha from 'mocha';
import * as sinon from 'sinon';

export function eventCallbackTest(context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('event-callback handling', context);

    addTest(
        suite,
        "should throw a MalformedBodyError if body of callback does not contain property 'eventType'",
        async function () {
            await assert.rejects(
                async () => {
                    await handleEventCallback({});
                },
                (error) => {
                    assert(error instanceof MalformedBodyError);
                    assert.strictEqual(error.status, 400);
                    assert.strictEqual(
                        error.message,
                        "Callbacks of type 'event' require property 'eventType'",
                    );
                    return true;
                },
            );
        },
    );

    addTest(
        suite,
        "should throw a MalformedBodyError if property 'eventType' in body of callback is not a string",
        async function () {
            await assert.rejects(
                async () => {
                    await handleEventCallback({ eventType: 1 });
                },
                (error) => {
                    assert(error instanceof MalformedBodyError);
                    assert.strictEqual(error.status, 400);
                    assert.strictEqual(
                        error.message,
                        "Property 'eventType' needs to be of type 'string'",
                    );
                    return true;
                },
            );
        },
    );

    addTest(
        suite,
        'should throw an InvalidValueError if the type of the event-callback is not supported',
        async function () {
            await assert.rejects(
                async () => {
                    await handleEventCallback({ eventType: 'unsupported' });
                },
                (error) => {
                    assert(error instanceof InvalidValueError);
                    assert.strictEqual(error.status, 400);
                    assert.strictEqual(
                        error.message,
                        "Event-callbacks of type 'unsupported' are not supported",
                    );
                    return true;
                },
            );
        },
    );

    addTest(
        suite,
        "should call the correct function for a 'device-changed' event-callback",
        async function () {
            const handleDeviceChangedEventCallbackStub = sinon.stub(
                deviceChangedEventCallbackHandling,
                'handleDeviceChangedEventCallback',
            );
            handleDeviceChangedEventCallbackStub.resolves(200);

            try {
                const result = await handleEventCallback({ eventType: 'device-changed' });

                assert.strictEqual(result, 200);
                assert(handleDeviceChangedEventCallbackStub.calledOnce);

                handleDeviceChangedEventCallbackStub.restore();
            } catch (error) {
                handleDeviceChangedEventCallbackStub.restore();
                throw error;
            }
        },
    );

    suite.addSuite(deviceChangedEventCallbackTest(suite.ctx, testData));

    return suite;
}
