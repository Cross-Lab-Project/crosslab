import getSpec from './get.spec.js';
import postSpec from './post.spec.js';
import templateTests from './template/index.spec.js';

export default [getSpec, postSpec, ...templateTests];
