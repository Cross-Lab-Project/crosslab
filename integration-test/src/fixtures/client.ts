import { APIClient } from '@cross-lab-project/api-client';

export interface ClientContext {
  client: APIClient;
}

export const mochaHooks = {
  async beforeAll(this: ClientContext & Mocha.Context) {
    this.client = new APIClient(process.env['HOST']??'http://localhost');
    const username=process.env['USERNAME'];
    const password=process.env['PASSWORD'];
    if (username && password){
      await this.client.login(username, password)
    }
  },
};
