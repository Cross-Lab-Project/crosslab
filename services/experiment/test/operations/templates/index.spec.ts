import getSpec from './get.spec';
import postSpec from './post.spec';
import templateTests from './template/index.spec';

export default [getSpec, postSpec, ...templateTests];
