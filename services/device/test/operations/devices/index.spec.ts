import deviceTests from './device/index.spec.js';
import getSpec from './get.spec.js';
import postSpec from './post.spec.js';

export default [getSpec, postSpec, ...deviceTests];
