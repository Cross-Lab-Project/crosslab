import { openfga_deinit, openfga_init } from '../src/openfga.js';
import { check, relate, unrelate } from './helper.js';

describe('authorization', function () {
  it('should persist data', async function () {
    this.timeout(60000);
    for (let i = 0; i < 102; i++) {
      await relate('user:persist' + i, 'owner', 'device:persist');
    }
    await unrelate('user:persist' + 101, 'owner', 'device:persist');
    openfga_deinit();
    await openfga_init();
    for (let i = 0; i < 101; i++) {
      (await check('user:persist' + i, 'view', 'device:persist')).should.equal(true);
    }
    (await check('user:persist' + 101, 'view', 'device:persist')).should.equal(false);
  });
});
