import { UserModel } from '../../src/database/model'
import { UserRepository } from '../../src/database/repositories/userRepository'
import { User } from '../../src/generated/types'
import { userUrlFromId } from '../../src/methods/utils'
import { resolveRole, RoleName } from './roleData.spec'
import { resolveToken, TokenName } from './tokenData.spec'
import { ReplaceWith, Subset } from '@crosslab/service-common'
import { EntityData } from '@crosslab/service-common/test-helper'

export const userNames = [
    'superadmin',
    'deviceservice',
    'GET /auth user',
    'POST /device_authentication_token user',
    'POST /logout user',
] as const
export type UserName = (typeof userNames)[number]
export type UserData = Record<UserName, EntityData<UserRepository>>

type UserModelWithLinks = ReplaceWith<
    ReplaceWith<UserModel, 'roles', RoleName[]>,
    'tokens',
    TokenName[]
>
type UserDataWithLinks = Record<
    UserName,
    {
        request: User<'request'>
        model: UserModelWithLinks
        response: User<'response'>
    }
>

const userDataWithLinks: UserDataWithLinks = {
    'superadmin': {
        request: {
            username: 'superadmin',
            password: 'superadmin',
        },
        model: {
            uuid: '6dcb9c40-b0bd-496a-b5a6-cfd3570d8131',
            username: 'local:superadmin',
            password: '$2a$10$jA9acOfIQxpzj6X50TcDPugDOb4gXLvdsyEVl.9WUDns1jk565dJS',
            roles: ['superadmin', 'user'],
            tokens: [
                'superadmin valid user token 1',
                'superadmin valid user token 2',
                'superadmin expired token',
            ],
        },
        response: {
            id: '6dcb9c40-b0bd-496a-b5a6-cfd3570d8131',
            url: userUrlFromId('6dcb9c40-b0bd-496a-b5a6-cfd3570d8131'),
            username: 'local:superadmin',
        },
    },
    'deviceservice': {
        request: {
            username: 'deviceservice',
            password: 'deviceservice',
        },
        model: {
            uuid: 'd2389a10-e9f4-4153-8f25-a7018b8ca3df',
            username: 'local:deviceservice',
            password: '$2a$10$KHBOyR7Sc0DNuKDAf1.Yv.zVnlhwxiarYO7WGoTyLjKxMeHfuhbKm',
            roles: ['deviceservice'],
            tokens: [],
        },
        response: {
            id: 'd2389a10-e9f4-4153-8f25-a7018b8ca3df',
            url: userUrlFromId('d2389a10-e9f4-4153-8f25-a7018b8ca3df'),
            username: 'local:deviceservice',
        },
    },
    'GET /auth user': {
        request: {
            username: 'getauthuser',
            password: '843fdh8qhq2',
        },
        model: {
            uuid: 'cd6c537f-86e7-45a4-8d8e-eece4d46c78d',
            username: 'local:getauthuser',
            password: '$2a$10$SjNNdG4FWEDFQWY0cJz7GePMD1wTU3Mtj3663vB0kcYC3b7q6nr1S',
            roles: ['user'],
            tokens: [
                'GET /auth expired token',
                'GET /auth valid device token',
                'GET /auth valid user token',
            ],
        },
        response: {
            id: 'cd6c537f-86e7-45a4-8d8e-eece4d46c78d',
            url: userUrlFromId('cd6c537f-86e7-45a4-8d8e-eece4d46c78d'),
            username: 'local:getauthuser',
        },
    },
    'POST /device_authentication_token user': {
        request: {
            username: 'postdeviceauthenticationtoken',
            password: '843fdh8qhq2',
        },
        model: {
            uuid: '50ccf56b-6032-4d92-9e33-75392912c96e',
            username: 'local:postdeviceauthenticationtoken',
            password: '$2a$10$SjNNdG4FWEDFQWY0cJz7GePMD1wTU3Mtj3663vB0kcYC3b7q6nr1S',
            roles: ['user'],
            tokens: [],
        },
        response: {
            id: '50ccf56b-6032-4d92-9e33-75392912c96e',
            url: userUrlFromId('50ccf56b-6032-4d92-9e33-75392912c96e'),
            username: 'local:postdeviceauthenticationtoken',
        },
    },
    'POST /logout user': {
        request: {
            username: 'postlogoutuser',
            password: '843fdh8qhq2',
        },
        model: {
            uuid: '3762b0ee-7032-4c79-82e6-f42f91298799',
            username: 'local:postlogoutuser',
            password: '$2a$10$SjNNdG4FWEDFQWY0cJz7GePMD1wTU3Mtj3663vB0kcYC3b7q6nr1S',
            roles: ['user'],
            tokens: ['POST /logout valid user token'],
        },
        response: {
            id: '3762b0ee-7032-4c79-82e6-f42f91298799',
            url: userUrlFromId('3762b0ee-7032-4c79-82e6-f42f91298799'),
            username: 'local:postlogoutuser',
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
    }

    return userData as UserData
}
