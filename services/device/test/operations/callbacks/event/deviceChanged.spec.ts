import {PeerconnectionModel} from "../../../../src/database/model";
import {peerconnectionRepository} from "../../../../src/database/repositories/peerconnection";
import {apiClient, timeoutMap} from "../../../../src/globals";
import {signalingQueue} from "../../../../src/methods/signaling";
import {handleDeviceChangedEventCallback} from "../../../../src/operations/callbacks/event/deviceChanged";
import {TestData} from "../../../data/index.spec";
import {addTest} from "../../index.spec";
import {MalformedBodyError} from "@crosslab/service-common";
import assert from "assert";
import Mocha from "mocha";
import rewire from "rewire";
import * as sinon from "sinon";

export function deviceChangedEventCallbackTest(
  context: Mocha.Context,
  testData: TestData,
) {
  const suite = new Mocha.Suite("device-changed event-callback handling", context);

  addTest(
    suite,
    "should throw a MalformedBodyError if body of callback does not contain property 'device'",
    async function () {
      await assert.rejects(
        async () => {
          await handleDeviceChangedEventCallback({});
        },
        error => {
          assert(error instanceof MalformedBodyError);
          assert.strictEqual(error.status, 400);
          assert.strictEqual(
            error.message,
            "Event-callbacks of type 'device-changed' require property 'device'",
          );
          return true;
        },
      );
    },
  );

  addTest(
    suite,
    "should throw a MalformedBodyError if property 'device' in body of callback is not a valid device",
    async function () {
      await assert.rejects(
        async () => {
          await handleDeviceChangedEventCallback({device: "invalid"});
        },
        error => {
          assert(error instanceof MalformedBodyError);
          assert.strictEqual(error.status, 400),
            assert.strictEqual(error.message, 'Property "device" is not a valid device');
          return true;
        },
      );
    },
  );

  addTest(
    suite,
    "should return 410 if the device is not of type 'device'",
    async function () {
      const devices = [
        testData["instantiable browser devices"]["instantiable browser device"].response,
        testData["instantiable cloud devices"]["instantiable cloud device"].response,
        testData["device groups"]["device group"].response,
      ];

      for (const device of devices) {
        const result = await handleDeviceChangedEventCallback({
          device,
        });

        assert.strictEqual(result, 410);
      }
    },
  );

  addTest(
    suite,
    "should call the correct function for a device of type 'device'",
    async () => {
      const handleConcreteDeviceStub = sinon.stub().resolves(200);

      const deviceChangedEventCallbackModule = rewire(
        "../../../../src/operations/callbacks/event/deviceChanged.ts",
      );

      const rewiredHandleDeviceChangedEventCallback =
        deviceChangedEventCallbackModule.__get__("handleDeviceChangedEventCallback");

      await deviceChangedEventCallbackModule.__with__({
        handleConcreteDevice: handleConcreteDeviceStub,
      })(async () => {
        const result = await rewiredHandleDeviceChangedEventCallback({
          device: testData["concrete devices"]["concrete device"].response,
        });

        assert.strictEqual(result, 200);
        assert(handleConcreteDeviceStub.calledOnce);
      });
    },
  );

  addTest(
    suite,
    "should handle a device of type 'device' correctly (both connected and remaining connections)",
    async () => {
      const UUID_PEERCONNECTION = "9daf4e96-9ed7-4a1e-99d1-0a47371f8524";
      const URL_DEVICE_A =
        "https://localhost/devices/e961ba8b-9b8f-4f96-b943-23212c8d4aa7";
      const URL_DEVICE_B =
        "https://localhost/devices/879cca1d-ff3d-4374-bda2-188a2a607659";
      const TIMEOUT = setTimeout(() => undefined, 100000);
      const PEERCONNECTION_MODEL: PeerconnectionModel = {
        uuid: UUID_PEERCONNECTION,
        type: "webrtc",
        status: "connecting",
        deviceA: {
          url: URL_DEVICE_A,
          status: "connecting",
        },
        deviceB: {
          url: URL_DEVICE_B,
          status: "connecting",
        },
      };

      const peerconnectionRepositoryFindStub = sinon.stub(
        peerconnectionRepository,
        "find",
      );
      peerconnectionRepositoryFindStub.resolves([PEERCONNECTION_MODEL]);

      const getDeviceStub = sinon.stub(apiClient, "getDevice");
      getDeviceStub.callsFake(async (url, _options) => {
        return {
          type: "device",
          url: url,
          name: "Device",
          owner: "https://localhost/users/superadmin",
          connected: true,
        };
      });

      const addPeerconnectionStub = sinon.stub(signalingQueue, "addPeerconnection");

      timeoutMap.set(UUID_PEERCONNECTION, TIMEOUT);

      const deviceChangedEventCallbackModule = rewire(
        "../../../../src/operations/callbacks/event/deviceChanged.ts",
      );

      const handleConcreteDevice =
        deviceChangedEventCallbackModule.__get__("handleConcreteDevice");

      const result = await handleConcreteDevice(
        testData.devices["concrete device"].response,
      );

      peerconnectionRepositoryFindStub.restore();
      getDeviceStub.restore();
      addPeerconnectionStub.restore();
      assert(getDeviceStub.calledTwice);
      assert.strictEqual(getDeviceStub.args[0][0], URL_DEVICE_A);
      assert.strictEqual(getDeviceStub.args[1][0], URL_DEVICE_B);
      assert(addPeerconnectionStub.calledOnce);
      assert.strictEqual(addPeerconnectionStub.args[0][0], PEERCONNECTION_MODEL);
      assert(!timeoutMap.get(UUID_PEERCONNECTION));
      assert((TIMEOUT as any)._destroyed);
      assert.strictEqual(result, 200);
    },
  );

  addTest(
    suite,
    "should handle a device of type 'device' correctly (both devices not connected and remaining connections)",
    async () => {
      const peerconnectionRepositoryFindStub = sinon.stub(
        peerconnectionRepository,
        "find",
      );
      peerconnectionRepositoryFindStub.resolves([
        {
          uuid: "9daf4e96-9ed7-4a1e-99d1-0a47371f8524",
          type: "webrtc",
          status: "connecting",
          deviceA: {
            url: "https://localhost/devices/e961ba8b-9b8f-4f96-b943-23212c8d4aa7",
            status: "connecting",
          },
          deviceB: {
            url: "https://localhost/devices/879cca1d-ff3d-4374-bda2-188a2a607659",
            status: "connecting",
          },
        },
      ]);

      const getDeviceStub = sinon.stub(apiClient, "getDevice");
      getDeviceStub.callsFake(async (url, _options) => {
        return {
          type: "device",
          url: url,
          name: "Device",
          owner: "https://localhost/users/superadmin",
          connected: false,
        };
      });

      const deviceChangedEventCallbackModule = rewire(
        "../../../../src/operations/callbacks/event/deviceChanged.ts",
      );

      const handleConcreteDevice =
        deviceChangedEventCallbackModule.__get__("handleConcreteDevice");

      const result = await handleConcreteDevice(
        testData.devices["concrete device"].response,
      );

      peerconnectionRepositoryFindStub.restore();
      getDeviceStub.restore();
      assert.strictEqual(result, 200);
    },
  );

  addTest(
    suite,
    "should handle a device of type 'device' correctly (no remaining connections)",
    async () => {
      const peerconnectionRepositoryFindStub = sinon.stub(
        peerconnectionRepository,
        "find",
      );
      peerconnectionRepositoryFindStub.resolves([]);

      const deviceChangedEventCallbackModule = rewire(
        "../../../../src/operations/callbacks/event/deviceChanged.ts",
      );

      const handleConcreteDevice =
        deviceChangedEventCallbackModule.__get__("handleConcreteDevice");

      const result = await handleConcreteDevice(
        testData.devices["concrete device"].response,
      );

      assert.strictEqual(result, 410);
    },
  );

  return suite;
}
