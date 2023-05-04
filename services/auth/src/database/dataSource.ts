import { Scope as CrosslabScope } from '../generated/scopes'
import { activeKeyRepository } from './repositories/activeKeyRepository'
import { keyRepository } from './repositories/keyRepository'
import { roleRepository } from './repositories/roleRepository'
import { scopeRepository } from './repositories/scopeRepository'
import { tokenRepository } from './repositories/tokenRepository'
import { userRepository } from './repositories/userRepository'
import { AbstractApplicationDataSource } from '@crosslab/service-common'

export class ApplicationDataSource extends AbstractApplicationDataSource {
    protected initializeRepositories(): void {
        activeKeyRepository.initialize(this)
        keyRepository.initialize(this)
        roleRepository.initialize(this)
        scopeRepository.initialize(this)
        tokenRepository.initialize(this)
        userRepository.initialize(this)
    }
}

export const AppDataSource = new ApplicationDataSource()

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
    'device_token': ['developer', 'device_service', 'user'],
    'device_token:create': ['developer', 'device_service', 'user'],
    'identity': ['developer', 'user'],
    'identity:read': ['developer', 'user'],
    'identity:write': ['developer', 'user'],
    'logout': standardRoles,
    'roles': ['developer'],
    'roles:read': standardRoles,
    'roles:write': ['developer'],
    'roles:create': ['developer'],
    'roles:delete': ['developer'],
    'users': ['developer'],
    'users:read': standardRoles,
    'users:write': ['developer'],
    'users:create': ['developer'],
    'users:delete': ['developer'],
    // device service scopes
    'device': ['developer'],
    'device:list': standardRoles,
    'device:edit': ['developer', 'device', 'user'],
    'device:create': ['developer', 'user'],
    'device:instantiate': ['developer', 'experiment_service', 'user'],
    'device:connect': ['developer', 'device'],
    'device:signal': ['developer', 'device'],
    'peerconnection': ['developer'],
    'peerconnection:list': standardRoles,
    'peerconnection:create': ['developer', 'experiment_service'],
    // experiment service scopes
    'experiment': ['developer'],
    'experiment:list': standardRoles,
    'experiment:edit': ['developer', 'user'],
    'experiment:create': ['developer', 'user'],
    // federation service scopes
    'authorized_proxy': standardRoles,
    'institution': ['developer'],
    'institution:list': standardRoles,
    'institution:edit': ['developer'],
    'institution:create': ['developer'],
    // update service scopes
    'update': ['developer'],
    'update:list': standardRoles,
    'update:edit': ['developer'],
    'update:create': ['developer'],
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
            !(await scopeRepository.findOne({
                where: {
                    name: scope,
                },
            }))
        ) {
            const scopeModel = await scopeRepository.create(scope)
            await scopeRepository.save(scopeModel)
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
    const existingRoleModel = await roleRepository.findOne({
        where: {
            name: name,
        },
    })

    if (existingRoleModel) return

    const roleModel = await roleRepository.create({
        name,
        scopes: scopes,
    })
    await roleRepository.save(roleModel)
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
    const roleModelSuperadmin = await roleRepository.findOneOrFail({
        where: {
            name: 'superadmin',
        },
        relations: {
            users: true,
        },
    })

    if (roleModelSuperadmin.users.length === 0) {
        const userModelSuperadmin = await userRepository.create({
            username: 'superadmin',
            password: 'superadmin',
        })
        userRepository.addRoleModelToUserModel(userModelSuperadmin, roleModelSuperadmin)
        await userRepository.save(userModelSuperadmin)
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
    const roleService = await roleRepository.findOneOrFail({
        where: {
            name: service,
        },
        relations: {
            users: true,
            scopes: true,
        },
    })

    if (roleService.users.length === 0) {
        const user = await userRepository.create()
        user.username = service.replace('_', '')
        user.roles = [roleService]
        user.tokens = []
        await userRepository.save(user)
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
