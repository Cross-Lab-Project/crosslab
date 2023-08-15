import {postDevicesByDeviceIdAvailability} from "../../../../../src/operations/devices";
import {TestData} from "../../../../data/index.spec";
import {addTest} from "../../../index.spec";
import {ImpossibleOperationError, MissingEntityError} from "@crosslab/service-common";
import assert from "assert";
import Mocha from "mocha";

export default function (context: Mocha.Context, testData: TestData) {
  const suite = new Mocha.Suite("POST /devices/{device_id}/availability", context);

  addTest(
    suite,
    "should throw a MissingEntityError if the device could not be found",
    async function () {
      await assert.rejects(
        async () => {
          await postDevicesByDeviceIdAvailability(
            {device_id: "non-existent"},
            [],
            testData.userData,
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
            {
              device_id: testData["device groups"]["device group"].model.uuid,
            },
            [],
            testData.userData,
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

  return suite;
}
