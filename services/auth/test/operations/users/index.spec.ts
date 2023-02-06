import getTest from './get.spec'
import postTest from './post.spec'
import userTests from './user/index.spec'

export default [getTest, postTest, ...userTests]
