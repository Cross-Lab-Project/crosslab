import { hash } from 'bcryptjs'
import { DataSource, DataSourceOptions, EntityTarget, ObjectLiteral } from 'typeorm'
import { RoleModel, ScopeModel, UserModel } from './model'
import { activeKeyRepository } from './repositories/activeKeyRepository'
import { keyRepository } from './repositories/keyRepository'
import { roleRepository } from './repositories/roleRepository'
import { scopeRepository } from './repositories/scopeRepository'
import { tokenRepository } from './repositories/tokenRepository'
import { userRepository } from './repositories/userRepository'
import { Scope as CrosslabScope } from '../generated/scopes'

export class ApplicationDataSource {
    private dataSource?: DataSource
    public connected: boolean = false

    public async initialize(options: DataSourceOptions) {
        this.dataSource = new DataSource(options)
        await this.dataSource.initialize()
        this.connected = true
        activeKeyRepository.initialize()
        keyRepository.initialize()
        roleRepository.initialize()
        scopeRepository.initialize()
        tokenRepository.initialize()
        userRepository.initialize()
    }

    public async teardown() {
        if (!this.dataSource) throw new Error('Data Source has not been initialized!') // TODO: better error

        await this.dataSource.destroy()
        this.connected = false
    }

    public getRepository<Entity extends ObjectLiteral>(target: EntityTarget<Entity>) {
        if (!this.dataSource) throw new Error('Data Source has not been initialized!') // TODO: better error

        return this.dataSource.getRepository(target)
    }
}

export const AppDataSource = new ApplicationDataSource()

type ScopeRecord = Record<
    CrosslabScope<'JWT'>,
    | (
          | 'user'
          | 'developer'
          | 'auth_service'
          | 'device_service'
          | 'experiment_service'
          | 'federation_service'
          | 'update_service'
      )[]
    | 'all'
>

interface ScopeCollection {
    all: ScopeModel[]
    user: ScopeModel[]
    developer: ScopeModel[]
    auth_service: ScopeModel[]
    device_service: ScopeModel[]
    experiment_service: ScopeModel[]
    federation_service: ScopeModel[]
    update_service: ScopeModel[]
}

async function createScopes(scopeRecord: ScopeRecord): Promise<ScopeCollection> {
    const scopeCollection: ScopeCollection = {
        all: [],
        user: [],
        developer: [],
        auth_service: [],
        device_service: [],
        experiment_service: [],
        federation_service: [],
        update_service: [],
    }
    const scopeRepository = AppDataSource.getRepository(ScopeModel)
    for (const scopeName in scopeRecord) {
        const scopeModel = scopeRepository.create()
        scopeModel.name = scopeName
        await scopeRepository.save(scopeModel)
        scopeCollection.all.push(scopeModel)
        const roles = scopeRecord[scopeName]
        if (roles === 'all') {
            scopeCollection.developer.push(scopeModel)
            scopeCollection.user.push(scopeModel)
            scopeCollection.auth_service.push(scopeModel)
            scopeCollection.device_service.push(scopeModel)
            scopeCollection.experiment_service.push(scopeModel)
            scopeCollection.federation_service.push(scopeModel)
            scopeCollection.update_service.push(scopeModel)
        } else {
            for (const role of roles.filter((v, i, s) => s.indexOf(v) === i)) {
                switch (role) {
                    case 'developer':
                        scopeCollection.developer.push(scopeModel)
                        break
                    case 'user':
                        scopeCollection.user.push(scopeModel)
                        break
                    case 'auth_service':
                        scopeCollection.auth_service.push(scopeModel)
                        break
                    case 'device_service':
                        scopeCollection.device_service.push(scopeModel)
                        break
                    case 'experiment_service':
                        scopeCollection.experiment_service.push(scopeModel)
                        break
                    case 'federation_service':
                        scopeCollection.federation_service.push(scopeModel)
                        break
                    case 'update_service':
                        scopeCollection.update_service.push(scopeModel)
                        break
                }
            }
        }
    }
    return scopeCollection
}

async function createRole(name: string, scopes: ScopeModel[]) {
    const existingRole = await roleRepository.findOne({
        where: {
            name: name,
        },
    })
    if (existingRole === null) {
        const role = await roleRepository.create({
            name,
            scopes: scopes.map((scope) => scope.name),
        })
        await roleRepository.save(role)
    } else {
        existingRole.scopes = scopes
        await roleRepository.save(existingRole)
    }
}

async function createDefaultScopesAndRoles() {
    // create default scopes
    const scopeCollection = await createScopes({
        // auth service scopes
        'device_token': 'all',
        'device_token:create': 'all',
        'identity': 'all',
        'identity:edit': 'all',
        'identity:list': 'all',
        'logout': 'all',
        'roles': 'all',
        'roles:create': 'all',
        'roles:edit': 'all',
        'roles:list': 'all',
        'users': 'all',
        'users:create': 'all',
        'users:edit': 'all',
        'users:list': 'all',
        // device service scopes
        'device': 'all',
        'device:create': 'all',
        'device:connect': 'all',
        'device:edit': 'all',
        'device:list': 'all',
        'device:signal': 'all',
        'peerconnection': 'all',
        'peerconnection:create': 'all',
        'peerconnection:list': 'all',
        // experiment service scopes
        'experiment': 'all',
        'experiment:create': 'all',
        'experiment:edit': 'all',
        'experiment:list': 'all',
        // federation service scopes
        'authorized_proxy': [
            'auth_service',
            'developer',
            'device_service',
            'experiment_service',
            'federation_service',
            'update_service',
            'user'
        ],
        'institution': 'all',
        'institution:create': 'all',
        'institution:edit': 'all',
        'institution:list': 'all',
        // update service scopes
        'update': 'all',
        'update:create': 'all',
        'update:edit': 'all',
        'update:list': 'all',
    })

    // create default roles
    await createRole('superadmin', scopeCollection.all)
    await createRole('developer', scopeCollection.developer)
    await createRole('user', scopeCollection.user)
    await createRole('auth_service', scopeCollection.auth_service)
    await createRole('device_service', scopeCollection.device_service)
    await createRole('experiment_service', scopeCollection.experiment_service)
    await createRole('federation_service', scopeCollection.federation_service)
    await createRole('update_service', scopeCollection.update_service)
}

async function createDefaultSuperadminUser() {
    const userRepository = AppDataSource.getRepository(UserModel)
    const roleRepository = AppDataSource.getRepository(RoleModel)

    const roleSuperadmin = await roleRepository.findOneOrFail({
        where: {
            name: 'superadmin',
        },
        relations: {
            users: true,
        },
    })

    if (roleSuperadmin.users.length === 0) {
        const user = userRepository.create()
        user.username = 'superadmin'
        user.password = await hash('superadmin', 10)
        user.roles = [roleSuperadmin]
        user.tokens = []
        await userRepository.save(user)
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
