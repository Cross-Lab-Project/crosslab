import * as operationsAuth from './auth'
import * as operationsDeviceAuthenticationToken from './deviceAuthenticationToken'
import * as operationsIdentity from './identity'
import * as operationsLogin from './login'
import * as operationsLogout from './logout'
import * as operationsRegister from './register'
import * as operationsRoles from './roles'
import * as operationsUsers from './users'

export default {
    ...operationsAuth,
    ...operationsDeviceAuthenticationToken,
    ...operationsIdentity,
    ...operationsLogin,
    ...operationsLogin,
    ...operationsLogout,
    ...operationsRegister,
    ...operationsRoles,
    ...operationsUsers,
}
