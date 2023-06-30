import { dataSourceConfig } from '../config'
import { Scope as CrosslabScope } from '../generated/scopes'
import { ActiveKeyRepository } from './repositories/activeKeyRepository'
import { KeyRepository } from './repositories/keyRepository'
import { RoleRepository } from './repositories/roleRepository'
import { ScopeRepository } from './repositories/scopeRepository'
import { TokenRepository } from './repositories/tokenRepository'
import { UserRepository } from './repositories/userRepository'
import { AbstractApplicationDataSource } from '@crosslab/service-common'

type RepositoryMapping = {
    activeKey: ActiveKeyRepository
    key: KeyRepository
    role: RoleRepository
    scope: ScopeRepository
    token: TokenRepository
    user: UserRepository
}

export class ApplicationDataSource extends AbstractApplicationDataSource<RepositoryMapping> {
    protected createRepositories(): RepositoryMapping {
        const activeKeyRepository = new ActiveKeyRepository()
        const keyRepository = new KeyRepository()
        const roleRepository = new RoleRepository()
        const scopeRepository = new ScopeRepository()
        const tokenRepository = new TokenRepository()
        const userRepository = new UserRepository()

        activeKeyRepository.setDependencies({ key: keyRepository })
        keyRepository.setDependencies({ activeKey: activeKeyRepository })
        roleRepository.setDependencies({ scope: scopeRepository })
        tokenRepository.setDependencies({
            role: roleRepository,
            scope: scopeRepository,
            user: userRepository,
        })
        userRepository.setDependencies({
            token: tokenRepository,
        })

        return {
            activeKey: activeKeyRepository,
            key: keyRepository,
            role: roleRepository,
            scope: scopeRepository,
            token: tokenRepository,
            user: userRepository,
        }
    }
}

export const AppDataSource = new ApplicationDataSource(dataSourceConfig)
export const dataSource = AppDataSource.dataSource
export const repositories = AppDataSource.repositories

const standardRoles = [
    'user',
    'device',
    'developer',
    'auth_service',
    'device_service',
    'experiment_service',
    'federation_service',
    'update_service',
] as const

type ScopeRecord = Record<CrosslabScope<'JWT'>, readonly (typeof standardRoles)[number][]>

const scopesStandardRolesMapping: ScopeRecord = {
    // auth service scopes
    'device_token': ['developer'],
    'device_token:create': [],
    'device_token:create:owned': ['user'],
    'device_token:create:instantiable': ['device_service'],
    'identity': ['developer', 'user'],
    'identity:read': standardRoles,
    'identity:write': [],
    'logout': standardRoles,
    'roles': ['developer'],
    'roles:read': [],
    'roles:write': [],
    'roles:create': [],
    'roles:delete': [],
    'users': ['developer'],
    'users:read': [],
    'users:write': [],
    'users:create': [],
    'users:delete': [],
    // device service scopes
    'device': ['developer'],
    'device:read': ['auth_service', 'developer', 'device_service', 'experiment_service'], // TODO: readall, listall, editall
    'device:read:owned': standardRoles,
    'device:write': ['device', 'device_service'],
    'device:write:owned': ['user'],
    'device:create': ['user'],
    'device:delete': [],
    'device:delete:owned': ['experiment_service', 'user'],
    'device:instantiate': ['experiment_service'],
    'device:instantiate:owned': ['user'],
    'device:connect': [],
    'device:connect:current': ['device'],
    'device:signal': ['device_service'],
    'peerconnection': ['developer', 'experiment_service'],
    'peerconnection:read': ['device_service'],
    'peerconnection:write': [],
    'peerconnection:write:device_status': ['device_service'],
    'peerconnection:create': [],
    'peerconnection:delete': [],
    // experiment service scopes
    'experiment': ['developer'],
    'experiment:read': [],
    'experiment:read:owned': ['user'],
    'experiment:write': [],
    'experiment:write:owned': ['user'],
    'experiment:create': ['user'],
    'experiment:delete': [],
    'experiment:delete:owned': ['user'],
    // federation service scopes
    'authorized_proxy': standardRoles,
    'institution': ['developer'],
    'institution:read': standardRoles,
    'institution:write': [],
    'institution:create': [],
    'institution:delete': [],
    // update service scopes
    'update': ['developer'],
    'update:read': standardRoles,
    'update:write': [],
    'update:create': [],
    'update:delete': [],
}

