import { EntityData } from '@crosslab/service-common/test-helper';

import { InstanceRepository } from '../../../src/database/repositories/instance.js';

const url = 'https://api.localhost/devices/23d36e49-861e-4b81-9b26-7395032cd0d5';
const token = '55f00837-0e98-4eac-ab73-d1a984c4a2eb';

export const example_instance: EntityData<InstanceRepository> = {
  request: {
    url,
    token,
  },
  model: {
    uuid: 'c9e56a8d-6a7a-44d7-8492-8bdb3add4a90',
    url,
    token,
  },
  response: {
    url,
    token,
  },
};
