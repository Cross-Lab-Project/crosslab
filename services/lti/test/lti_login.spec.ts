import { expect } from 'chai';
import { app } from '../src/app.js';
import { LTIPlatform } from '../src/business/lti_platform.js';
import { chai, resetDatabase } from './helper.js';
import { PlatformHost } from './platform_host.js';

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
    this.timeout(0);
    app.authorization_mock = [{ result: false }];
    let res = await launch(platform, platformHost);
    expect(res.status).to.equal(200, res.text);
    expect(res.body.access_token).to.equal('token');
  });

  it('should be able to launch multiple times', async function () {
    this.timeout(0);
    app.authorization_mock = [{ result: false }];
    let res = await launch(platform, platformHost);
    expect(res.status).to.equal(200, res.text);
    expect(res.body.access_token).to.equal('token');
    res = await launch(platform, platformHost);
    expect(res.status).to.equal(200, res.text);
    expect(res.body.access_token).to.equal('token');
  });
});

async function launch(platform: LTIPlatform, platformHost: PlatformHost) {
  let res = await chai
    .request(app)
    .post('/lti/platform/' + platform.platform_id + '/login')
    .send(
      platformHost.get_login_parameters(
        '/lti/platform/' + platform.platform_id + '/launch'
      )
    );
  expect(res.status).to.equal(200, res.text);
  res = await chai
    .request(app)
    .post('/lti/platform/' + platform.platform_id + '/launch')
    .send(
      await platformHost.get_launch_parameters(res.body.authentication_request_url, {
        'https://purl.imsglobal.org/spec/lti/claim/message_type': 'LtiResourceLinkRequest',
        'https://purl.imsglobal.org/spec/lti/claim/roles': [
          '"http://purl.imsglobal.org/vocab/lis/v2/institution/person#Student',
        ],
        'https://purl.imsglobal.org/spec/lti/claim/resource_link': {
          id: '200d101f-2c14-434a-a0f3-57c2a42369fd',
          description: 'Assignment to introduce who you are',
          title: 'Introduction Assignment',
        },
      })
    );
  return res;
}
