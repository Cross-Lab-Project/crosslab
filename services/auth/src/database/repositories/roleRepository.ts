import { MissingEntityError } from "@crosslab/service-common";
import { FindManyOptions, FindOneOptions } from "typeorm";
import { AbstractRepository } from "./abstractRepository";
import { Role } from "../../generated/types";
import { RoleModel } from "../model";
import { scopeRepository } from "./scopeRepository";
import { AppDataSource } from "../dataSource";

class RoleRepository extends AbstractRepository<RoleModel> {
    public initialize(): void {
        this.repository = AppDataSource.getRepository(RoleModel)
    }

    public async create(data: Role<"request">): Promise<RoleModel> {
        this.checkIfInitialized()
        const model = this.repository!.create({
            name: "unknown",
            scopes: [],
            users: []
        })
        await this.write(model, data)
        return model
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

    public async save(model: RoleModel): Promise<void> {
        this.checkIfInitialized()
        await this.repository!.save(model)
    }

    public async find(options?: FindManyOptions<RoleModel>): Promise<RoleModel[]> {
        this.checkIfInitialized()
        return await this.repository!.find(options)
    }

    public async findOne(options: FindOneOptions<RoleModel>): Promise<RoleModel | null> {
        this.checkIfInitialized()
        return await this.repository!.findOne(options)
    }

    public async findOneOrFail(options: FindOneOptions<RoleModel>): Promise<RoleModel> {
        this.checkIfInitialized()
        const model = await this.repository!.findOne(options)

        if (!model) {
            throw new MissingEntityError(
                `The requested role does not exist in the database`,
                404
            )
        }

        return model
    }

    public async delete(model: RoleModel): Promise<void> {
        this.checkIfInitialized()
        await this.repository!.remove(model)
    }

    public async format(model: RoleModel): Promise<Role<"response">> {
        return {
            name: model.name,
            scopes: await Promise.all(model.scopes.map(scopeRepository.format))
        }
    }
}

export const roleRepository: RoleRepository = new RoleRepository()