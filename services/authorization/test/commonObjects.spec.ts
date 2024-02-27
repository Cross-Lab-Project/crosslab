// Import the dependencies for testing
// import chai from 'chai';
// import app from '../src/app';
import { check, relate } from './helper.js';

//describe('authorization', function () {
//    it('should default to false', async function () {
//        const response = await chai.request(app).get('/authorize')
//        response.should.have.status(200);
//        response.body.should.be.a('boolean');
//        response.body.should.equal(false);
//    });
//});

for (const object of [
  'device',
  'peerconnection',
  'experiment',
  'booking',
  'federation',
]) {
  describe(object, function () {
    before(async function () {
      await relate('user:owner', 'owner', object + ':Test');
      await relate('user:viewer', 'viewer', object + ':Test');
    });

    for (const action of ['view', 'edit', 'delete']) {
      it('should be ' + action + 'able by the owner', async function () {
        (await check('user:owner', action, object + ':Test')).should.equal(true);
      });
    }

    for (const action of ['view']) {
      it('should be ' + action + 'able by the viewer', async function () {
        (await check('user:viewer', action, object + ':Test')).should.equal(true);
      });
    }

    for (const action of ['edit', 'delete']) {
      it('should not be ' + action + 'able by the viewer', async function () {
        (await check('user:viewer', action, object + ':Test')).should.equal(false);
      });
    }

    for (const action of ['view', 'edit', 'delete']) {
      it('should not be ' + action + 'able by unassociated user', async function () {
        (await check('user:unassociated', action, object + ':Test')).should.equal(false);
      });
    }
  });
}
