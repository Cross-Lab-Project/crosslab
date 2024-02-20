import chai from 'chai';
import 'chai-http';

import { app } from '../src/app.ts';
import { UserModel } from '../src/database/model.js';
import { createNewToken } from '../src/token/helper.js';
import { createUser } from '../src/user/helper.js';
import { resetDatabase } from './helper.js';

describe('Authentication', () => {
  let valid_token!: string;
  let user: UserModel;

  before(async function () {
    await resetDatabase();
    user = await createUser('user', 'password', 'local');
    valid_token = await createNewToken(user);
  });

  it('should allow a valid token to generate an internal jwt', async function () {
    const res = await chai
      .request(app)
      .get('/auth')
      .set('Authorization', `Bearer ${valid_token}`);

    res.should.have.status(200);
    res.should.have.header('X-Request-Authentication');
  });

  it('should not allow an invalid token to generate an internal jwt', async function () {
    const res = await chai.request(app).get('/auth');

    res.should.have.status(200);
    res.should.not.have.header('X-Request-Authentication');
  });
});
