import { logging } from '@crosslab/service-common';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Server } from 'http';

import { init_app } from '../src/app';
import { init_database } from '../src/database/datasource';

chai.use(chaiHttp);
chai.should();

let server: Server;
before(async () => {
  logging.init({ LOGGING: 'fatal' });
  const app = init_app();
  server = app.listen(3000);
});

after(() => {
  server.close();
});

export async function resetDatabase() {
  await init_database({
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
  });
}
