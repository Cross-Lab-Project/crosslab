import { MissingEntityError } from "@crosslab/service-common";
import { FindManyOptions, FindOneOptions } from "typeorm";
import { AbstractRepository } from "./abstractRepository";
import { ScopeModel } from "../model";
import { AppDataSource } from "../dataSource";
import { Scope } from "../../types/types";

class ScopeRepository extends AbstractRepository<ScopeModel> {
    public initialize(): void {
        this.repository = AppDataSource.getRepository(ScopeModel)
    }

    public async create(data: Scope<"request">): Promise<ScopeModel> {
        this.checkIfInitialized()
        const model = this.repository!.create()
        await this.write(model, data)
        return model
    }

    public async write(model: ScopeModel, data: Scope<"request">): Promise<void> {
        model.name = data
    }

    public async save(model: ScopeModel): Promise<void> {
        this.checkIfInitialized()
        await this.repository!.save(model)
    }

    public async find(options?: FindManyOptions<ScopeModel>): Promise<ScopeModel[]> {
        this.checkIfInitialized()
        return await this.repository!.find(options)
    }

    public async findOne(options: FindOneOptions<ScopeModel>): Promise<ScopeModel | null> {
        this.checkIfInitialized()
        return await this.repository!.findOne(options)
    }

    public async findOneOrFail(options: FindOneOptions<ScopeModel>): Promise<ScopeModel> {
        this.checkIfInitialized()
        const model = await this.repository!.findOne(options)

        if (!model) {
            throw new MissingEntityError(
                `The requested scope does not exist in the database`,
                404
            )
        }

        return model
    }

    public async delete(model: ScopeModel): Promise<void> {
        this.checkIfInitialized()
        await this.repository!.remove(model)
    }

    public async format(model: ScopeModel): Promise<Scope<"response">> {
        return model.name
    }
}

export const scopeRepository: ScopeRepository = new ScopeRepository()