interface ScopeCollection {
    superadmin: CrosslabScope<'JWT'>[]
    user: CrosslabScope<'JWT'>[]
    device: CrosslabScope<'JWT'>[]
    developer: CrosslabScope<'JWT'>[]
    auth_service: CrosslabScope<'JWT'>[]
    device_service: CrosslabScope<'JWT'>[]
    experiment_service: CrosslabScope<'JWT'>[]
    federation_service: CrosslabScope<'JWT'>[]
    update_service: CrosslabScope<'JWT'>[]
}

async function createScopeCollection(): Promise<ScopeCollection> {
    const scopeCollection: ScopeCollection = {
        superadmin: [],
        user: [],
        device: [],
        developer: [],
        auth_service: [],
        device_service: [],
        experiment_service: [],
        federation_service: [],
        update_service: [],
    }
    for (const scope in scopesStandardRolesMapping) {
        if (
            !(await repositories.scope.findOne({
                where: {
                    name: scope,
                },
            }))
        ) {
            const scopeModel = await repositories.scope.create(scope)
            await repositories.scope.save(scopeModel)
        }
        scopeCollection.superadmin.push(scope)
        const roles = scopesStandardRolesMapping[scope]
        for (const role of roles.filter((v, i, s) => s.indexOf(v) === i)) {
            switch (role) {
                case 'developer':
                    scopeCollection.developer.push(scope)
                    break
                case 'user':
                    scopeCollection.user.push(scope)
                    break
                case 'device':
                    scopeCollection.device.push(scope)
                    break
                case 'auth_service':
                    scopeCollection.auth_service.push(scope)
                    break
                case 'device_service':
                    scopeCollection.device_service.push(scope)
                    break
                case 'experiment_service':
                    scopeCollection.experiment_service.push(scope)
                    break
                case 'federation_service':
                    scopeCollection.federation_service.push(scope)
                    break
                case 'update_service':
                    scopeCollection.update_service.push(scope)
                    break
            }
        }
    }
    return scopeCollection
}

async function createRole(name: string, scopes: CrosslabScope<'JWT'>[]) {
    const existingRoleModel = await repositories.role.findOne({
        where: {
            name: name,
        },
    })

    if (existingRoleModel) return

    const roleModel = await repositories.role.create({
        name,
        scopes: scopes,
    })
    await repositories.role.save(roleModel)
}

async function createDefaultScopesAndRoles() {
    // create default scopes
    const scopeCollection = await createScopeCollection()

    // create default roles
    await createRole('superadmin', scopeCollection.superadmin)
    await createRole('developer', scopeCollection.developer)
    await createRole('user', scopeCollection.user)
    await createRole('device', scopeCollection.device)
    await createRole('auth_service', scopeCollection.auth_service)
    await createRole('device_service', scopeCollection.device_service)
    await createRole('experiment_service', scopeCollection.experiment_service)
    await createRole('federation_service', scopeCollection.federation_service)
    await createRole('update_service', scopeCollection.update_service)
}

async function createDefaultSuperadminUser() {
    const roleModelSuperadmin = await repositories.role.findOneOrFail({
        where: {
            name: 'superadmin',
        },
        relations: {
            users: true,
        },
    })

    if (roleModelSuperadmin.users.length === 0) {
        const userModelSuperadmin = await repositories.user.create({
            username: 'local:superadmin',
            password: 'superadmin',
        })
        repositories.user.addRoleModelToUserModel(
            userModelSuperadmin,
            roleModelSuperadmin
        )
        await repositories.user.save(userModelSuperadmin)
    }
}

async function createDefaultServiceUser(
    service:
        | 'auth_service'
        | 'device_service'
        | 'experiment_service'
        | 'federation_service'
        | 'update_service'
) {
    const roleService = await repositories.role.findOneOrFail({
        where: {
            name: service,
        },
        relations: {
            users: true,
            scopes: true,
        },
    })

    if (roleService.users.length === 0) {
        const user = await repositories.user.create()
        user.username = `local:${service.replace('_', '')}`
        user.roles = [roleService]
        user.tokens = []
        await repositories.user.save(user)
    }
}

export async function initializeDataSource() {
    await createDefaultScopesAndRoles()
    await createDefaultSuperadminUser()
    await createDefaultServiceUser('auth_service')
    await createDefaultServiceUser('device_service')
    await createDefaultServiceUser('experiment_service')
    await createDefaultServiceUser('federation_service')
    await createDefaultServiceUser('update_service')
}
