import { expect } from 'chai';

import { app } from '../src/app.js';
import { LTIPlatform } from '../src/business/lti_platform.js';
import { LTIResource } from '../src/business/lti_resource.js';
import { config } from '../src/config.js';
import { apiMock, chai, resetDatabase } from './helper.js';
import { PlatformHost, launch } from './platform_host.js';

describe('LTI Role Selection', () => {
  let platform: LTIPlatform;
  let platformHost: PlatformHost;
  let resource: LTIResource;

  before(async function () {
    await resetDatabase();
    platform = await LTIPlatform.create('user1');
    platformHost = new PlatformHost();
    resource = await LTIResource.getOrCreate(
      { resource_link_id: '200d101f-2c14-434a-a0f3-57c2a42369fd' },
      platform,
    );
    await resource.update({
      experiment_template_uri:
        config.BASE_URL + '/templates/8e1bcc6b-a259-4ab2-8443-0dc74f84ba60',
    });
    await platformHost.init();
  });
  after(() => {
    platformHost.close();
  });

  it('should be able to modify session experiment', async function () {
    app.authorization_mock = [{ result: false }];
    let res = await launch(platform, platformHost);
    expect(res.status).to.equal(200, res.text);

    expect(apiMock.requests.slice(-2, -1)).to.deep.equal([
      {
        url: '/experiments?',
        method: 'POST',
        body: {
          status: 'created',
          devices: [
            {
              device:
                config.BASE_URL+'/devices/879297b0-d4bf-40c9-92c4-c0f7a8b01020',
              role: 'pspu',
            },
            {
              device:
                config.BASE_URL+'/devices/8aaabfd2-5075-4dbb-92d1-ff561ec68269',
              role: 'ecp',
            },
          ],
          roles: [{ name: 'pspu' }, { name: 'ecp' }],
          serviceConfigurations: [],
        },
      },
    ]);

    app.authorization_mock = [{ result: true }];
    const session_url = res.body.session.uri.replace(config.BASE_URL, '');
    res = await chai
      .request(app)
      .patch(session_url + '/experiment')
      .send({role_mapping: [{role: 'pspu', device: config.BASE_URL+'/devices/879297b0-d4bf-40c9-92c4-c0f7a8b010ff'}]});
    expect(res.status).to.equal(201, res.text);

    expect(apiMock.requests.slice(-1)).to.deep.equal([
      {
        url: '/experiments/cc384616-9c1a-4d56-bad7-a605df71acd3?',
        method: 'PATCH',
        body: {
          devices: [
            {
              device:
                config.BASE_URL+'/devices/879297b0-d4bf-40c9-92c4-c0f7a8b010ff',
              role: 'pspu',
            },
            {
              device:
                config.BASE_URL+'/devices/8aaabfd2-5075-4dbb-92d1-ff561ec68269',
              role: 'ecp',
            },
          ],
          roles: [{ name: 'pspu' }, { name: 'ecp' }],
          serviceConfigurations: [],
        },
      },
    ]);
  });
});
