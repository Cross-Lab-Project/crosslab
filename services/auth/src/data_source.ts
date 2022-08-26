import { DataSource } from "typeorm";
import { ActiveKeyModel, KeyModel, RoleModel, ScopeModel, TokenModel, UserModel } from "./model";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db/device.db",
    synchronize: true,
    entities: [
        ScopeModel,
        RoleModel,
        UserModel,
        KeyModel,
        ActiveKeyModel,
        TokenModel
    ]
})

interface Scope {
    name: string,
    roles: ("user"|"developer"|"auth_service"|"device_service"|"experiment_service"|"federation_service"|"update_service")[]|"all"
}

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

async function createScopes(scopes: Scope[]): Promise<ScopeCollection> {
    const scopeCollection: ScopeCollection = { 
        all: [],
        user: [],
        developer: [],
        auth_service: [],
        device_service: [],
        experiment_service: [],
        federation_service: [],
        update_service: []
    }
    const scopeRepository = AppDataSource.getRepository(ScopeModel)
    for (const scope of scopes) {
        const scopeModel = scopeRepository.create()
        scopeModel.name = scope.name
        await scopeRepository.save(scopeModel)
        scopeCollection.all.push(scopeModel)
        if (scope.roles === "all") {
            scopeCollection.developer.push(scopeModel)
            scopeCollection.user.push(scopeModel)
            scopeCollection.auth_service.push(scopeModel)
            scopeCollection.device_service.push(scopeModel)
            scopeCollection.experiment_service.push(scopeModel)
            scopeCollection.federation_service.push(scopeModel)
            scopeCollection.update_service.push(scopeModel)
        } else {
            for (const role of scope.roles.filter((v,i,s) => s.indexOf(v) === i)) {
                switch (role) {
                    case "developer":
                        scopeCollection.developer.push(scopeModel)
                        break
                    case "user":
                        scopeCollection.user.push(scopeModel)
                        break
                    case "auth_service":
                        scopeCollection.auth_service.push(scopeModel)
                        break
                    case "device_service":
                        scopeCollection.device_service.push(scopeModel)
                        break
                    case "experiment_service":
                        scopeCollection.experiment_service.push(scopeModel)
                        break
                    case "federation_service":
                        scopeCollection.federation_service.push(scopeModel)
                        break
                    case "update_service":
                        scopeCollection.update_service.push(scopeModel)
                        break
                }
            }
        }
    }
    return scopeCollection
}

async function createRole(name: string, scopes: ScopeModel[]) {
    const roleRepository = AppDataSource.getRepository(RoleModel)
    const existingRole = await roleRepository.findOneBy({ name: name })
    if (existingRole === null) {
        const role = roleRepository.create()
        role.name = name
        role.scopes = scopes
        await roleRepository.save(role)
    } else {
        existingRole.scopes = scopes
        await roleRepository.save(existingRole)
    }
}

async function createDefaultScopesAndRoles() {
    // create default scopes
    const scopeCollection = await createScopes([
        { name: "authorized_proxy", roles: "all" },
        { name: "device", roles: "all" },
        { name: "device:create", roles: "all" },
        { name: "device:connect", roles: "all" },
        { name: "device:edit", roles: "all" },
        { name: "device:list", roles: "all" },
        { name: "experiment", roles: "all" },
        { name: "experiment:create", roles: "all" },
        { name: "experiment:edit", roles: "all" },
        { name: "experiment:list", roles: "all" },
        { name: "identity", roles: "all" },
        { name: "identity:edit", roles: "all" },
        { name: "identity:list", roles: "all" },
        { name: "institution", roles: "all" },
        { name: "institution:create", roles: "all" },
        { name: "institution:edit", roles: "all" },
        { name: "institution:list", roles: "all" },
        { name: "peerconnection", roles: "all" },
        { name: "peerconnection:create", roles: "all" },
        { name: "peerconnection:list", roles: "all" },
        { name: "update", roles: "all" },
        { name: "update:create", roles: "all" },
        { name: "update:edit", roles: "all" },
        { name: "update:list", roles: "all" },
        { name: "users", roles: "all" },
        { name: "users:create", roles: "all" },
        { name: "users:edit", roles: "all" },
        { name: "users:list", roles: "all" },
        { name: "device_token", roles: "all" },
        { name: "device_token:create", roles: "all"},
        { name: "logout", roles: "all"}
    ])

    // create default roles
    await createRole("superadmin", scopeCollection.all)
    await createRole("developer", scopeCollection.developer)
    await createRole("user", scopeCollection.user)
    await createRole("auth_service", scopeCollection.auth_service)
    await createRole("device_service", scopeCollection.device_service)
    await createRole("experiment_service", scopeCollection.experiment_service)
    await createRole("federation_service", scopeCollection.federation_service)
    await createRole("update_service", scopeCollection.update_service)
}

async function createDefaultSuperadminUser() {
    const userRepository = AppDataSource.getRepository(UserModel)
    const roleRepository = AppDataSource.getRepository(RoleModel)

    const roleSuperadmin = await roleRepository.findOneOrFail({
        where: { 
            name: "superadmin" 
        },
        relations: {
            users: true
        }
    })

    if (roleSuperadmin.users.length === 0) {
        const user = userRepository.create()
        user.username = "superadmin"
        user.password = "superadmin"
        user.roles = [roleSuperadmin]
        user.tokens = []
        await userRepository.save(user)
    }
}

async function createDefaultServiceUser(service: "auth_service"|"device_service"|"experiment_service"|"federation_service"|"update_service") {
    const userRepository = AppDataSource.getRepository(UserModel)
    const roleRepository = AppDataSource.getRepository(RoleModel)

    const roleAuthService = await roleRepository.findOneOrFail({
        where: { 
            name: service
        },
        relations: {
            users: true,
            scopes: true
        }
    })

    if (roleAuthService.users.length === 0) {
        const user = userRepository.create()
        user.username = service.replace("_","")
        user.roles = [roleAuthService]
        user.tokens = []
        await userRepository.save(user)
    }
}

export async function initializeDataSource() {
    await createDefaultScopesAndRoles()
    await createDefaultSuperadminUser()
    await createDefaultServiceUser("auth_service")
    await createDefaultServiceUser("device_service")
    await createDefaultServiceUser("experiment_service")
    await createDefaultServiceUser("federation_service")
    await createDefaultServiceUser("update_service")
}

