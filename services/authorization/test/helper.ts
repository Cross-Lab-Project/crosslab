import * as chaiModule from 'chai';
import chaiHttp from 'chai-http';

import app from '../src/app.js';

// Configure chai
export const chai = chaiModule.use(chaiHttp);
chai.should();

export async function relate(subject: string, relation: string, object: string) {
  (
    await chai
      .request(app)
      .post('/relations/update')
      .set('X-Authorization-PSK', 'TestPSK')
      .send({ add: [{ subject, relation, object }] })
  ).should.have.status(200);
}

export async function unrelate(subject: string, relation: string, object: string) {
  (
    await chai
      .request(app)
      .post('/relations/update')
      .set('X-Authorization-PSK', 'TestPSK')
      .send({ remove: [{ subject, relation, object }] })
  ).should.have.status(200);
}

export async function check(subject: string, action: string, object: string) {
  const getResponse = await chai
    .request(app)
    .get('/authorize?subject=' + subject + '&action=' + action + '&object=' + object)
    .set('X-Authorization-PSK', 'TestPSK');
  getResponse.should.have.status(200);
  getResponse.body.result.should.be.a('boolean');
  getResponse.body.reason.should.be.a('string');

  const postResponse = await chai
    .request(app)
    .post('/authorize')
    .set('X-Authorization-PSK', 'TestPSK')
    .send([{ subject, action, object }]);
  postResponse.should.have.status(200);
  postResponse.body.should.be.a('array');
  postResponse.body[0].result.should.be.a('boolean');
  postResponse.body[0].reason.should.be.a('string');

  getResponse.body.result.should.equal(postResponse.body[0].result);
  getResponse.body.reason.should.equal(postResponse.body[0].reason);
  return getResponse.body.result;
}

export async function query(
  subject: string | undefined,
  relation: string | undefined,
  object: string,
) {
  const putResponse = await chai
    .request(app)
    .post('/relations/query')
    .set('X-Authorization-PSK', 'TestPSK')
    .send({ subject, relation, object });
  putResponse.should.have.status(200);
  putResponse.body.should.be.a('array');
  return putResponse.body;
}
