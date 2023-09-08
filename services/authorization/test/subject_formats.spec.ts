import * as jose from 'jose';

import { check, relate } from './helper';

const secret = new TextEncoder().encode('secret');
const jwt = new jose.SignJWT({
  sub: 'user:https://api.goldi-labs.de/users/subject_format',
})
  .setProtectedHeader({ alg: 'HS256' })
  .sign(secret);

describe('Subject Formats', function () {
  before(async function () {
    await relate(
      'user:https://api.goldi-labs.de/users/subject_format',
      'owner',
      'device:subject_spec',
    );
  });

  it('should be read in jwt format', async function () {
    (await check(await jwt, 'view', 'device:subject_spec')).should.equal(true);
  });

  it('should be read fully qualified subject', async function () {
    (
      await check(
        'user:https://api.goldi-labs.de/users/subject_format',
        'view',
        'device:subject_spec',
      )
    ).should.equal(true);
  });

  it('should be read in short format', async function () {
    (
      await check(
        'https://api.goldi-labs.de/users/subject_format',
        'view',
        'device:subject_spec',
      )
    ).should.equal(true);
  });
});
