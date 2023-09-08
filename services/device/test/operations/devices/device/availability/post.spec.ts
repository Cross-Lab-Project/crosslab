import { ImpossibleOperationError, MissingEntityError } from '@crosslab/service-common';
import assert from 'assert';
import Mocha from 'mocha';
import * as sinon from 'sinon';

import * as callbackMethods from '../../../../../src/methods/callbacks';
import { postDevicesByDeviceIdAvailability } from '../../../../../src/operations/devices';
import { TestData } from '../../../../data/index.spec';
import { addTest, stubbedAuthorization } from '../../../index.spec';

export default function (context: Mocha.Context, testData: TestData) {
  const suite = new Mocha.Suite('POST /devices/{device_id}/availability', context);
  let sendChangedCallbackStub: sinon.SinonStub<
    Parameters<typeof callbackMethods.sendChangedCallback>,
    ReturnType<typeof callbackMethods.sendChangedCallback>
  >;
  let clock: sinon.SinonFakeTimers;

  suite.beforeAll(function () {
    sendChangedCallbackStub = sinon.stub(callbackMethods, 'sendChangedCallback');
  });

  suite.afterEach(function () {
    sendChangedCallbackStub.reset();
    if (clock) clock.restore();
  });

  suite.afterAll(function () {
    sendChangedCallbackStub.restore();
  });

  addTest(
    suite,
    'should throw a MissingEntityError if the device could not be found',
    async function () {
      await assert.rejects(
        async () => {
          await postDevicesByDeviceIdAvailability(
            stubbedAuthorization,
            { device_id: 'non-existent' },
            [],
          );
        },
        error => {
          assert(error instanceof MissingEntityError);
          assert(error.status === 404);
          return true;
        },
      );
    },
  );

  addTest(
    suite,
    "should throw a ImpossibleOperationError if the device is not of type 'device'",
    async function () {
      await assert.rejects(
        async () => {
          await postDevicesByDeviceIdAvailability(
            stubbedAuthorization,
            {
              device_id: testData['device groups']['device group'].model.uuid,
            },
            [],
          );
        },
        error => {
          assert(error instanceof ImpossibleOperationError);
          assert(error.status === 400);
          return true;
        },
      );
    },
  );

  addTest(suite, 'should not wait for callbacks to return', async function () {
    clock = sinon.useFakeTimers({ shouldAdvanceTime: true });

    sendChangedCallbackStub.callsFake(async () => {
      await new Promise<void>(resolve => setTimeout(resolve, 10000));
    });

    const device = testData.devices['concrete device'];

    const result = await postDevicesByDeviceIdAvailability(
      stubbedAuthorization,
      { device_id: device.model.uuid },
      [],
    );

    assert(result.status === 200);
  });

  return suite;
}
