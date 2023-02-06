import { config } from '../../src/config'
import { UserModel } from '../../src/database/model'
import { User } from '../../src/generated/types'
import { EntityData, ReplaceWith, Subset } from './index.spec'
import { resolveRole, RoleName } from './roleData.spec'
import { resolveToken, TokenName } from './tokenData.spec'

export const userNames = [
    'superadmin',
    'deviceservice',
    'GET /auth user',
    'POST /device_authentication_token user',
    'POST /logout user',
] as const
export type UserName = (typeof userNames)[number]
export type UserData = Record<UserName, EntityData<UserModel>>

type UserWithLinks<T extends 'all' | 'request' | 'response' = 'all'> = ReplaceWith<
    User<T>,
    'roles',
    RoleName[]
>
type UserModelWithLinks = ReplaceWith<
    ReplaceWith<UserModel, 'roles', RoleName[]>,
    'tokens',
    TokenName[]
>
type UserDataWithLinks = Record<
    UserName,
    {
        request: UserWithLinks<'request'>
        model: UserModelWithLinks
        response: UserWithLinks<'response'>
    }
>

const userDataWithLinks: UserDataWithLinks = {
    superadmin: {
        request: {
            username: 'superadmin',
            password: 'superadmin',
            roles: ['superadmin', 'user'],
        },
        model: {
            username: 'superadmin',
            password: '$2a$10$jA9acOfIQxpzj6X50TcDPugDOb4gXLvdsyEVl.9WUDns1jk565dJS',
            roles: ['superadmin', 'user'],
            tokens: [
                'superadmin valid user token 1',
                'superadmin valid user token 2',
                'superadmin expired token',
            ],
        },
        response: {
            url: `${config.BASE_URL}${
                config.BASE_URL.endsWith('/') ? '' : '/'
            }users/superadmin`,
            username: 'superadmin',
            roles: ['superadmin', 'user'],
        },
    },
    deviceservice: {
        request: {
            username: 'deviceservice',
            password: 'deviceservice',
        },
        model: {
            username: 'deviceservice',
            password: '$2a$10$KHBOyR7Sc0DNuKDAf1.Yv.zVnlhwxiarYO7WGoTyLjKxMeHfuhbKm',
            roles: ['deviceservice'],
            tokens: [],
        },
        response: {
            url: `${config.BASE_URL}${
                config.BASE_URL.endsWith('/') ? '' : '/'
            }users/deviceservice`,
            username: 'deviceservice',
            roles: ['deviceservice'],
        },
    },
    'GET /auth user': {
        request: {
            username: 'getauthuser',
            password: '843fdh8qhq2',
            roles: ['user'],
        },
        model: {
            username: 'getauthuser',
            password: '$2a$10$SjNNdG4FWEDFQWY0cJz7GePMD1wTU3Mtj3663vB0kcYC3b7q6nr1S',
            roles: ['user'],
            tokens: [
                'GET /auth expired token',
                'GET /auth valid device token',
                'GET /auth valid user token',
            ],
        },
        response: {
            url: `${config.BASE_URL}${
                config.BASE_URL.endsWith('/') ? '' : '/'
            }users/getauthuser`,
            username: 'getauthuser',
            roles: ['user'],
        },
    },
    'POST /device_authentication_token user': {
        request: {
            username: 'postdeviceauthenticationtoken',
            password: '843fdh8qhq2',
            roles: ['user'],
        },
        model: {
            username: 'postdeviceauthenticationtoken',
            password: '$2a$10$SjNNdG4FWEDFQWY0cJz7GePMD1wTU3Mtj3663vB0kcYC3b7q6nr1S',
            roles: ['user'],
            tokens: [],
        },
        response: {
            url: `${config.BASE_URL}${
                config.BASE_URL.endsWith('/') ? '' : '/'
            }users/postdeviceauthenticationtoken`,
            username: 'postdeviceauthenticationtoken',
            roles: ['user'],
        },
    },
    'POST /logout user': {
        request: {
            username: 'postlogoutuser',
            password: '843fdh8qhq2',
            roles: ['user'],
        },
        model: {
            username: 'postlogoutuser',
            password: '$2a$10$SjNNdG4FWEDFQWY0cJz7GePMD1wTU3Mtj3663vB0kcYC3b7q6nr1S',
            roles: ['user'],
            tokens: ['POST /logout valid user token'],
        },
        response: {
            url: `${config.BASE_URL}${
                config.BASE_URL.endsWith('/') ? '' : '/'
            }users/postlogoutuser`,
            username: 'postlogoutuser',
            roles: ['user'],
        },
    },
}

export function prepareUserData(): UserData {
    const userData: Subset<UserData> = {}
    for (const userName of userNames) {
        userData[userName] = {
            request: {
                ...userDataWithLinks[userName].request,
                roles: undefined,
            },
            model: {
                ...userDataWithLinks[userName].model,
                roles: undefined,
                tokens: undefined,
            },
            response: {
                ...userDataWithLinks[userName].response,
                roles: undefined,
            },
        }
    }
    for (const key of userNames) {
        userData[key]!.request!.roles = userDataWithLinks[key].request.roles
            ? userDataWithLinks[key].request.roles?.map(
                  (roleName) => resolveRole(roleName, userData).request
              )
            : undefined

        userData[key]!.model!.roles = userDataWithLinks[key].model.roles
            ? userDataWithLinks[key].model.roles.map(
                  (roleName) => resolveRole(roleName, userData).model
              )
            : []
        userData[key]!.model!.tokens = userDataWithLinks[key].model.tokens
            ? userDataWithLinks[key].model.tokens.map(
                  (tokenName) => resolveToken(tokenName, userData).model
              )
            : []

        userData[key]!.response!.roles = userDataWithLinks[key].response.roles
            ? userDataWithLinks[key].response.roles?.map(
                  (roleName) => resolveRole(roleName, userData).response
              )
            : []
    }

    return userData as UserData
}
