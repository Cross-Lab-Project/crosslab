import { expect } from 'chai';

import { app } from '../src/app.js';
import { LTIPlatform } from '../src/business/lti_platform.js';
import { ApplicationDataSource } from '../src/database/datasource.js';
import { PlatformModel } from '../src/database/model.js';
import { deletePendingPlatforms } from '../src/tasks/cleanup.js';
import { chai, resetDatabase } from './helper.js';

describe('Platform', () => {
  let platforms: LTIPlatform[];
  before(async function () {
    await resetDatabase();
    platforms = await Promise.all([
      LTIPlatform.create('user1'),
      LTIPlatform.create('user2'),
    ]);
    for (const platform of platforms) {
        platform.platform_model.createdDate = new Date('2024-01-01');
        await ApplicationDataSource.manager.save(platform.platform_model);
    }
    for (const platform of platforms.slice(0,1)) {
      platform.platform_model.registrated = true;
      await ApplicationDataSource.manager.save(platform.platform_model);
    }
  });

  it('should list platforms when authorized', async function () {
    app.authorization_mock = [{ result: true }];
    const res = await chai
      .request(app)
      .get('/lti/platform')
      .set('X-Request-Authentication', 'user')
      .send({});
    res.should.have.status(200);
    expect(res.body.length).to.equal(1);
  });

  it('should delete not registered platforms from the database', async function () {
    await deletePendingPlatforms()
    const platforms = await ApplicationDataSource.manager.find(PlatformModel);
    expect(platforms.length).to.equal(1);
  });

  it('should create a platform when authorized', async function () {
    app.authorization_mock = [{ result: true }];
    const res = await chai
      .request(app)
      .post('/lti/platform')
      .set('X-Request-Authentication', 'user')
      .send({});
    res.should.have.status(201);
    expect(app.authorization_mock_log).to.deep.equal([
      { add: [{ subject: 'user', relation: 'owner', object: res.body.uri }], remove: [] },
    ]);
  });

  it('should NOT create a platform when NOT authorized', async function () {
    app.authorization_mock = [{ result: false }];
    const res = await chai
      .request(app)
      .post('/lti/platform')
      .set('X-Request-Authentication', 'user')
      .send({});
    res.should.have.status(403);
  });
});
