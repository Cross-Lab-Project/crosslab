import { MissingEntityError } from '@crosslab/service-common';
import assert from 'assert';
import Mocha from 'mocha';

import { repositories } from '../../../../src/database/dataSource';
import { deleteDevicesByDeviceId } from '../../../../src/operations/devices';
import { deviceNames } from '../../../data/devices/index.spec';
import { TestData } from '../../../data/index.spec';
import { addTest, stubbedAuthorization } from '../../index.spec';

export default function (context: Mocha.Context, testData: TestData) {
  const suite = new Mocha.Suite('DELETE /devices/{device_id}', context);

  addTest(suite, 'should delete the device', async function () {
    for (const deviceName of deviceNames) {
      const deviceModel = testData.devices[deviceName].model;
      const result = await deleteDevicesByDeviceId(stubbedAuthorization, {
        device_id: deviceModel.uuid,
      });
      assert(result.status === 204);
      assert(
        (await repositories.device.findOne({
          where: {
            uuid: deviceModel.uuid,
          },
        })) === null,
      );
    }
  });

  addTest(
    suite,
    'should throw a MissingEntityError if device is not found',
    async function () {
      await assert.rejects(
        async () => {
          await deleteDevicesByDeviceId(stubbedAuthorization, {
            device_id: 'non-existent',
          });
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
    'should throw an error if user is not the owner of the device',
    async function (this: Mocha.Context) {
      this.skip();
    },
  );

  addTest(
    suite,
    'superadmin/admin should be able to delete the device',
    async function (this: Mocha.Context) {
      this.skip();
    },
  );

  return suite;
}
