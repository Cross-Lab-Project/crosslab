import { MissingEntityError } from "@crosslab/service-common";
import { FindManyOptions, FindOneOptions } from "typeorm";
import { AbstractRepository } from "./abstractRepository";
import { ActiveKey } from "../../types/types";
import { ActiveKeyModel } from "../model";
import { keyRepository } from "./keyRepository";
import { AppDataSource } from "../dataSource";

class ActiveKeyRepository extends AbstractRepository<ActiveKeyModel> {
    public initialize(): void {
        this.repository = AppDataSource.getRepository(ActiveKeyModel)
    }

    public async create(data: ActiveKey<"request">): Promise<ActiveKeyModel> {
        this.checkIfInitialized()
        const model = this.repository!.create()
        await this.write(model, data)
        return model
    }

    public async write(model: ActiveKeyModel, data: ActiveKey<"request">): Promise<void> {
        model.use = data.use
        model.key = await keyRepository.findOneOrFail({ 
            where: {
                uuid: data.key
            } 
        })
    }

    public async save(model: ActiveKeyModel): Promise<void> {
        this.checkIfInitialized()
        await this.repository!.save(model)
    }

    public async find(options?: FindManyOptions<ActiveKeyModel>): Promise<ActiveKeyModel[]> {
        this.checkIfInitialized()
        return await this.repository!.find(options)
    }

    public async findOne(options: FindOneOptions<ActiveKeyModel>): Promise<ActiveKeyModel|null> {
        this.checkIfInitialized()
        return await this.repository!.findOne(options)
    }

    public async findOneOrFail(options: FindOneOptions<ActiveKeyModel>): Promise<ActiveKeyModel> {
        this.checkIfInitialized
        const model = await this.findOne(options)

        if (!model) {
            throw new MissingEntityError(
                `The requested active key does not exist in the database`,
                404
            )
        }

        return model
    }

    public async delete(model: ActiveKeyModel): Promise<void> {
        this.checkIfInitialized()
        await this.repository!.remove(model)
    }

    public async format(_model: ActiveKeyModel): Promise<ActiveKey<"response">> {
        return undefined
    }
}

export const activeKeyRepository: ActiveKeyRepository = new ActiveKeyRepository()