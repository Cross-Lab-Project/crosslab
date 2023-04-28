import deleteSpec from './delete.spec'
import deviceStatusSpec from './device_status/index.spec'
import getSpec from './get.spec'

export default [deleteSpec, getSpec, ...deviceStatusSpec]
