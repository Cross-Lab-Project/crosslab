import availabilitySpec from './availability/index.spec'
import deleteSpec from './delete.spec'
import getSpec from './get.spec'
import patchSpec from './patch.spec'
import postSpec from './post.spec'

export default [...availabilitySpec, deleteSpec, getSpec, patchSpec, postSpec]
