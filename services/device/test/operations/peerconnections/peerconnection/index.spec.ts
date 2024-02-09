import deleteSpec from './delete.spec.js';
import deviceStatusSpec from './device_status/index.spec.js';
import getSpec from './get.spec.js';

export default [deleteSpec, getSpec, ...deviceStatusSpec];
