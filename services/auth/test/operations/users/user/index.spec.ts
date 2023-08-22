import deleteTest from './delete.spec'
import getTest from './get.spec'
import patchTest from './patch.spec'
import roleTests from './roles/index.spec'

export default [deleteTest, getTest, patchTest, ...roleTests]