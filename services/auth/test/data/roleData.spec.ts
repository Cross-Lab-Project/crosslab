import { RoleModel, UserModel } from '../../src/database/model'
import { RoleRepository } from '../../src/database/repositories/roleRepository'
import { Role } from '../../src/generated/types'
import { roleUrlFromId } from '../../src/methods/utils'
import { resolveScope, ScopeName } from './scopeData.spec'
import { UserData, UserName } from './userData.spec'
import { EntityData, ReplaceWith, Subset } from '@crosslab/service-common'

export const roleNames = ['superadmin', 'user', 'deviceservice', 'device'] as const
export type RoleName = (typeof roleNames)[number]
export type RoleData = Record<RoleName, EntityData<RoleRepository>>

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
            uuid: '1c7d1e81-a902-464a-b8ba-5a5c88a5ceb4',
            name: 'superadmin',
            scopes: ['scope 1', 'scope 2', 'scope 3', 'scope 4', 'scope 5'],
            users: ['superadmin'],
        },
        response: {
            id: '1c7d1e81-a902-464a-b8ba-5a5c88a5ceb4',
            url: roleUrlFromId('1c7d1e81-a902-464a-b8ba-5a5c88a5ceb4'),
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
            uuid: 'a386a9cf-04a3-424b-a78b-4f81eb6ea6eb',
            name: 'user',
            scopes: ['scope 1', 'scope 2', 'scope 3'],
            users: [
                'superadmin',
                'GET /auth user',
                'POST /device_authentication_token user',
                'POST /logout user',
            ],
        },
        response: {
            id: 'a386a9cf-04a3-424b-a78b-4f81eb6ea6eb',
            url: roleUrlFromId('a386a9cf-04a3-424b-a78b-4f81eb6ea6eb'),
            name: 'user',
            scopes: ['scope 1', 'scope 2', 'scope 3'],
        },
    },
    device: {
        request: {
            name: 'device',
            scopes: ['scope 1', 'scope 2'],
        },
        model: {
            uuid: 'a386a9cf-04a3-424b-a78b-4f81eb6effeb',
            name: 'device',
            scopes: ['scope 1', 'scope 2'],
            users: [],
        },
        response: {
            id: 'a386a9cf-04a3-424b-a78b-4f81eb6effeb',
            url: roleUrlFromId('a386a9cf-04a3-424b-a78b-4f81eb6effeb'),
            name: 'device',
            scopes: ['scope 1', 'scope 2'],
        },
    },
    deviceservice: {
        request: {
            name: 'deviceservice',
            scopes: [],
        },
        model: {
            uuid: '3bf24ecb-78af-4193-87c7-ccc531c24d57',
            name: 'deviceservice',
            scopes: [],
            users: ['deviceservice'],
        },
        response: {
            id: '3bf24ecb-78af-4193-87c7-ccc531c24d57',
            url: roleUrlFromId('3bf24ecb-78af-4193-87c7-ccc531c24d57'),
            name: 'deviceservice',
            scopes: [],
        },
    },
}

export function resolveRole(
    roleName: RoleName,
    userData: Subset<UserData>
): EntityData<RoleRepository> {
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
