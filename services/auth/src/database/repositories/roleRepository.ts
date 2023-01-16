import { AbstractRepository } from "./abstractRepository";
import { Role } from "../../generated/types";
import { RoleModel } from "../model";
import { scopeRepository } from "./scopeRepository";
import { AppDataSource } from "../dataSource";

class RoleRepository extends AbstractRepository<RoleModel> {
    constructor() {
        super(RoleModel)
    }

    public initialize(): void {
        this.repository = AppDataSource.getRepository(RoleModel)
    }

    public async write(model: RoleModel, data: Role<"request">): Promise<void> {
        if (data.name) model.name = data.name
        if (data.scopes) {
            model.scopes = await Promise.all(
                data.scopes.map(async (scope) => {
                    return await scopeRepository.findOneOrFail({
                        where: {
                            name: scope
                        }
                    })
                })
            )
        }
    }

    public async format(model: RoleModel): Promise<Role<"response">> {
        return {
            name: model.name,
            scopes: await Promise.all(model.scopes.map(scopeRepository.format))
        }
    }
}

export const roleRepository: RoleRepository = new RoleRepository()