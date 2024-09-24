import { expect } from 'chai';
import { app } from '../src/app.js';
import { LTIPlatform } from '../src/business/lti_platform.js';
import { Student } from '../src/generated/types.js';
import { parse_resource } from '../src/operations/uris.js';
import { chai, resetDatabase } from './helper.js';
import { launch, PlatformHost } from './platform_host.js';

describe('LTI Students', () => {
  let platform: LTIPlatform;
  let platformHost: PlatformHost;
  let resource_id: string;
  before(async function () {
    await resetDatabase();
    platform = await LTIPlatform.create('user1');
    platformHost = new PlatformHost();
    await platformHost.init();
    const res=await launch(platform, platformHost);
    resource_id = parse_resource(res.body.session.resource_uri).resource_id;
  });
  after(()=> {
    platformHost.close();
  });

  it('should display students', async function () {
    app.authorization_mock = [{ result: true }];
    const res = await chai
      .request(app)
      .get('/lti/resource/'+resource_id + '/students')
      .set('X-Request-Authentication', 'user')
      .send({});
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array').that.has.length(1);
  });

  it('should update students', async function () {
    this.timeout(0);
    app.authorization_mock = [{ result: true }];
    let res = await chai
    .request(app)
    .get('/lti/resource/'+resource_id + '/students')
    .set('X-Request-Authentication', 'user')
    .send({});
    const students = res.body as Student[];
    res = await chai
      .request(app)
      .patch('/lti/resource/'+resource_id + '/students')
      .set('X-Request-Authentication', 'user')
      .send([
        {
          uri: students[0].uri,
          data:{
            role_mapping: [
              {
                role: 'Student',
                device: 'https://example.com/device1',
              },
            ],
          },
        }
      ]);
    expect(res).to.have.status(200);
    expect(res.body[0].role_mapping).to.deep.equal([
      {
        role: 'Student',
        device: 'https://example.com/device1',
      },
    ]);
  });
});

