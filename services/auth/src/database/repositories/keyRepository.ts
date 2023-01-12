import { MissingEntityError } from "@crosslab/service-common";
import { FindManyOptions, FindOneOptions } from "typeorm";
import { AbstractRepository } from "./abstractRepository";
import { Key } from "../../types/types";
import { KeyModel } from "../model";
import { AppDataSource } from "../dataSource";

class KeyRepository extends AbstractRepository<KeyModel> {
    public initialize(): void {
        this.repository = AppDataSource.getRepository(KeyModel)
    }

    public async create(data: Required<Key>): Promise<KeyModel> {
        this.checkIfInitialized()
        const model = this.repository!.create()
        await this.write(model, data)
        return model
    }

    public async write(model: KeyModel, data: Required<Key>): Promise<void> {
        model.alg = data.alg
        model.private_key = data.private_key
        model.public_key = data.public_key
        model.use = data.use
    }

    public async save(model: KeyModel): Promise<void> {
        this.checkIfInitialized()
        await this.repository!.save(model)
    }

    public async find(options?: FindManyOptions<KeyModel>): Promise<KeyModel[]> {
        this.checkIfInitialized()
        return await this.repository!.find(options)
    }

    public async findOne(options: FindOneOptions<KeyModel>): Promise<KeyModel | null> {
        this.checkIfInitialized()
        return await this.repository!.findOne(options)
    }

    public async findOneOrFail(options: FindOneOptions<KeyModel>): Promise<KeyModel> {
        this.checkIfInitialized()
        const model = await this.repository!.findOne(options)

        if (!model) {
            throw new MissingEntityError(
                `The requested key does not exist in the database`,
                404
            )
        }

        return model
    }

    public async delete(model: KeyModel): Promise<void> {
        this.checkIfInitialized()
        await this.repository!.remove(model)
    }

    public async format(_model: KeyModel): Promise<Key<"response">> {
        return undefined
    }
}

export const keyRepository: KeyRepository = new KeyRepository()