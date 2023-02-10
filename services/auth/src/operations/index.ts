import * as operationsAuth from './auth'
import * as operationsDeviceAuthenticationToken from './deviceAuthenticationToken'
import * as operationsIdentity from './identity'
import * as operationsLogin from './login'
import * as operationsLogout from './logout'
import * as operationsUsers from './users'
import * as operationsRoles from './roles'

export default {
    ...operationsAuth,
    ...operationsDeviceAuthenticationToken,
    ...operationsIdentity,
    ...operationsLogin,
    ...operationsLogin,
    ...operationsLogout,
    ...operationsUsers,
    ...operationsRoles,
}