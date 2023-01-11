import { MissingEntityError } from "@crosslab/service-common";
import { FindOptionsWhere } from "typeorm";
import { AbstractRepository } from ".";
import { Role } from "../../generated/types";
import { RoleModel } from "../model";
import { scopeRepository } from "./scope";

class RoleRepository extends AbstractRepository<RoleModel, typeof RoleModel, Role> {
    constructor() {
        super(RoleModel)
    }

    public async create(data: Role): Promise<RoleModel> {
        const model = this.repository.create({
            name: "unknown",
            scopes: [],
            users: []
        })
        await this.write(model, data)
        return model
    }

    public async write(model: RoleModel, data: Role): Promise<void> {
        if (data.name) model.name = data.name
        if (data.scopes) {
            model.scopes = await Promise.all(
                data.scopes.map(async (scope) => {
                    return await scopeRepository.findOne({
                        name: scope
                    })
                })
            )
        }
    }

    public async save(model: RoleModel): Promise<void> {
        await this.repository.save(model)
    }

    public async find(options: FindOptionsWhere<RoleModel>): Promise<RoleModel[]> {
        return await this.repository.findBy(options)
    }

    public async findOne(options: FindOptionsWhere<RoleModel>): Promise<RoleModel> {
        const model = await this.repository.findOneBy(options)

        if (!model) {
            throw new MissingEntityError(
                `The requested role does not exist in the database`,
                404
            )
        }

        return model
    }

    public async delete(model: RoleModel): Promise<void> {
        await this.repository.softRemove(model)
    }

    public async format(model: RoleModel): Promise<Role> {
        return {
            name: model.name,
            scopes: (await Promise.all(model.scopes.map(scopeRepository.format)))
                .map((scope) => scope.name)
        }
    }
}

export const roleRepository: RoleRepository = new RoleRepository()