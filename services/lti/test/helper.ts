import { logging } from '@crosslab/service-common';
import * as chaiModule from 'chai';
import chaiHttp from 'chai-http';
import { Server } from 'http';

import { init_app } from '../src/app.js';
import { init_database } from '../src/database/datasource.js';
import { APIMock } from './api_mock.js';

import wtf from 'wtfnode';

export const chai = chaiModule.use(chaiHttp) ;
chai.should();

let server: Server;
let apiMock: APIMock;
before(async () => {
  apiMock=new APIMock();
  await apiMock.init();
  logging.init({ LOGGING: 'fatal' });
  const app = init_app();
  server = app.listen(3000);
});

after(() => {
  apiMock.close();
  server.close();
  setTimeout(() => ()=>{wtf.dump();}, 2000);
});

beforeEach(()=>{})

export async function resetDatabase() {
  await init_database({
    type: 'sqlite',
    logging: true,
    database: ':memory:',
    synchronize: true,
  });
}
