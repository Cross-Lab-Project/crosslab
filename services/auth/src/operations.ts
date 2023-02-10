import * as operationsAuth from './operations/auth'
import * as operationsDeviceAuthenticationToken from './operations/deviceAuthenticationToken'
import * as operationsIdentity from './operations/identity'
import * as operationsLogin from './operations/login'
import * as operationsLogout from './operations/logout'
import * as operationsUsers from './operations/users'
import * as operationsRoles from './operations/roles'

const operations = {
    ...operationsAuth,
    ...operationsDeviceAuthenticationToken,
    ...operationsIdentity,
    ...operationsLogin,
    ...operationsLogin,
    ...operationsLogout,
    ...operationsUsers,
    ...operationsRoles,
}

export default operations

export * from './operations/auth'
export * from './operations/deviceAuthenticationToken'
export * from './operations/identity'
export * from './operations/login'
export * from './operations/logout'
export * from './operations/users'
export * from './operations/roles'
