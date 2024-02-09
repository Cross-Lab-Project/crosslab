import { ServiceConfigurationEntityDataWithLinks } from './index.spec.js';

const serviceType = 'exampleType';

export const example_serviceConfiguration: ServiceConfigurationEntityDataWithLinks = {
  request: {
    serviceType,
    participants: ['example participant'],
  },
  model: {
    uuid: '627c4c6a-2969-4341-b4ac-ce912b76d649',
    serviceType,
    participants: ['example participant'],
    experiment: 'example experiment',
  },
  response: {
    serviceType,
    participants: ['example participant'],
  },
};
