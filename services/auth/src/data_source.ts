import { DataSource } from "typeorm";
import { ActiveKeyModel, KeyModel, RoleModel, ScopeModel, UserModel } from "./model";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db/device.db",
    synchronize: true,
    entities: [
        ScopeModel,
        RoleModel,
        UserModel,
        KeyModel,
        ActiveKeyModel
    ]
})

interface Scope {
    name: string,
    roles: ("user"|"developer")[]|"all"
}

interface ScopeCollection {
    all: ScopeModel[]
    user: ScopeModel[]
    developer: ScopeModel[]
}

async function createScopes(scopes: Scope[]): Promise<ScopeCollection> {
    const scopeCollection: ScopeCollection = { 
        all: [],
        user: [],
        developer: []
    }
    const scopeRepository = AppDataSource.getRepository(ScopeModel)
    for (const scope of scopes) {
        const scopeModel = scopeRepository.create()
        scopeModel.name = scope.name
        await scopeRepository.save(scopeModel)
        if (scope.roles === "all") {
            scopeCollection.all.push(scopeModel)
        } else {
            for (const role of scope.roles.filter((v,i,s) => s.indexOf(v) === i)) {
                switch (role) {
                    case "developer":
                        scopeCollection.developer.push(scopeModel)
                        break
                    case "user":
                        scopeCollection.user.push(scopeModel)
                        break
                }
            }
        }
    }
    return scopeCollection
}

async function createRole(name: string, scopes: ScopeModel[]) {
    const roleRepository = AppDataSource.getRepository(RoleModel)
    if ((await roleRepository.findOneBy({ name: name })) === null) {
        const role = roleRepository.create()
        role.name = name
        role.scopes = scopes
        await roleRepository.save(role)
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
        { name: "users:list", roles: "all" }
    ])

    // create default roles
    await createRole("superadmin", scopeCollection.all)
    await createRole("developer", [...scopeCollection.all, ...scopeCollection.developer])
    await createRole("user", [...scopeCollection.all, ...scopeCollection.user])
}

async function createDefaultSuperadmin() {
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
        user.currentRole = roleSuperadmin
        user.token = ""
        user.tokenExpiresOn = new Date(Date.now() - 1).toISOString()
        await userRepository.save(user)
    }
}

export async function initializeDataSource() {
    await createDefaultScopesAndRoles()
    await createDefaultSuperadmin()
}

