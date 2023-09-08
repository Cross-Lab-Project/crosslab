import { experimentUrlFromId } from '../../../src/methods/url.js';
import { ExperimentEntityDataWithLinks } from './index.spec.js';

const uuid = '35353547-9d2c-473c-bc03-40753e15d5bc';

export const example_experiment: ExperimentEntityDataWithLinks = {
  request: {
    devices: ['example device'],
    roles: ['example role'],
    serviceConfigurations: ['example serviceConfiguration'],
    status: 'created',
  },
  model: {
    uuid,
    status: 'created',
    devices: ['example device'],
    roles: ['example role'],
    serviceConfigurations: ['example serviceConfiguration'],
    connections: ['example peerconnection'],
  },
  response: {
    url: experimentUrlFromId(uuid),
    status: 'created',
    devices: ['example device'],
    roles: ['example role'],
    serviceConfigurations: ['example serviceConfiguration'],
    connections: ['example peerconnection'],
    instantiatedDevices: [],
  },
};
