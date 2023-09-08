import * as callbacks from './callbacks/index.js';
import * as operationsDevices from './devices/index.js';
import * as operationsPeerconnections from './peerconnections/index.js';

export default {
  ...operationsDevices,
  ...operationsPeerconnections,
  ...callbacks,
};
