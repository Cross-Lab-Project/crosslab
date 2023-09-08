import { APIClient } from '@cross-lab-project/api-client';

export interface ClientContext {
  client: APIClient;
}

export const mochaHooks = {
  async beforeAll(this: ClientContext & Mocha.Context) {
    this.client = new APIClient('http://localhost');
  },
};
