import { EntityTarget, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm"
import { AppDataSource } from "../data_source"

/**
 * An abstract class for a repository.
 * @typeParam M - Type of the model.
 * @typeParam E - Type of the entity target corresponding to the model.
 * @typeParam T - Type of the data corresponding to the model.
 */
export abstract class AbstractRepository<M extends ObjectLiteral, E extends EntityTarget<M>, T> {
    protected repository: Repository<M>

    constructor(entity: E) {
        this.repository = AppDataSource.getRepository(entity)
    }

    abstract create(data: T): Promise<M>
    abstract write(model: M, data: T): Promise<void>
    abstract save(model: M): Promise<void>
    abstract find(options: FindOptionsWhere<M>): Promise<M[]>
    abstract findOne(options: FindOptionsWhere<M>): Promise<M>
    abstract format(model: M): Promise<T>
    abstract delete(model: M): Promise<void>
}