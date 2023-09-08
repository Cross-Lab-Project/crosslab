import { query, relate } from './helper';

describe('relations', function () {
  this.beforeAll(async function () {
    await relate('user:relate', 'owner', 'device:relate');
  });

  it('should be queryable by full tuple', async function () {
    const result = await query('user:relate', 'owner', 'device:relate');
    result.should.deep.equal([
      { subject: 'user:relate', relation: 'owner', object: 'device:relate' },
    ]);
  });

  it('should be queryable by object only', async function () {
    const result = await query(undefined, undefined, 'device:relate');
    result.should.deep.equal([
      { subject: 'user:relate', relation: 'owner', object: 'device:relate' },
    ]);
  });

  it('should be queryable by object type and subject', async function () {
    const result = await query('user:relate', undefined, 'device');
    result.should.deep.equal([
      { subject: 'user:relate', relation: 'owner', object: 'device:relate' },
    ]);
  });

  it('should be queryable by object and relation', async function () {
    const result = await query(undefined, 'owner', 'device:relate');
    result.should.deep.equal([
      { subject: 'user:relate', relation: 'owner', object: 'device:relate' },
    ]);
  });
});
