import deleteSpec from './delete.spec'
import getSpec from './get.spec'
import patchSpec from './patch.spec'
import userTests from './users/index.spec'

export default [getSpec, patchSpec, deleteSpec, ...userTests]
