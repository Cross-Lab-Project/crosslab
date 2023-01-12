import { FindManyOptions, FindOneOptions, Repository } from "typeorm"
import { Role, User } from "../../generated/types"
import { ActiveKey, Key, Scope, Token } from "../../types/types"
import { ActiveKeyModel, KeyModel, RoleModel, ScopeModel, TokenModel, UserModel } from "../model"

type Model = ActiveKeyModel | KeyModel | RoleModel | ScopeModel | TokenModel | UserModel
type ModelType<M extends Model, T extends "request" | "response" | "all" = "all"> = M extends ActiveKeyModel 
    ? ActiveKey<T>
    : M extends KeyModel
    ? Key<T>
    : M extends RoleModel
    ? Role<T>
    : M extends ScopeModel
    ? Scope<T>
    : M extends TokenModel
    ? Token<T>
    : M extends UserModel
    ? User<T>
    : never

/**
 * An abstract class for a repository.
 * @typeParam M - Type of the model.
 * @typeParam E - Type of the entity target corresponding to the model.
 * @typeParam T - Type of the data corresponding to the model.
 */
export abstract class AbstractRepository<M extends Model> {
    protected repository?: Repository<M>

    abstract initialize(): void
    protected checkIfInitialized(): void {
        if (!this.repository) throw new Error("Repository has not been initialized")
    }

    abstract create(data: ModelType<M,"request">): Promise<M>
    abstract write(model: M, data: ModelType<M,"request">): Promise<void>
    abstract save(model: M): Promise<void>
    abstract find(options?: FindManyOptions<M>): Promise<M[]>
    abstract findOne(options: FindOneOptions<M>): Promise<M|null>
    abstract findOneOrFail(options: FindOneOptions<M>): Promise<M>
    abstract format(model: M): Promise<ModelType<M,"response">>
    abstract delete(model: M): Promise<void>
}