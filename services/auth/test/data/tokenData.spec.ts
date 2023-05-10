import { TokenModel, UserModel } from '../../src/database/model'
import { TokenRepository } from '../../src/database/repositories/tokenRepository'
import { Token } from '../../src/types/types'
import { RoleName, resolveRole } from './roleData.spec'
import { resolveScope, ScopeName } from './scopeData.spec'
import { UserData, UserName } from './userData.spec'
import { EntityData, RemoveIndex, ReplaceWith, Subset } from '@crosslab/service-common'

type ReplaceWithIteratively<
    T,
    P extends (keyof RemoveIndex<T>)[],
    R extends unknown[]
> = P extends [infer PH extends keyof RemoveIndex<T>]
    ? R extends [infer RH]
        ? ReplaceWith<T, PH, RH>
        : never
    : P extends [infer PH extends keyof RemoveIndex<T>, ...infer PT]
    ? R extends [infer RH, ...infer RT]
        ? PT extends (keyof RemoveIndex<ReplaceWith<T, PH, RH>>)[]
            ? ReplaceWithIteratively<ReplaceWith<T, PH, RH>, PT, RT>
            : never
        : never
    : never

export const tokenNames = [
    'superadmin expired token',
    'superadmin valid user token 1',
    'superadmin valid user token 2',
    'GET /auth valid user token',
    'GET /auth valid device token',
    'GET /auth expired token',
    'POST /logout valid user token',
] as const
export type TokenName = (typeof tokenNames)[number]
export type TokenData = Record<TokenName, EntityData<TokenRepository>>

type TokenWithLinks<T extends 'all' | 'request' | 'response' = 'all'> = T extends
    | 'all'
    | 'request'
    ? ReplaceWithIteratively<Token<T>, ['scopes', 'user'], [ScopeName[], UserName]>
    : undefined

type TokenModelWithLinks = ReplaceWithIteratively<
    TokenModel,
    ['roles', 'scopes', 'user'],
    [RoleName[], ScopeName[], UserName]
>
type TokenDataWithLinks = Record<
    TokenName,
    {
        request: TokenWithLinks<'request'>
        model: TokenModelWithLinks
        response: TokenWithLinks<'response'>
    }
>

const tokenDataWithLinks: TokenDataWithLinks = {
    'superadmin expired token': {
        request: {
            scopes: ['scope 1'],
            user: 'superadmin',
            roles: ['superadmin'],
            expiresOn: new Date(Date.now() - 360000).toISOString(),
        },
        model: {
            scopes: ['scope 1'],
            token: 'fe56a6bd-d09b-4d68-8874-ee214f400980',
            user: 'superadmin',
            roles: ['superadmin'],
            expiresOn: new Date(Date.now() - 360000).toISOString(),
        },
        response: undefined,
    },
    'superadmin valid user token 1': {
        request: {
            scopes: ['scope 2', 'scope 3'],
            user: 'superadmin',
            roles: ['superadmin'],
        },
        model: {
            scopes: ['scope 2', 'scope 3'],
            token: '9df0cfd1-ea6a-4d1e-8647-636419f36c5a',
            user: 'superadmin',
            roles: ['superadmin'],
        },
        response: undefined,
    },
    'superadmin valid user token 2': {
        request: {
            scopes: ['scope 1', 'scope 4', 'scope 5'],
            user: 'superadmin',
            // This url is just a mock and does not point to a valid device
            device: 'http://localhost:3000/devices/381e8aef-6a1e-4ac0-9bcf-bb4c220d0519',
            roles: ['superadmin'],
        },
        model: {
            scopes: ['scope 1', 'scope 4', 'scope 5'],
            token: 'f75df3d6-e4da-4644-b366-178e9e44b2bc',
            user: 'superadmin',
            // This url is just a mock and does not point to a valid device
            device: 'http://localhost:3000/devices/381e8aef-6a1e-4ac0-9bcf-bb4c220d0519',
            roles: ['superadmin'],
        },
        response: undefined,
    },
    'GET /auth valid device token': {
        request: {
            scopes: ['scope 2', 'scope 3'],
            user: 'GET /auth user',
            expiresOn: new Date(Date.now() + 360000).toISOString(),
            // This url is just a mock and does not point to a valid device
            device: 'http://localhost:3000/devices/381e8aef-6a1e-4ac0-9bcf-bb4c220d0519',
            roles: ['device'],
        },
        model: {
            scopes: ['scope 2', 'scope 3'],
            token: 'ddab6509-d1a5-4804-8611-ed7bbadd400c',
            user: 'GET /auth user',
            expiresOn: new Date(Date.now() + 360000).toISOString(),
            // This url is just a mock and does not point to a valid device
            device: 'http://localhost:3000/devices/381e8aef-6a1e-4ac0-9bcf-bb4c220d0519',
            roles: ['device'],
        },
        response: undefined,
    },
    'GET /auth valid user token': {
        request: {
            scopes: ['scope 1', 'scope 2'],
            user: 'GET /auth user',
            roles: ['user'],
        },
        model: {
            scopes: ['scope 1', 'scope 2'],
            user: 'GET /auth user',
            token: '86de8a01-a269-46c8-b2aa-8a5d7ce69057',
            roles: ['user'],
        },
        response: undefined,
    },
    'GET /auth expired token': {
        request: {
            scopes: ['scope 1'],
            user: 'GET /auth user',
            expiresOn: new Date(Date.now() - 360000).toISOString(),
            roles: ['user'],
        },
        model: {
            scopes: ['scope 1'],
            user: 'GET /auth user',
            token: '582bb590-d090-4d37-866b-c29eb1e8e2f3',
            expiresOn: new Date(Date.now() - 360000).toISOString(),
            roles: ['user'],
        },
        response: undefined,
    },
    'POST /logout valid user token': {
        request: {
            scopes: ['scope 1', 'scope 2'],
            user: 'POST /logout user',
            roles: ['user'],
        },
        model: {
            scopes: ['scope 1', 'scope 2'],
            user: 'POST /logout user',
            token: 'ce63c5d4-c826-4cab-8768-d5d7d11ca304',
            roles: ['user'],
        },
        response: undefined,
    },
}

export function resolveToken(
    tokenName: TokenName,
    userData: Subset<UserData>
): EntityData<TokenRepository> {
    return {
        request: {
            ...tokenDataWithLinks[tokenName].request,
            scopes: tokenDataWithLinks[tokenName].request.scopes.map(
                (scopeName) => resolveScope(scopeName).request
            ),
            user: userData[tokenDataWithLinks[tokenName].request.user]!.model!.username!,
        },
        model: {
            ...tokenDataWithLinks[tokenName].model,
            scopes: tokenDataWithLinks[tokenName].model.scopes.map(
                (scopeName) => resolveScope(scopeName).model
            ),
            user: userData[tokenDataWithLinks[tokenName].model.user]!.model! as UserModel,
            roles: tokenDataWithLinks[tokenName].model.roles.map(
                (roleName) => resolveRole(roleName, userData).model
            ),
        },
        response: undefined,
    }
}

export function prepareTokenData(userData: UserData): TokenData {
    const tokenData: Partial<TokenData> = {}

    for (const tokenName of tokenNames) {
        tokenData[tokenName] = resolveToken(tokenName, userData)
    }

    return tokenData as TokenData
}
