import { MissingEntityError } from "@crosslab/service-common";
import { FindOptionsWhere } from "typeorm";
import { AbstractRepository } from ".";
import { ScopeModel } from "../model";

class ScopeRepository extends AbstractRepository<ScopeModel, typeof ScopeModel, { name: string }> {
    constructor() {
        super(ScopeModel)
    }

    public async create(data: { name: string; }): Promise<ScopeModel> {
        const model = this.repository.create()
        await this.write(model, data)
        return model
    }

    public async write(model: ScopeModel, data: { name: string; }): Promise<void> {
        model.name = data.name
    }

    public async save(model: ScopeModel): Promise<void> {
        await this.repository.save(model)
    }

    public async find(options: FindOptionsWhere<ScopeModel>): Promise<ScopeModel[]> {
        return await this.repository.findBy(options)
    }

    public async findOne(options: FindOptionsWhere<ScopeModel>): Promise<ScopeModel> {
        const model = await this.repository.findOneBy(options)

        if (!model) {
            throw new MissingEntityError(
                `The requested scope does not exist in the database`,
                404
            )
        }

        return model
    }

    public async delete(model: ScopeModel): Promise<void> {
        await this.repository.softRemove(model)
    }

    public async format(model: ScopeModel): Promise<{ name: string; }> {
        return {
            name: model.name
        }
    }
}

export const scopeRepository: ScopeRepository = new ScopeRepository()