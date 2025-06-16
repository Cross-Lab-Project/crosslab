import { expect } from 'chai';
import { app } from '../src/app.js';
import { LTIPlatform } from '../src/business/lti_platform.js';
import { resetDatabase } from './helper.js';
import { launch, PlatformHost } from './platform_host.js';

describe('LTI Login', () => {
  let platform: LTIPlatform;
  let platformHost: PlatformHost;
  before(async function () {
    await resetDatabase();
    platform = await LTIPlatform.create('user1');
    platformHost = new PlatformHost();
    await platformHost.init();
  });
  after(()=> {
    platformHost.close();
  });

  it('should be able to launch', async function () {
    app.authorization_mock = [{ result: false }];
    let res = await launch(platform, platformHost);
    expect(res.status).to.equal(200, res.text);
    expect(res.body.access_token).to.equal('token');
  });

  it('should be able to launch multiple times', async function () {
    app.authorization_mock = [{ result: false }];
    let res = await launch(platform, platformHost);
    expect(res.status).to.equal(200, res.text);
    expect(res.body.access_token).to.equal('token');
    res = await launch(platform, platformHost);
    expect(res.status).to.equal(200, res.text);
    expect(res.body.access_token).to.equal('token');
  });
});