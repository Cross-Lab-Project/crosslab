import getSpec from './get.spec'
import postSpec from './post.spec'
import roleTests from './role/index.spec'

export default [getSpec, postSpec, ...roleTests]
