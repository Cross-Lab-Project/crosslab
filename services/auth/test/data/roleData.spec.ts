import { RoleModel, UserModel } from '../../src/database/model'
import { Role } from '../../src/generated/types'
import { EntityData, ReplaceWith, Subset } from './index.spec'
import { resolveScope, ScopeName } from './scopeData.spec'
import { UserData, UserName } from './userData.spec'

export const roleNames = ['superadmin', 'user', 'deviceservice'] as const
export type RoleName = (typeof roleNames)[number]
export type RoleData = Record<RoleName, EntityData<RoleModel>>

type RoleWithLinks<T extends 'all' | 'request' | 'response' = 'all'> = ReplaceWith<
    Role<T>,
    'scopes',
    ScopeName[]
>
type RoleModelWithLinks = ReplaceWith<
    ReplaceWith<RoleModel, 'scopes', ScopeName[]>,
    'users',
    UserName[]
>
type RoleDataWithLinks = Record<
    RoleName,
    {
        request: RoleWithLinks<'request'>
        model: RoleModelWithLinks
        response: RoleWithLinks<'response'>
    }
>

const roleDataWithLinks: RoleDataWithLinks = {
    superadmin: {
        request: {
            name: 'superadmin',
            scopes: ['scope 1', 'scope 2', 'scope 3', 'scope 4', 'scope 5'],
        },
        model: {
            name: 'superadmin',
            scopes: ['scope 1', 'scope 2', 'scope 3', 'scope 4', 'scope 5'],
            users: ['superadmin'],
        },
        response: {
            name: 'superadmin',
            scopes: ['scope 1', 'scope 2', 'scope 3', 'scope 4', 'scope 5'],
        },
    },
    user: {
        request: {
            name: 'user',
            scopes: ['scope 1', 'scope 2', 'scope 3'],
        },
        model: {
            name: 'user',
            scopes: ['scope 1', 'scope 2', 'scope 3'],
            users: ['superadmin'],
        },
        response: {
            name: 'user',
            scopes: ['scope 1', 'scope 2', 'scope 3'],
        },
    },
    deviceservice: {
        request: {
            name: 'deviceservice',
            scopes: [],
        },
        model: {
            name: 'deviceservice',
            scopes: [],
            users: ['deviceservice'],
        },
        response: {
            name: 'deviceservice',
            scopes: [],
        },
    },
}

export function resolveRole(
    roleName: RoleName,
    userData: Subset<UserData>
): EntityData<RoleModel> {
    return {
        request: {
            ...roleDataWithLinks[roleName].request,
            scopes: roleDataWithLinks[roleName].request.scopes?.map(
                (scopeName) => resolveScope(scopeName).request
            ),
        },
        model: {
            ...roleDataWithLinks[roleName].model,
            scopes: roleDataWithLinks[roleName].model.scopes.map(
                (scopeName) => resolveScope(scopeName).model
            ),
            users: roleDataWithLinks[roleName].model.users.map(
                (userName) => userData[userName]!.model as UserModel
            ),
        },
        response: {
            ...roleDataWithLinks[roleName].response,
            scopes: roleDataWithLinks[roleName].response.scopes?.map(
                (scopeName) => resolveScope(scopeName).response
            ),
        },
    }
}

export function prepareRoleData(userData: UserData): RoleData {
    const roleData: Partial<RoleData> = {}

    for (const roleName of roleNames) {
        roleData[roleName] = resolveRole(roleName, userData)
    }

    return roleData as RoleData
}
