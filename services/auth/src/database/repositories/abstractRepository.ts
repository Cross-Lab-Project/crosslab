import { MissingEntityError } from "@crosslab/service-common"
import { FindManyOptions, FindOneOptions, FindOptionsRelations, Repository } from "typeorm"
import { UninitializedRepositoryError } from "../../types/errors"
import { getModelName, Model, ModelType } from "../model"

/**
 * An abstract class for a repository.
 * @typeParam M - Type of the model.
 * @typeParam E - Type of the entity target corresponding to the model.
 * @typeParam T - Type of the data corresponding to the model.
 */
export abstract class AbstractRepository<M extends Model> {
    protected repository?: Repository<M>
    private model: Model

    constructor(model: Model) {
        this.model = model
    }

    protected throwUninitializedRepositoryError(): never {
        throw new UninitializedRepositoryError(this.model)
    }

    abstract initialize(): void

    public async create(data?: ModelType<M,"request">): Promise<M> {
        if (!this.repository) this.throwUninitializedRepositoryError()
        const model = this.repository.create()
        if (data === undefined) return model
        await this.write(model, data)
        return model
    }

    abstract write(model: M, data: ModelType<M,"request">): Promise<void>

    public async save(model: M): Promise<M> {
        if (!this.repository) this.throwUninitializedRepositoryError()
        return await this.repository.save(model)
    }

    public async find(options?: FindManyOptions<M>): Promise<M[]> {
        if (!this.repository) this.throwUninitializedRepositoryError()
        const findOptions: FindManyOptions<M> = options ? {
            ...options,
            relations: options?.relations ?? this.getDefaultFindOptionsRelations()
        } : {
            relations: this.getDefaultFindOptionsRelations()
        }
        return await this.repository.find(findOptions)
    }

    public async findOne(options: FindOneOptions<M>): Promise<M|null> {
        if (!this.repository) this.throwUninitializedRepositoryError()
        const findOptions: FindManyOptions<M> = {
            ...options,
            relations: options?.relations ?? this.getDefaultFindOptionsRelations()
        }
        return await this.repository.findOne(findOptions)
    }

    public async findOneOrFail(options: FindOneOptions<M>): Promise<M> {
        if (!this.repository) this.throwUninitializedRepositoryError()
        const findOptions: FindOneOptions<M> = {
            ...options,
            relations: options.relations ?? this.getDefaultFindOptionsRelations()
        }
        const model = await this.repository.findOne(findOptions)

        if (!model) {
            throw new MissingEntityError(
                `The requested ${
                    getModelName(this.model).toLowerCase()
                } does not exist in the database`,
                404
            )
        }

        return model
    }

    abstract format(model: M): Promise<ModelType<M,"response">>

    public async remove(model: M): Promise<void> {
        if (!this.repository) this.throwUninitializedRepositoryError()
        await this.repository.remove(model)
    }

    protected getDefaultFindOptionsRelations(): FindOptionsRelations<M> | undefined {
        return undefined
    }
}